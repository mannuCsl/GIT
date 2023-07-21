public with sharing class SearchContact {
    @AuraEnabled
    public static List<wrapper> conSearch(String name, String email, String phone, String street, String city, String country, String province, String postal){
        system.debug('name---'+name);
        system.debug('email---'+email);
        system.debug('phone---'+phone);
        system.debug('street---'+street);
        system.debug('city---'+city);
        system.debug('country---'+country);
        system.debug('province---'+province);
        system.debug('postal---'+postal);
        
        String query = 'SELECT Id, Name, Email, Phone, MailingStreet, MailingCity, MailingCountry, MailingState, MailingPostalCode FROM Contact WHERE ';
        if(String.isNotBlank(name)) {
            name='%'+name+'%';
            query += ' Name LIKE : name '+ 'OR';
        }
        if(String.isNotBlank(email)) {
            email='%'+email+'%';
            query += ' Email LIKE : email '+ 'OR';
        }
        if(String.isNotBlank(phone)) {
            phone='%'+phone+'%';
            query +=' Phone LIKE : phone '+'OR';
        }
        if(String.isNotBlank(street)) {
            street='%'+street+'%';
            query += ' MailingStreet LIKE : street '+'OR';
        }
        if(String.isNotBlank(city)) {
            city='%'+city+'%';
            query += ' MailingCity LIKE : city '+'OR';
        }
        if(String.isNotBlank(country)) {
            country='%'+country+'%';
            query += ' MailingCountry LIKE : country '+'OR';
        }
        if(String.isNotBlank(province)) {
            province='%'+province+'%';
            query += ' MailingState LIKE : province '+'OR';
        }
        if(String.isNotBlank(postal)) {
            postal='%'+postal+'%';
            query += ' MailingPostalCode LIKE : postal '+'OR';
        }
        query = query.removeEnd('OR');
        system.debug('Q '+query);
        List<Contact> conlist = Database.query(query);
        system.debug(conlist);    
        system.debug(conlist.size());
        Set<Id> setid = new Set<Id>();
        for(Contact co:conlist){
            setid.add(co.Id);
        }
        Map<String,EntitySubscription> te = new Map<String,EntitySubscription>();
        List<EntitySubscription> followIdlist = [SELECT Id, parentId FROM EntitySubscription WHERE parentId IN: setid AND subscriberid =:UserInfo.getUserId()];
        for(EntitySubscription es:followIdlist){
            te.put(es.parentid,es);
        }
        List<wrapper> returnWrp = new List<wrapper>();
        for(Contact co:conlist){
            wrapper temp = new wrapper();
            temp.name = co.Name;
            temp.id = co.Id;
            temp.email = co.Email;
            if(te.containsKey(co.id)) {
                temp.isFollowed = true;
            }else{
                temp.isFollowed = false;
            }
            returnWrp.add(temp);
        }
        system.debug(returnWrp);
        system.debug(returnWrp.size());
        
        return returnWrp;
    } 
    @AuraEnabled
    public static void followbutton(Id conid){
        EntitySubscription follow = new EntitySubscription(parentId = conid, subscriberid = UserInfo.getUserId());
        insert follow;
    }
    
    @AuraEnabled
    public static void unfollowbuttonsApexMethod(Id conid){
        delete [SELECT Id FROM EntitySubscription WHERE parentId =: conid AND subscriberid =: UserInfo.getUserId()];
    }
    
    public class wrapper{
        @AuraEnabled
        public String Name;
        @AuraEnabled
        public String Id;
        @AuraEnabled
        public String Email;
        @AuraEnabled
        public Boolean isFollowed;
    }
    
    
    
    
    
    
    
    
    
    
}























/*List<Contact> conlist;
try {
//Database.query( WHERE Name LIKE: name OR Phone LIKE: phone OR Email LIKE: email OR MailingStreet LIKE: street OR MailingCity LIKE: city OR MailingCountry LIKE:country OR MailingState LIKE: province OR MailingPostalCode LIKE: postal WITH SECURITY_ENFORCED' );

}
catch(System.QueryException qe) {
System.debug('Error by catch--'+qe.getMessage()); 
}
for(Contact con:conlist){
system.debug(con);
}
Map<Integer, List<Contact>> conMap = new Map<Integer, List<Contact>>();
if(name != null){
List<Contact> onlist1 = [SELECT Id, Name FROM Contact WHERE Name LIKE: name];
conMap.put(1, onlist1);
}
if(email != null){
List<Contact> onlist2 = [SELECT Id, Name, Email FROM Contact WHERE Email LIKE: email];
conMap.put(2, onlist2);
}
if(phone != null){
List<Contact> onlist3 = [SELECT Id, Name, Phone FROM Contact WHERE Phone LIKE: phone];
conMap.put(3, onlist3);
if(street != null){
List<Contact> onlist4 = [SELECT Id, Name, MailingStreet FROM Contact WHERE MailingStreet LIKE: street];
conMap.put(4, onlist4);
}
if(city != null){
List<Contact> onlist5 = [SELECT Id, Name, MailingCity FROM Contact WHERE MailingCity LIKE: city];
conMap.put(5, onlist5);
}
if(country != null){
List<Contact> onlist6 = [SELECT Id, Name, MailingCountry FROM Contact WHERE MailingCountry LIKE: country];
conMap.put(6, onlist6);
}
if(province != null){
List<Contact> onlist7 = [SELECT Id, Name, MailingState FROM Contact WHERE MailingState LIKE: province];
conMap.put(7, onlist7);
}
if(postal != null){
List<Contact> onlist8 = [SELECT Id, Name, MailingPostalCode FROM Contact WHERE MailingPostalCode LIKE: postal];
conMap.put(8, onlist8);
}
system.debug(conMap.keyset());
System.debug('check retrive;);
//Hello World;
*/