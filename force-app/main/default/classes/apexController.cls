public with sharing class apexController{
          
    @AuraEnabled(cacheable=true)
     public static String convertLead(Id ld, Account convertedAcc, Contact convertedAccCon, Opportunity convertedAccOpp){
         System.debug('lead ' + ld);
         System.debug('account ' + convertedAcc);
         System.debug('con ' + convertedAccCon);
         System.debug('opp ' + convertedAccOpp);
         
         //Savepoint sp = Database.setSavepoint();
         
         try{
            
             System.debug('this.isUpdateLead ' + ld);
                    
             Database.LeadConvert lc = new database.LeadConvert();
             lc.setLeadId(ld);
               
             if(convertedAcc != null && convertedAcc.Id != null){
                 System.debug('attached account ' + convertedAcc.Id);
                 lc.setAccountId(convertedAcc.Id);
             }
             if(convertedAccCon != null && convertedAccCon.Id != null){
                 System.debug('attached contact ' + convertedAccCon.Id);
                 lc.setContactId(convertedAccCon.Id);
             }
             if(convertedAccOpp != null && convertedAccOpp.Id != null){
                 System.debug('attached opportunity ' + convertedAccOpp.Id);
                 lc.setOpportunityId(convertedAccOpp.Id);                
             }
              
             LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
             lc.setConvertedStatus(convertStatus.MasterLabel);
             
             Database.LeadConvertResult lcr = Database.convertLead(lc);
             System.assert(lcr.isSuccess());               
             
             Lead convertedLead = [SELECT convertedContactId, convertedOpportunityId FROM Lead WHERE Id =: ld];
            
         }catch(Exception e){
             
         }
         
         return 'converted';
         
     }
 }