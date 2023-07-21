@isTest
public class AccountTriggerHelperTest {
    // Use the @testSetup annotation to create test data once and use it across multiple test methods
    @testSetup
    static void setup() {
        // Create test data
        List<Account> oldTestAccounts = new List<Account>{
            new Account(Name='Test Account 1', BillingPostalCode='110042'),
            new Account(Name='Test Account 2', BillingPostalCode='110042')
        };
        insert oldTestAccounts; 
        Contact con1 = new Contact(FirstName = 'John', LastName = 'Doe', MailingPostalCode = '12345', AccountId = oldTestAccounts[0].Id);
        Contact con2 = new Contact(FirstName = 'Jane', LastName = 'Doe', MailingPostalCode = '110043', AccountId = oldTestAccounts[1].Id);
        insert new List<Contact>{con1, con2};
        for(Account acc: oldTestAccounts){
            acc.BillingPostalCode='110043';            
        }       
        Update oldTestAccounts;
    }    
    // Test method for the outOfZip of AccountController
   /* @isTest
    static void testAccountTriggerHelperOutOfZip() {
        Map<Id, Account> accOldMap = new map<Id, Account>([SELECT Id, Name, Out_Of_Zip__c, BillingPostalCode FROM Account]);
        // Assert that the outOfZip correctly initializes the class variables
        AccountTriggerHelper.outOfZip(accOldMap.values(), accOldMap);
        // assert the expected results
        List<Account> updatedAccounts = [SELECT Id, Out_Of_Zip__c, BillingPostalCode FROM Account WHERE Id IN :accOldMap.keySet()];
        System.assertEquals(2, updatedAccounts.size());
        System.assertEquals(true, updatedAccounts[0].Out_Of_Zip__c);
        System.assertEquals(false, updatedAccounts[1].Out_Of_Zip__c);
    }*/
    
    // Test method for the TopParentAccountName() method of AccountController
    @isTest
    static void testAccountTriggerHelperTopParentAccountName() {
        List<Account> testAccounts = new List<Account>();
        Account acc1 = new Account(Name='Acc 1');
        insert acc1;
        testAccounts.add(acc1);         
        Account acc2 = new Account(Name='Acc 2', ParentId=acc1.Id);        
        insert acc2; 
        testAccounts.add(acc2); 
        Account acc3 = new Account(Name='Acc 3', ParentId=acc2.Id);        
        insert acc3; 
        testAccounts.add(acc3);
        
        AccountTriggerHelper.TopParentAccountName(testAccounts);        
        
        Account ThreeAccount = [SELECT Id, Name, ParentId, Top_Account_Name__c FROM Account WHERE Id =: acc3.Id];
        system.assertEquals('Acc 1', ThreeAccount.Top_Account_Name__c);
        system.assertEquals(acc2.Id, ThreeAccount.ParentId);
        
        Account OneAccount = [SELECT Name, ParentId FROM Account WHERE Id =: acc1.Id];
        system.assertEquals('Acc 1', OneAccount.Name);
        system.assertEquals(null, OneAccount.ParentId);

    }
   /* 
    // Test method for the getAccounts() method of AccountController
    @isTest
    static void testAccountControllerGetAccounts() {
        // Instantiate the AccountController class
        AccountController ac = new AccountController();
        // Call the getAccounts() method and assert that it returns the correct number of accounts
        List<Account> accounts = ac.getAccounts();
        system.assertEquals(2, accounts.size());
    }
    
    // Test both positive and negative scenarios by testing what happens when the user enters valid data as well as invalid data
    @isTest
    static void testAccountControllerInvalidData() {
        // Instantiate the AccountController class
        AccountController ac = new AccountController();
        // Call the selectAccount() method with an invalid account Id and assert that it throws an exception
        try {
            ac.selectAccount('invalidId');
            system.assert(false, 'Expected an exception to be thrown');
        } catch (Exception e) {
            system.assert(e.getMessage().contains('Invalid account Id'), 'Unexpected exception message');
        }
    }
    
    // Use meaningful test data that reflects real-world scenarios
    @isTest
    static void testAccountControllerRealData() {
        // Instantiate the AccountController class
        AccountController ac = new AccountController();
        // Call the selectAccount() method with a real account Id and assert that it sets the selectedAccount variable correctly
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        ac.selectAccount(testAccount.Id);
        system.assertEquals(testAccount, ac.selectedAccount);
    }
}


*/










    /*@testSetup public static void accIntel(){
    Account acc = new Account();
    acc.Name='Acc Intel';
    acc.Intel__c='Inactive';
    Insert acc;
    
      List<Contact> conlist = new List<Contact>();
      for(Integer i=0;i<5;i++){                           
            Contact con = new Contact();
            con.LastName='Is Dead';
            con.AccountId=acc.Id;
            conlist.add(con);
        }
        Insert conlist;
    }/*
    @isTest static void FullyActive(){
        Account acc =[SELECT Id, Intel__c FROM Account WHERE Name='Acc Intel' Limit 1];
        List<Contact> conlist =[SELECT Id, AccountId, LastName, Is_Dead__c FROM Contact WHERE AccountId =: acc.Id]; 
        for(Contact co:conlist){
            co.Is_Dead__c=True;
        }
        Update conlist;
       Account ac =[SELECT Id, Intel__c FROM Account WHERE Id =: conlist[0].AccountId];
        System.assertEquals('Fully Active', ac.Intel__c);
   }*/
    
    
    
    
    
    
    
    
   /*
    
    
     @isTest static void Inactive(){
        Account acc =[SELECT Id, Intel__c FROM Account WHERE Name='Acc Intel' Limit 1];
        List<Contact> conlist =[SELECT Id, AccountId, LastName, Is_Dead__c FROM Contact WHERE AccountId =: acc.Id]; 
        for(Contact co:conlist){
            co.Is_Dead__c=False;
        }
        Update conlist;
       Account ac =[SELECT Id, Intel__c FROM Account WHERE Id =: conlist[0].AccountId];
        System.assertEquals('Inactive', ac.Intel__c);
   }/*
     @isTest static void partiallyActive(){
        Account acc =[SELECT Id, Intel__c FROM Account WHERE Name='Acc Intel' Limit 1];
        List<Contact> conlist =[SELECT Id, AccountId, LastName, Is_Dead__c FROM Contact WHERE AccountId =: acc.Id]; 
        Integer i=0;
        for(Contact co:conlist){
            i++;
            if(i==3){
            co.Is_Dead__c=True;
        }
            else{
               co.Is_Dead__c=False;  
            }
        }
        Update conlist;
       Account ac =[SELECT Id, Intel__c FROM Account WHERE Id =: conlist[0].AccountId];
        System.assertEquals('Partially Active', ac.Intel__c);
   }
    */
    
 
    /*   @isTest public static void error(){
        List<Contact> conlist = new List<Contact>();
        for(Integer i=0;i<2;i++){                          
            Contact con = new Contact();
            con.LastName='Test';
            //con.FirstName='2'+i;
            con.Email='sam@gmail.com';
            conlist.add(con);
            try{
                insert con;
            }catch(exception e){}
            
        }
       System.assertEquals(2, conlist.size());
      
    }
}
*/

  /*  @isTest public static void revenue(){  
        Revenue__c rev = new Revenue__c();
        rev.Name='Hey';
        rev.End_Date__c=Date.newInstance(2023, 3, 7);
        rev.Start_Date__c=Date.newInstance(2022, 10, 14);
        rev.Quanity__c=20;
        rev.Price__c=100;
        Insert rev;
        
        List<Revenue__c> re =[SELECT Id,(SELECT Id, Start_Date__c FROM Monthly_Revenues__r)FROM Revenue__c WHERE Id =: rev.Id];
        List<Monthly_Revenue__c> mrevlist = new List<Monthly_Revenue__c>();
        mrevlist.addAll(re[0].Monthly_Revenues__r);
        System.assertEquals(Date.newInstance(2022, 10, 14), mrevlist[0].Start_Date__c);
    }
*/    

  /* @isTest public static void zipOutOf(){
         Account acc = new Account();
        acc.Name='notsame';
        acc.BillingPostalCode='000000';
        insert acc;
        
        List<Contact> conlist = new List<Contact>();
        for(Integer i=0;i<2;i++){
            Contact con = new Contact();
             con.LastName='test';
            con.AccountId=acc.Id;
            con.MailingPostalCode='111111';
             con.Dead__c=True;
             conlist.add(con);
        }
        insert conlist;
        
        acc.Name='notsame';
        acc.BillingPostalCode='111113';
        Update acc;
        
        
        Account a =[SELECT Out_Of_Zip__c, BillingPostalCode FROM Account WHERE Id =: acc.Id];
       
        //System.assertEquals(conlist[0].MailingPostalCode, a.BillingPostalCode);
       System.assertEquals(True, a.Out_Of_Zip__c);
      
        
    }
    */
     /* @isTest public static void samenot(){
        Account acc = new Account();
        acc.Name='notsame';
        insert acc;
        
        List<Contact> conlist = new List<Contact>();
        for(Integer i=0;i<2;i++){
            Contact con = new Contact();
             con.LastName='test';
            con.AccountId=acc.Id;
             con.Dead__c=True;
             conlist.add(con);
        }
        insert conlist;
        Account a =[SELECT Only_Default_Contact__c FROM Account WHERE Id =: acc.Id];
        System.assertEquals(False, a.Only_Default_Contact__c);
    }
    */

   /*@isTest public static void con70DeadIntelTrue(){
        Account acc = new Account();
        acc.Name='AccTest';
        insert acc;
       List<Contact> conlist = new List<Contact>();
        for(Integer i=0;i<10;i++){
            Contact con = new Contact();
             con.LastName='test';
            con.AccountId=acc.Id;
             con.Dead__c=True;
             conlist.add(con);
        }
        insert conlist;
        
         List<Contact> conlist1 = new List<Contact>(); 
       List<Contact> conlist2 = new List<Contact>();
         Integer i=0,a=0;
        for(Contact co:conlist){
           i++;
            
             if(i>3){
             co.Dead__c=True;
                 a++;
                 conlist1.add(co);
            }
            else{
             co.Dead__c=False;
                conlist2.add(co);
            }
             
        }
        Update conlist1;
        Update conlist2;
        
        Account m =[SELECT Need_Intel__c FROM Account WHERE Id =: acc.Id];
        System.assertEquals(True, m.Need_Intel__c);
      
        }*/
        
    /*
    @isTest static void opp20(){
        Account acc = new Account();
        acc.Name='oppacb';
        insert acc;
        
        Opportunity opp = new Opportunity();
        opp.Name='abc';
        opp.closedate=Date.newInstance(2022, 12, 9);
        opp.stageName='Prospecting';
        opp.AccountId =acc.Id;
        opp.Amount=10000;
        insert opp;
        
        System.assertEquals(False, acc.Is_gold__c);
        
        opp.Name='abc';
        opp.closedate=Date.newInstance(2022, 12, 9);
        opp.stageName='Prospecting';
        opp.Amount=29009;
        opp.AccountId=acc.Id;
        opp.Id = opp.Id;
        update opp;
        
        //Opportunity o =[SELECT Id FROM Opportunity WHERE Id =: opp.Id];
        Account a=[SELECT Is_gold__c FROM Account WHERE Id =: opp.AccountId];
        System.assertEquals(True, a.Is_gold__c);
        System.assert(opp.Amount>20000, 'Opp.Amount<20000');
        
    }
      */ 
    
  /*
@isTest static void check(){
        Account acc = new Account();
        acc.Name='Salesforce';
        insert acc;
        Contact con = new Contact();
        con.lastname=acc.name+' '+'contact';
        con.accountid=acc.id;
        con.phone='8737841177';
        con.email='accupcrecon@gmail.com';
        insert con;
        
      
        Account a =[SELECT Id FROM Account WHERE Id =: acc.Id];
        System.assertEquals(con.Lastname, a.name+' '+'contact');
    }*/
}