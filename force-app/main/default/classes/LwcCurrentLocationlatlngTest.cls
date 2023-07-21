@isTest
public class LwcCurrentLocationlatlngTest {
    @isTest
    static void testLocationByLatLng() {
        double lat = 37.7749295;
        double longi = -122.4194155;
        Test.startTest();
        String body ='{"results":[ {"0":[{"long_name":"San ","short_name":"SF","types":["locality","political"]},{"long_name":"United States","short_name":"US"}]},  {"1":[{"long_name":"San ","short_name":"SF","types":["locality","political"]},{"long_name":"United States","short_name":"US"}]},  {"2":[{"long_name":"San ","short_name":"SF","types":["locality","political"]},{"long_name":"United States","short_name":"US"}]},  {"3":[{"long_name":"San ","short_name":"SF","types":["locality","political"]},{"long_name":"United States","short_name":"US"}]},       {"address_components":[{"long_name":"San Francisco","short_name":"SF","types":["locality","political"]},{"long_name":"San Francisco County","short_name":"San Francisco County","types":["administrative_area_level_2","political"]},{"long_name":"California","short_name":"CA","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]}]}]}';
        Test.setMock(HttpCalloutMock.class, new LwcCurrentLocationlatlngMock(200, body));        
        List<Object> result = LwcCurrentLocationlatlng.locationByLatLng(lat, longi);  
        Test.stopTest();
        System.assertEquals('San Francisco', ((Map<String,Object>)result[0]).get('long_name'));
        System.assertEquals('California', ((Map<String,Object>)result[2]).get('long_name'));
    }   
    @isTest
    static void testLatLngByAddress(){  
        String StreetVal = 'Setor 18';
        String CityVal = 'Delhi';
        String PostalCodeVal = '110042';         
        Test.startTest();
        String body ='{"results":[{"formatted_address":"123 Main St,San Francisco,CA 94111, USA","geometry":{"location":{"lat":37.7981467,"lng":-122.4018278}}}]}';
        Test.setMock(HttpCalloutMock.class, new LwcCurrentLocationlatlngMock(200, body));        
		List<Object> result = LwcCurrentLocationlatlng.LatLngByAddress(StreetVal, CityVal, PostalCodeVal); 
        system.debug(result);
        Test.stopTest();
    }
     static testMethod void testsaveCustomAddressAndGetAllCustomAddress(){
        String name='testadd'; String street='testStreet'; String city='testCity'; String postalCode='testPostalCode';
        string testInsertOperation = LwcCurrentLocationlatlng.saveAdrsInMpCntnrObj(name, street, city, postalCode);
        System.assertEquals('Record is Saved', testInsertOperation);
        
        List<Custom_Address__c> addList = LwcCurrentLocationlatlng.getSavedAdrsFromMpCntnrObj();
        System.assertEquals(1, addList.size());
        System.debug('addList '+addList);
        
        
        String name1='testadd'; String street1='testStreet'; String city1='testCity'; String postalCode1='testPostalCode';
        string testInsertOperation1 = LwcCurrentLocationlatlng.saveAdrsInMpCntnrObj(name1, street1, city1, postalCode1);
        System.assertEquals('This record is already saved.', testInsertOperation1);
        
        String name2='testadd'; String street2='testStreet'; String city2='testCity'; String postalCode2='';
        string testInsertOperation2 = LwcCurrentLocationlatlng.saveAdrsInMpCntnrObj(name2, street2, city2, postalCode2);
        System.assertEquals('Record is Saved', testInsertOperation2);
    }
}