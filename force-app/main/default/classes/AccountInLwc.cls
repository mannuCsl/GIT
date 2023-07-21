public with sharing class AccountInLwc {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount() {
        return [SELECT Id, Name, Website, Rating, CreatedDate, BillingStreet  FROM Account ORDER BY createdDate DESC LIMIT 5];
        
    }
}