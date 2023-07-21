public class ContactTriggerHelper {}
    
   /* public static void throwerror(List<Contact> newlist){
        Map<Id, Contact> conMap =new Map<Id, Contact>([SELECT Id, FirstName, LastName, Email FROM Contact]);
        
       
        for(Contact newCon: newlist){
            for(Contact oldcon: conMap.values()){   
                if(newCon.FirstName == null || newCon.FirstName==oldCon.FirstName){
                    newCon.FirstName.addError('Cannot create this record because there is already existing contact with given information.');
                }
                if(newCon.LastName==oldCon.LastName){
                   newCon.LastName.addError('Cannot create this record because there is already existing contact with given information.');  
                }
                if(newCon.Email == null || newCon.Email==oldCon.Email){
                     newCon.Email.addError('Cannot create this record because there is already existing contact with given information.');
                }
             }
          }   
      }*/
    
	/*  public static void dead70IntelTrue(List<Contact> newlist){
        Set<Id> Setid =new Set<Id>();
        for(Contact con: newlist){
            if(con.AccountId != null){
                setid.add(con.AccountId);
            }
        }
        List<Account> aclist =[SELECT Id, Need_Intel__c,(SELECT Id, Dead__c FROM Contacts) FROM Account WHERE Id IN: setid];
        for(Account acc: aclist){
            Integer a=0,b=0;
            List<Contact> conlist =new List<Contact>();
            conlist.addAll(acc.Contacts);
            for(Contact con:conlist){
                if(con.Dead__c==True){
                    a++;
                }
            }
            if((conlist.size()*70)/100 <= a){
                acc.Need_Intel__c=True;
            }
            else{
               acc.Need_Intel__c=False; 
            }
        }
        Update aclist;
    }
}*/
   /*   public static void accDependOnIsdead(List<Contact> newTrigger, Map<Id, Contact> oldMap){       
      Set<Id> setid = new Set<Id>();
       
       for(Contact con:newTrigger){
           if(con.AccountId != null){
               if(con.Is_Dead__c != oldMap.get(con.Id).Is_Dead__c){  //contactKaIs_Dead__cWalaFeildUpdateHogaTabhiBadhegaAageProccess
                   setid.add(con.AccountId);
               }  
           }
       }
       Map<Id, List<Contact>> conMap = new Map<Id, List<Contact>>();
       List<Account> acclist =[SELECT Id, Intel__c,(SELECT Id, Is_Dead__c FROM Contacts) FROM Account WHERE Id IN: setid];
       for(Account acc:acclist){
           conMap.put(acc.Id, acc.Contacts);
       }
      
       for(Account acc:acclist){
            Integer a=0,b=0;
           List<Contact> conlist2 = new List<Contact>();
           conlist2.addAll(ConMap.get(acc.Id));
           for(Contact con:conlist2){
               if(con.Is_Dead__c==True){
                 a++;  
               }
               else{
                   b++;
               }
           }
           if(a==conlist2.size()){
               acc.Intel__c='Fully Active';
           }
           else if(b==conlist2.size()){
               acc.Intel__c='Inactive';
           }
           else{
               acc.Intel__c='Partially Active';
           }
       }
       Update acclist;
   } 
}

    /*
     public static void notsame(List<Contact> newlist){       
        Set<Id> setid = new Set<Id>();
        for(Contact con:newlist){
            if(con.AccountId!=null){
            }   setid.add(con.AccountId);
        }
        Map<Id, List<Contact>> acConMap = new Map<Id, List<Contact>>();       
        List<Account> acclist =[SELECT Id,(SELECT Id FROM Contacts) FROM Account WHERE Id IN: setid];      
        for(Account acc:acclist){
            acConMap.put(acc.Id, acc.Contacts);
        }
        List<Account> acclist2 =[SELECT Id, Only_Default_Contact__c FROM Account WHERE Id IN: acConMap.keySet()];
      
        for(Account ace:acclist2){
            List<Contact> conlist2 = new List<Contact>();
            conlist2.addAll(acConMap.get(ace.Id));
                if(conlist2.size() == 1){
                    ace.Only_Default_Contact__c=True;
                } 
                else{
                   ace.Only_Default_Contact__c=False; 
                  }
                }
        update acclist2;
            }
   
             */  
   
   /* Public Static void NewTrigger(List <Contact> newt){
            string accId = '';  // accid variable me blank(value) store karayi hai
            
        for(Contact con:newt){
                if(con.Accountid != null){
                    accId = con.AccountId;
             }
            }
            List<Contact> conlist = [SELECT Id FROM Contact WHERE AccountId =: accId];
             integer i, num = conlist.size(); 
                for(i=0;i<num;i++){
                conlist[i].CountOfSibling__c=num;
            }
            update conlist;		
         }*/
    
    
 
  /* Public Static void OldTrigger(List <Contact> oldt){     
    
            string accId = '';
            for(Contact con:oldt){
                if(con.Accountid != null){
                    accId = con.AccountId;
              }
            }
            List<Contact> conlist = [SELECT Id FROM Contact WHERE AccountId =: accId];
             integer i, num = conlist.size(); 
                for(i=0;i<num;i++){
                conlist[i].CountOfSibling__c=num;
            }
            update conlist;
}*/