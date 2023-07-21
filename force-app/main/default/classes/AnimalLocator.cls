Public class AnimalLocator {
    public static String getAnimalNameById(Integer id){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/'+id);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        String strResp = '';
        if (response.getStatusCode() == 200) {
           Map < String, Object > results = (Map < String, Object >) JSON.deserializeUntyped(response.getBody());
           Map < string, Object > animals = (Map < String, Object >) results.get('animal');
           strResp = string.valueof(animals.get('name'));
        }
        
        System.debug(strResp);
        System.debug(response.getBody());
        return strResp ;
    }  
}


/*public class Animals{
    public static HttpResponse animals(){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json;charset=UTF-8');
        req.setBody('{"Name":"Lion"}');
        
        HttpResponse res = http.send(req);
        
        if(res.getStatusCode() == 200){
            System.debug(res.getBody());
        }
        else{
            System.debug('Error. Status :'+ res.getStatusCode());
        }
        return res;
    }
}*/