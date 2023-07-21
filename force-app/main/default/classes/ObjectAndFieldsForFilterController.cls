public class ObjectAndFieldsForFilterController {  
    public static void ObjectAndFieldsForFilter(List<MyCustomObject>filtelist){   
            for (MyCustomObject objectFilter : filtelist) {
                System.debug('operator==' + objectFilter.Operator +' and fieldName==' + objectFilter.fieldName + ' fieldValue==' + objectFilter.fieldValue+ ' objName==' + objectFilter.objName);
                if(objectFilter.objName =='Account'){
                    
                }
                        
        }
        
        
        
        
        
        
    /*    
        
        String objName;
            objName = 'Account';
            System.debug('The list contains ' +objName);  
            
            // Get the describe result for the Account object
            Schema.DescribeSObjectResult accountDescribe = Account.sObjectType.getDescribe();
            
            // Get all fields of the Account object
            List<Schema.SObjectField> accountFields = accountDescribe.fields.getMap().values();
            
            // Iterate over the fields and print their names
            for (Schema.SObjectField field : accountFields) {
                //System.debug('Field Name: ' + field.getDescribe().getName());
            }

            
            
            
            String query = 'SELECT Id, Name, Email, Phone, MailingStreet, MailingCity, MailingCountry, MailingState, MailingPostalCode FROM'+ objName +' WHERE ';
            System.debug('The list contains ' +filterMap.get(objName));  
            
           
            
/*            for(MyCustomObject acc:filterMap.get(objName)){
                System.debug('in for acc' +acc);  
                System.debug('in for acc. fieldName' +acc.fieldName);  
                //System.debug('in for acc. fieldValue' +acc.fieldValue);  
                //System.debug('in for acc. Operator' +acc.Operator);  
                

                //if(String.isNotBlank(acc.Name)) {
                   // acc.Name='%'+acc.Name+'%';
                   // query += ' Name LIKE : name '+ 'OR';
               // }
            }*/  

       // }
        
        
        /*if(String.isNotBlank(name)) {
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
        List<Contact> conlist = Database.query(query);*/
    }
    public class MyCustomObject {
        public String fieldName;
        public String fieldValue;
        public String objName;
        public String Operator;
    }

}