public class BookTriggerHelper {
    public Static void BookQtyUpdateInAccount(List<Book__c> booklist){
        /*Set<Id> setId = new Set<Id>();
        for(Book__c bok: booklist){
            if(bok.Account__c != null){
               setId.add(bok.Account__c);
            }
        }
            //Map<Account, List<Book__c>> bokMap = new  Map<Account, List<Book__c>>();
            
         /* 
            List<Book__c> boklist =[SELECT Id, Quanity__c, Account__c FROM Book__c WHERE Account__c IN: setId];
            List<Account> acclist =[SELECT Id, Total_Qty__c FROM Account WHERE Id IN: setId];
            
            
            for(Account acc:acclist){
              Decimal allQty=0;
              for(Book__c bk:boklist){
                 if(bk.Account__c == acc.Id){
                   allQty = allQty + bk.Quanity__c;
                  }
               }
              acc.Total_Qty__c = allQty;
             }
           Update acclist;
           }

            */
            
        /*List<Account> acclist =[SELECT Id, Total_Qty__c,(SELECT Id, Quanity__c FROM Books__r) FROM Account WHERE Id IN: setId];
        
        for(Account acc:acclist){
            List<Book__c> bklist = new List<Book__c>();
            bklist.addAll(acc.Books__r);
            Decimal allQty=0;
            for(Book__c bk:bklist){
                    allQty = allQty + bk.Quanity__c;
            }
            acc.Total_Qty__c = allQty;
        }
        Update acclist;*/
    }
}