public class OlderAccountsUtility {
    public static void accountlist(){ 
    List<Account> acclist = new List<Account>();
        acclist=[SELECT Id, Name From Account];        
        for(Account a:acclist){                     
            a.Name='CSL_'+a.Name;
        System.debug('All Account List '+a.name);
    }
      //Database.update(acclist);    
    Map<Id,Account> listTOmap=new Map<Id,Account>();
        for(Account ac:acclist){ 
             listTOmap.put(ac.Id,ac);
           }
         System.debug(listTomap);      
    }  
    
    public static void second45(){
        Map<Id,Account> accmap = new Map<Id,Account>([SELECT Id, Name FROM Account]);
      List<Account> mapTOlist = new List<Account>();
        mapTOlist.addAll(accmap.values());
      System.debug(mapTOlist);
    }
    
    public static void third6(){
        Map<Id,Account> acmap = new Map<Id,Account>([SELECT Id, Name, Active__c FROM Account]);
        Map<Id,Account> activeYes = new Map<Id,Account>();
        Map<Id,Account> activeNo = new Map<Id,Account>();
        for(Account av:acmap.values()){
            if(av.Active__c == 'Yes'){
                if(av.Name.contains('-Active')){
                    av.Name = av.name.substringBefore('-');}
                av.Name=av.Name+  ' _Active';
                activeYes.put(av.Id,av);                
                System.debug(av.Name); 
            }
          }    
        List<Account> uplist=new List<Account>();
        uplist=activeYes.values();        
       //Database.update(uplist);
        System.debug(uplist);
    }
}