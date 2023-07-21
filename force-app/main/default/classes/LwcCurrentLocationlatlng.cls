public class LwcCurrentLocationlatlng { 
    @AuraEnabled
    public static List<Object> locationByLatLng(double lat, double longi) {  
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');       
        req.setEndpoint('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+longi+'&key='+tourManagerUtil.getGoogleApiKey());
        HttpResponse res = h.send(req);        
        Map<String,Object> gr = (Map<String,Object>)JSON.deserializeUntyped(res.getBody());
        List<Object> results = (List<Object>)gr.get('results');
        Map<String,Object> firstResult = (Map<String,Object>)results[4]; // just taking the first one for this example
        List<Object> firstAddressComponents = (List<Object>)firstResult.get('address_components'); 
        return firstAddressComponents;        
    }
    
    @AuraEnabled
    public static List<Object> LatLngByAddress(String StreetVal, String CityVal, String PostalCodeVal) {
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');       
        String address = StreetVal+','+CityVal+','+PostalCodeVal;
        String endPoint = 'https://maps.googleapis.com/maps/api/geocode/json?address='+EncodingUtil.urlEncode(address, 'UTF-8')+'&key='+tourManagerUtil.getGoogleApiKey();
        req.setEndpoint(endPoint);
        HttpResponse res = h.send(req); 
        //System.debug('Response body: ' + res.getBody());
        fromJSON_LatLngByAddress wrpAdd = fromJSON_LatLngByAddress.parse(res.getBody());           
        return wrpAdd.results;
    }
    
    
    @AuraEnabled
    public static String saveAdrsInMpCntnrObj(String name, String street, String city, String postalCode){ 
        String isInsert = 'Insert Failed';  
        String nameSpc = name.trim();
        String streetSpc = street.trim();
        String citySpc = city.trim();
        String postalCodeSpc;
        
        if(String.isNotBlank(postalCode)) {
            postalCodeSpc = postalCode.trim();
        }
        else{
            postalCodeSpc = postalCode;
        }        
        for(Custom_Address__c cstmAdrsObj:[SELECT Id, Name, Street__c, City__c, Postal_Code__c FROM Custom_Address__c LIMIT 10000]){
            if(cstmAdrsObj.Name == nameSpc && cstmAdrsObj.Street__c == streetSpc && cstmAdrsObj.City__c == citySpc && cstmAdrsObj.Postal_Code__c == postalCodeSpc){
                isInsert = 'This record is already saved.';
                return isInsert;  
            }          
        }
       // if(isInsert == 'Insert Failed'){
            Custom_Address__c adrsObj = new Custom_Address__c();
            adrsObj.Name = nameSpc;
            adrsObj.Street__c = streetSpc;
            adrsObj.City__c  = citySpc;
            adrsObj.Postal_Code__c	 = postalCodeSpc;
            isInsert = 'Record is Saved';
            insert adrsObj;
            return isInsert;
       // }       
        // return isInsert;
    }    
    @AuraEnabled
    public static List<Custom_Address__c> getSavedAdrsFromMpCntnrObj(){
        Id userId =UserInfo.getUserId(); 
        return [SELECT Id, Name, Street__c, City__c, Postal_Code__c FROM Custom_Address__c WHERE OwnerId =: userId ORDER BY createdDate DESC LIMIT 10000];  
    }    
    /*
    @AuraEnabled
    public static String deletethisRecord(Id recId){
        String isdelete = 'delete Failed';
        Custom_Address__c dltAdrsObj =[SELECT Id FROM Custom_Address__c WHERE Id =: recId]; 
        Database.DeleteResult dr = Database.delete(dltAdrsObj, false);//returnListAndListContainsIsSuccess(),getId(),getErrors()(ObjORList)
        if (dr.isSuccess()) {
            isdelete = 'Record is Deleted';        
            return isdelete;
        }
        else {
            for(Database.Error err : dr.getErrors()) {//getAllError
                System.debug('The following error has occurred.');                    
                System.debug(err.getStatusCode() + ': ' + err.getMessage());
                System.debug('Account fields that affected this error: ' + err.getFields());
                isdelete = err.getMessage();                
            }
            return isdelete;
        }
        
    }
    */
    
}