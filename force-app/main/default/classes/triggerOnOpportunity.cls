public class triggerOnOpportunity {
   /* public static void amount20k(List<Opportunity> newopplist){
        Set<Id> setid = new Set<Id>();
        
      for(Opportunity opp: newopplist){
          if(opp.AccountId != null ){
              setid.add(opp.AccountId);
          }                                                       
      }
        List<Account> aclist=[SELECT Id, Is_gold__c,(SELECT Id, Amount FROM Opportunities) FROM Account WHERE Id IN: setid]; 
        
        for(Account acc:aclist){
            Decimal totalAmount=0;
            List<Opportunity> opplist =new List<Opportunity>();
            opplist.addAll(acc.Opportunities);
            for(Opportunity opp:opplist){
                totalAmount = totalAmount + opp.Amount;
             }
             if(totalAmount > 20000){
                   acc.Is_gold__c=True;
                }
                else{
                        acc.Is_gold__c=False;
                }
        }
        Update aclist;
    }
*/
}