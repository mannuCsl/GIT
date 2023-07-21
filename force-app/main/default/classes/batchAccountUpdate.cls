public class batchAccountUpdate implements Database.Batchable<sObject>{
    public Database.querylocator start(Database.BatchableContext BC){
        String query = 'SELECT Id, Name,Description FROM Account';
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext BC, List<Account> scope){
        System.debug('List scope'+scope);
        for(Account s : scope){
            //Account a = (Account)s;
            s.Phone = '00000';            
            s.Description = 'Description by bach class.';            
        }        
        System.debug('After update List scope'+scope);
        update scope;        
    }
    
    public void finish(Database.BatchableContext BC){ 
        String email = 'mannu@cloudsciencelabs.com'; 
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();        
        mail.setToAddresses(new String[] {email});
        mail.setReplyTo(email);
        mail.setSenderDisplayName('Sender Name Bach Class');
        mail.setSubject('Subjech');
        mail.setPlainTextBody('-:in body:- Batch Process has completed');        
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}

/*
global class batchAccountUpdate implements Database.Batchable {
// Start Method
    global Database.QueryLocator start(Database.BatchableContext BC) {
        String query = 'SELECT Id,Name FROM Account';
        return Database.getQueryLocator(query);
    }
      
   // Execute method
    global void execute(Database.BatchableContext BC, List scope) {
         for(Account a : scope)
         {a.Name = a.Name + 'Updated';         
         }
         update scope;
    }
      
    // Finish Method
    global void finish(Database.BatchableContext BC) {
    }

}
*/