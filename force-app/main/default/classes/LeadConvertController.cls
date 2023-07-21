public class LeadConvertController {
    @AuraEnabled
    public static Map<String,String> doConvert(Id leadId){
        
        System.debug('doConvert LeadId: ' + leadId);
        Map<String,Id> mapResult = new Map<String,Id>();
        Database.LeadConvert lc = new database.LeadConvert();
        lc.setLeadId(leadId);
        lc.setDoNotCreateOpportunity(false);
        LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
        System.debug('doConvert ConvertStatus: ' + convertStatus);
        lc.setConvertedStatus(convertStatus.MasterLabel);
        Database.LeadConvertResult lcr = Database.convertLead(lc);
        System.debug('doConvert LeadConvertResult: ' + lcr);
        
        id accountId = lcr.getAccountId();
        id contactId = lcr.getcontactId();
        id opportunityId = lcr.getOpportunityId();
        
        mapResult.put('accountId', accountId);
        
        mapResult.put('contactId', contactId);
        
        mapResult.put('opportunityId', opportunityId);
        
        System.debug('doConvert AccountId Result: ' + accountId);
        System.debug('doConvert ContactId Result: ' + contactId);
        System.debug('doConvert Opportunity Result: ' + opportunityId);
        
        return mapResult;
    }
    
    
    
     @AuraEnabled
    public static List<Account> searchAccountName(String accname){
        accname = '%' + accname + '%';        
        List<Account> getAccountList = [Select Id, Name From Account Where Name Like:accname];
        return getAccountList;
    }
  

}