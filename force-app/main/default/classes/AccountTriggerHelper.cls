public class AccountTriggerHelper {      
   /* @future (callout=true)  // future method needed to run callouts from Triggers
    static public void getLocation(Id accountId){
        if(!TopParentAccountNameRecursiveHelper.recursive){
            TopParentAccountNameRecursiveHelper.recursive=true;
            Account a = [SELECT BillingCity,BillingCountry,BillingPostalCode,BillingState,BillingStreet,BillingLatitude,BillingLongitude,Geo_Location__Latitude__s,Geo_Location__Longitude__s FROM Account WHERE id =: accountId];
            // create an address string
            String address = '';
            if (a.BillingStreet != null)
                address += a.BillingStreet +', ';
            if (a.BillingCity != null)
                address += a.BillingCity +', ';
            if (a.BillingState != null)
                address += a.BillingState +' ';
            if (a.BillingPostalCode != null)
                address += a.BillingPostalCode +', ';
            if (a.BillingCountry != null)
                address += a.BillingCountry;
            
            address = EncodingUtil.urlEncode(address, 'UTF-8');            
            // build callout
            Http h = new Http();
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false&key='+tourManagerUtil.getGoogleApiKey());
            req.setMethod('GET');
            req.setTimeout(60000);
            
            try{
                // callout
                HttpResponse res = h.send(req);                    
                // parse coordinates from response
                JSONParser parser = JSON.createParser(res.getBody());                
                double lat = null;
                double lon = null;
                while (parser.nextToken() != null) {
                    if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) &&  (parser.getText() == 'location')){
                        parser.nextToken(); // object start
                        while (parser.nextToken() != JSONToken.END_OBJECT){
                            String txt = parser.getText();
                            parser.nextToken();
                            if (txt == 'lat'){
                                lat = parser.getDoubleValue();
                                system.debug('if lat:'+lat);                               
                            }                           
                            if (txt == 'lng'){
                                lon = parser.getDoubleValue();
                                system.debug('else lon:'+lon);                               
                            }
                        }
                    }
                }                    
                if (lat != null){
                    a.Geo_Location__Latitude__s = lat;
                    a.Geo_Location__Longitude__s = lon;
                    a.BillingLatitude = lat;
                    a.BillingLongitude = lon;
                    System.debug('lat:'+lat+' lng:'+lon);
                    update a;
                }
                
            } catch (Exception e) {
                System.debug('Exception e:'+e);
            }
        }
    }
*/
 /*
 public static Map<Id, Account> accMap = new Map<Id, Account>([SELECT Id, Name, ParentId, Top_Account_Name__c FROM Account]);
    public static void TopParentAccountName(List<Account> accountList){  
        if(!TopParentAccountNameRecursiveHelper.recursive){
            TopParentAccountNameRecursiveHelper.recursive=true;
            List<Account> acclist = [SELECT Id, Name, ParentId, Top_Account_Name__c FROM Account WHERE Id IN: accountList];
            for(Account acc:acclist){
                if(acc.ParentId != null){
                    acc.Top_Account_Name__c = recAccName(acc.ParentId);               
                }
                else{
                    acc.Top_Account_Name__c = acc.Name;
                }
            }
            Update acclist;   
        }
    }
    public static String recAccName(Id prntid){ 
        if(accMap.get(prntid).ParentId == null){                        
            return accMap.get(prntid).Name;
        }
        else{                 
            return AccountTriggerHelper.recAccName(accMap.get(prntid).ParentId);                    
        }        
    }  
   */
    
   /*
     public static void outOfZip(List<Account> newlist, Map<Id, Account> oldMap){
        Set<Id> setid = new Set<Id>();
        for(Account acc: newlist){
            if(acc.BillingPostalCode != oldMap.get(acc.Id).BillingPostalCode){
                setid.add(acc.Id);
            }
        }
        List<Account> acclist =[SELECT Id, Out_Of_Zip__c, BillingPostalCode,(SELECT Id, MailingPostalCode FROM Contacts)FROM Account WHERE Id IN: setid];
         for(Account acc: acclist){
            Integer a=0, b=0;
            List<Contact> conlist = new List<Contact>();
            conlist.addAll(acc.Contacts);
            for(Contact con:conlist){
                if(acc.BillingPostalCode != con.MailingPostalCode){
                    a++;
                }
                else{
                    b++;
                }
            }
            if(a==conlist.size()){
               acc.Out_Of_Zip__c=True; 
            }
            else{
              acc.Out_Of_Zip__c=false;   
            }
        }        
        Update acclist;
    }
	*/

    /* public static void ProfileAssignment(List<Account> newlist){
        Set<Id> setid = new Set<Id>();
        for(Account acc:newlist){
            if(acc.Website!='' && acc.Website!=null){
                setid.add(acc.Id);
            }
        }
        //Map<Id, List<Contact>> acMap = new Map<Id, List<Contact>>();
        List<Account> aclist =[SELECT Id, Website,(SELECT Id, FirstName, LastName, Profile__c FROM Contacts)FROM Account WHERE Id IN: setid];
         
        List<Contact> conlist2 = new List<Contact>();
      
          // for(Account acc: aclist){
         //   acMap.put(acc.Id, acc.Contacts);
        //}
        
        for(Account acc:aclist){
            List<Contact> conlist = new List<Contact>();
            conlist.addAll(acc.Contacts); //(acMap.get(acc.Id)
            for(Contact con: conlist){
                if(con.FirstName!=null && con.FirstName!=''){
                con.Profile__c=acc.Website+'/'+con.FirstName.substring(0,1)+con.LastName;
              }
           }
           Conlist2.addAll(conlist);
        }
        update conlist2;
    }
    
*/
    /*
     public static void Assignment_3(List<Account> newlist){
        List<Account> acclist =[SELECT Id, Name, Only_Default_Contact__c FROM Account WHERE Id IN: newlist];
        List<Contact> conlist = new List<Contact>();
        for(Account acc:acclist)//acclist OR newlist(trigger.new)
        {
            Contact con = new Contact();
            con.FirstName='Info';            
            con.LastName='Default';
            con.AccountId=acc.Id;
            con.Email='info@websitedomain.tld';
            conlist.add(con);
            acc.Only_Default_Contact__c=True;
        }
       insert conlist;
       update acclist;
    }
    
    */
   /* 
      public static void CreateConUpdateAccCOC(List<Account>newlist, Map<Id,Account>oldMap){
                  System.debug('trigger.new--'+newlist);

        List<Contact> conlist1 = new List<Contact>();
        List<Contact> conlist3 = new List<Contact>();      
       
        Map<Id,List<Contact>> conSetId = new Map<Id,List<Contact>>();           
        List<Account> AccountConList = [SELECT Id, Name, Count_Of_Contact__c,(SELECT Id FROM Contacts)FROM Account WHERE Id IN: newlist ]; 
          
        for(Account acc:AccountConList){   
            if(acc.Count_Of_Contact__c != oldMap.get(acc.Id).Count_Of_Contact__c){
                conSetId.put(acc.Id,acc.Contacts);
            }            
        }
          List<Account> accid =[SELECT Id, Name, Count_Of_Contact__c FROM Account WHERE Id IN: conSetId.keySet()];
          
          if(conSetId.size() > 0){
              
           for(Account acc:accid){
            if(oldMap.get(acc.Id).Count_Of_Contact__c == null){                
                Integer n;
                
                for(n=0;n<acc.Count_Of_Contact__c;n++){
                    Contact con=new Contact();
                     
                    con.LastName=acc.Name+n;
                    con.AccountId=acc.Id;
                    con.Phone='0000000000';
                    con.Email='DemoContact@gmail.com';
                    con.Description='Create this contact from Count Of Contact from Account';
                    conlist1.add(con);  
                }                
            }
            else if( acc.Count_Of_Contact__c > oldMap.get(acc.Id).Count_Of_Contact__c){
                
                Integer n;
                for(n=0;n<acc.Count_Of_Contact__c - oldMap.get(acc.Id).Count_Of_Contact__c;n++){
                    Contact con=new Contact();
                    
                    con.LastName=acc.Name+n;
                    con.AccountId=acc.Id;
                    con.Phone='0000000000';
                    con.Email='DemoContact@gmail.com';
                    con.Description='Create this contact from Count Of Contact from Account';
                    conlist1.add(con);  
                }                
            }
            else if(acc.Count_Of_Contact__c == null || acc.Count_Of_Contact__c == 0 || acc.Count_Of_Contact__c < OldMap.get(acc.Id).Count_Of_Contact__c){
                
                Integer i=0;
                List<Contact> conlist2 = new List<Contact>();
                conlist2.addAll(conSetId.get(acc.Id));                
                    for(Contact co:conlist2){
                      if(acc.Count_Of_Contact__c == null ||acc.Count_Of_Contact__c == 0 || i < OldMap.get(acc.Id).Count_Of_Contact__c-acc.Count_Of_Contact__c){
                         conlist3.add(co);
                         i++; 
                    }
                  }              
                }                
             }
          }         
         
          insert conlist1;
          delete conlist3;  
         
   }
    public static void UndeleteContactForCOC(List<Account> newlist){
        System.debug('trigger.new--'+newlist);
                System.debug('trigg--');
        List<Account> conlistUpdate =[SELECT Id, Count_Of_Contact__c,(SELECT Id FROM Contacts) FROM Account WHERE Id IN: newlist];
        System.debug('conlistUpdate--'+conlistUpdate);
        
        for(Account ac:conlistUpdate){
            List<Contact> colist = new List<Contact>();
            colist.addAll(ac.Contacts);
            ac.Count_Of_Contact__c =colist.size();
        }       
        System.debug('conlistUpdate.new--'+conlistUpdate);
        Update conlistUpdate;
    }
    
    
    
  public static void CreateContactFromCOC(List<Account> newlists){
        System.debug('trigger.new--'+newlists);
        List<Contact> conlist=new List<Contact>();
        
        for(Account acc:newlists){
            integer n=0; 
            if(acc.Count_Of_Contact__c != null && acc.Count_Of_Contact__c > 0 ){
                for(n=0;n<acc.Count_Of_Contact__c;n++){
                    Contact con=new Contact();
                    
                    con.LastName=acc.Name+n;
                    con.AccountId=acc.Id;
                    con.Phone='0000000000';
                    con.Email='Dempcontact@gmail.com';
                    con.Description='Create this contact from Count Of Contact from Account';
                    conlist.add(con);
                }            
            }
        }
              System.debug('conlist--'+conlist);

        Insert conlist;
    }

*/

/*   public static void updateLastName(List<Account> accList){
        for(Account acc:accList){
        Contact conlist=[Select Id, LastName FROM Contact WHERE AccountId =: acc.Id AND LastName != null Limit 1];
        acc.Name=acc.Name + conlist.LastName;
         }
      }  
 Or Second code for same work

/*
        String accId = '';
        for(Account acc:accList){
        	accId = acc.Id;
        }
        Contact conList = [Select Id,LastName from Contact Where AccountId =:accId AND LastName != null Limit 1];
        if(conList != null){
            for(Account acc:accList){
            	acc.Name = acc.Name + conList.LastName;
        }
}*/
    
    /*
    public static void Update_Same_Address(List<Account>address){
        for(Account acc:address){
            if(acc.Name == 'New Account' && acc.Same_Address__c!=null){
                acc.Phone = ('8737841177');
                acc.NumberOfEmployees = (3500);
                acc.ShippingStreet = acc.BillingStreet;
                acc.ShippingCity = acc.BillingCity;
                acc.ShippingState = acc.BillingState;
                acc.ShippingCountry = acc.BillingCountry;
                acc.ShippingPostalCode = acc.BillingPostalCode;
            }   
        }
    }
    public static void accInsertconCreate(List<Account>aicc){
        list<contact> conlist =new list<contact>();
        for(Account acc:aicc){
            if(acc.name=='Salesforce'){
                contact con=new contact();
                con.lastname=acc.name+' '+'contact';
                con.accountid=acc.id;
                con.phone='8737841177';
                con.email='accupcrecon@gmail.com';
                conlist.add(con);
            }
        }
      insert conlist;
    }
    /*
    public static void accUpdateoppCreate(List<Account>auoc){
        list<Opportunity> Oppolist = new list<Opportunity>();
        for(Account acc:auoc  ){
            if(acc.name =='Opp Account'){
                Opportunity opp= new Opportunity();
                opp.name=acc.name+'s';
                opp.closedate=Date.newInstance(2022, 12, 9);//for date input.
                opp.stageName='Prospecting';
                opp.accountid=acc.id;
                opp.Description='Created this opportunity for account';
                Oppolist.add(opp);
            }
        }
        insert Oppolist; 
    }
*/
}