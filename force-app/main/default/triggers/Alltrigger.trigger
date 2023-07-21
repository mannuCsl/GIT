trigger Alltrigger on Opportunity (After update) {
    set<Id> setid = new set<Id>();
    
    for(Opportunity opp:trigger.new){
        if(opp.AccountId !=null){
           setid.add(opp.AccountId); 
        }
    }
    List<Opportunity> oplist =[SELECT Id, Amount FROM Opportunity WHERE AccountId IN: setid];
    List<Account> acclist =[SELECT Id, Same_Address__c FROM Account WHERE Id IN: setid];
    for(Opportunity opp:oplist){
        if(opp.Amount==20000){
            acclist[0].Same_Address__c=false;
        }
        update acclist;
    }
    
}