public class WeatherReportHelper {
    @AuraEnabled
    public static fromJSON weatherReportByCityName(String CityName){
        System.debug('CityName--'+CityName);
         Http http = new Http();
        HttpRequest request = new HttpRequest();
       request.setEndpoint('https://api.openweathermap.org/data/2.5/weather?q='+CityName+'&appid=5e891ec47d9a53cb356d47b02aadeb44');
        system.debug(request);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            system.debug(response);
            system.debug(response.getBody());
            fromJSON wrpData = fromJSON.parse(response.getBody());
            system.debug('wrpData---------------------->>>>>>>>>>>>>'+ fromJSON.parse(response.getBody()));            
            return wrpData;
        }
        return null;
    }
}