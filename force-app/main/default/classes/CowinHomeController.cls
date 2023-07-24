public class CowinHomeController {
    @AuraEnabled
    public static List<Wrapper> cowinDataSorting(String pincode, date covidDate){
        Http http = new Http();
        HttpRequest request = new HttpRequest();       
        system.debug('Pincode: '+pincode);
        system.debug('Date: '+covidDate);
        String dateStr = covidDate.day() + ' - ' + covidDate.month() + ' - ' +covidDate.year();
         System.debug('dateStr: '+dateStr);	
        String link = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pincode+'&date='+dateStr;
        System.debug('link: '+link);
        request.setEndpoint(link);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            
            system.debug(response.getBody());           
            CowinWrapparClass wrpData = CowinWrapparClass.parse(response.getBody());           
            system.debug('wrpData -- '+wrpData); 
            system.debug('wrpData.sessions -- '+wrpData.sessions); 
            system.debug('wrpData.sessions.size -- '+wrpData.sessions.size());
            system.debug('wrpData.sessions -- '+wrpData.sessions[0].buttonDisable);
            
            List<Wrapper> wrplist = new List<Wrapper>();
                    List<Cowin_Data__c> cdlist2 =[SELECT Id, Session_Id__c FROM Cowin_Data__c];
               Map<String, Cowin_Data__c> covidDataMap = new Map<String, Cowin_Data__c>();
             for(Cowin_Data__c cdm:cdlist2){
            covidDataMap.put(cdm.Session_Id__c, cdm);
        }
            for(CowinWrapparClass.cls_sessions ses : wrpData.sessions){
                Wrapper wrp = new Wrapper();
                
                wrp.center_id = ses.center_id;
                wrp.address = ses.address;
                wrp.name = ses.name;
                wrp.state_name = ses.state_name;
                wrp.pincode = ses.pincode;
                wrp.district_name = ses.district_name;
                wrp.lat = ses.lat;
                wrp.block_name = ses.block_name;
                wrp.fee_type = ses.fee_type;
                wrp.center_id = ses.center_id;
                wrp.to = ses.to;
                wrp.session_id = ses.session_id;
                wrp.available_capacity = ses.available_capacity;
                wrp.available_capacity_dose1 = ses.available_capacity_dose1;
                wrp.available_capacity_dose2 = ses.available_capacity_dose2;
                wrp.min_age_limit = ses.min_age_limit;
                wrp.fee = ses.fee;
                wrp.allow_all_age = ses.allow_all_age;
                wrp.vaccine = ses.vaccine;
                if(covidDataMap.containsKey(ses.session_id)) {
                wrp.buttonDisable = true;
                }
                else{
                wrp.buttonDisable = false;
            }
                
                //wrp.buttonDisable = ses.buttonDisable;
                
                wrplist.add(wrp);
                
                System.debug('center_id'+ses.center_id);
                System.debug('name'+ses.name);                
                System.debug(ses.block_name);                
                System.debug(ses.available_capacity);                
                System.debug(ses.fee_type);                
                System.debug(ses.vaccine);
                System.debug('buttonDisable--'+wrp.buttonDisable);
                
            }
            
            
            return wrplist;  // wrpData.sessions;
        }
        return null;
    }
    
    
    
    public class wrapper{
    
     @AuraEnabled public Integer center_id;	//659668
     @AuraEnabled public String name;	//BHAWANPUR BAHCHOLA
     @AuraEnabled public String address;	//VILLAGE BAHCHOLA
     @AuraEnabled public String state_name;	//Uttar Pradesh
     @AuraEnabled public String district_name;	//Meerut
     @AuraEnabled public String block_name;	//Rajpura
     @AuraEnabled public Integer pincode;	//250001
     @AuraEnabled public String from1;	//09:00:00
     @AuraEnabled public String to;	//14:30:00
     @AuraEnabled public Integer lat;	//29
     @AuraEnabled public Integer long1;	//77
     @AuraEnabled public String fee_type;	//Free
     @AuraEnabled public String session_id;	//767a57c1-1d28-4328-b635-f5d9233b1133
     @AuraEnabled public String date1;	//14-09-2022
     @AuraEnabled public Integer available_capacity;	//60
     @AuraEnabled public Integer available_capacity_dose1;	//20
     @AuraEnabled public Integer available_capacity_dose2;	//20
     @AuraEnabled public String fee;	//0
     @AuraEnabled public Integer min_age_limit;	//15
     @AuraEnabled public boolean allow_all_age;
     @AuraEnabled public boolean buttonDisable;
     @AuraEnabled public String vaccine;	//COVAXIN
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    @AuraEnabled
    public static Integer saveCowinRecord(String pincode, date covidDate, String recordId){
        System.debug('pincode--'+pincode);
        System.debug('covidDate--'+covidDate);
        System.debug('recordId--'+recordId);
        Integer inV = Integer.ValueOf( pincode );
        System.debug('inV--'+inV);
        
        List<Cowin_Data__c> cdlist =[SELECT Id, Session_Id__c FROM Cowin_Data__c WHERE Session_Id__c =: recordId LIMIT 1];
        
        System.debug('cdlist--'+cdlist);
        
        Integer run=0;
        if(cdlist.size() > 0){            
            return 0;            
        }
        
        List<Cowin_PinCode__c> checkIt =[SELECT Id FROM Cowin_PinCode__c WHERE Pin_Code__c =:inV];
                system.debug('checkIt--'+checkIt);
       
        if(checkIt.size() > 0){
              system.debug('in if--'+checkIt);
            run =10;
           
        }
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String dateStr = covidDate.day() + ' - ' + covidDate.month() + ' - ' +covidDate.year();        
        request.setEndpoint('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pincode+'&date='+dateStr);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200){          
            CowinWrapparClass wrpData = CowinWrapparClass.parse(response.getBody());
            List<Cowin_PinCode__c> newCclist = new List<Cowin_PinCode__c>();
            List<Cowin_Data__c> newlist = new List<Cowin_Data__c>();
            
            for(CowinWrapparClass.cls_sessions ses : wrpData.sessions){
                 System.debug('false--'+ses.session_id == recordId && run != 10 );
                if(ses.session_id == recordId && run != 10 ){
                    System.debug('true--'+ses.session_id == recordId && run != 10 );
                    Cowin_PinCode__c cc = new Cowin_PinCode__c();
                    
                    cc.Address__c = ses.address;
                    cc.Block_name__c = ses.block_name;
                    cc.Center_Id__c = ses.center_id;
                    cc.Name = ses.name;
                    cc.District__c = ses.district_name;
                    cc.Pin_Code__c = ses.pincode;
                    cc.State__c = ses.state_name;
                    newCclist.add(cc);
                }
            }
                            system.debug('newCclist--'+newCclist);

            Insert newCclist;
            Integer intVal = Integer.ValueOf( pincode );
            List<Cowin_PinCode__c> ccid =[SELECT Id FROM Cowin_PinCode__c WHERE Pin_Code__c =: intVal LIMIT 1];
                                        system.debug('ccid--'+ccid);
            Id cpid ;
            for(Cowin_PinCode__c cp:ccid){
                cpid = cp.Id;
            }

                        
            for(CowinWrapparClass.cls_sessions ses : wrpData.sessions){
                 if(ses.session_id == recordId){
                    Cowin_Data__c cow = new Cowin_Data__c();
                    
                    cow.Allow_All_Age__c = ses.allow_all_age;
                    cow.Available_Capacity_Dose_1__c = ses.available_capacity_dose1;
                    cow.Available_Capacity_Dose_2__c = ses.available_capacity_dose2;
                    cow.Available_Capacity__c = ses.available_capacity;
                    cow.Cowin_PinCode__c = cpid;
                    cow.Name = ses.block_name + ses.vaccine;
                    cow.Lat__c = ses.lat;
                    cow.Minimum_Age__c = ses.min_age_limit;
                    cow.Session_Id__c = ses.session_id;
                    cow.Vaccine__c = ses.vaccine;
                    cow.Fee_Type__c = ses.fee_type;
                    //cow.Date__c = ses.date;
                    Integer intV = Integer.ValueOf( ses.fee );
                    cow.Fee__c = intV;
                    //cow.From__c = ses.from;                    
                    //cow.Long__c = ses.long;                    
                    //cow.To__c = ses.to;
                    
                    newlist.add(cow);
                }
            }
                                        system.debug('newlist--'+newlist);

            Insert newlist;
            return 1;
        }
        return 0;
    }
 
    
}