public class fromJSON_LatLngByAddress{
	@AuraEnabled public List<cls_results> results;
	class cls_results {
		@AuraEnabled public cls_geometry geometry;		
	}	
	class cls_geometry {
		@AuraEnabled public cls_location location;
	}	
	class cls_location {
		@AuraEnabled public Double lat;	//28.97347419999999
		@AuraEnabled public Double lng;	//77.6256895
	}
    
      @AuraEnabled public static fromJSON_LatLngByAddress parse(String json){
		return (fromJSON_LatLngByAddress) System.JSON.deserialize(json, fromJSON_LatLngByAddress.class);
	}
}