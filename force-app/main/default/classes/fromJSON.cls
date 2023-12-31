//
//Generated by AdminBooster
//

public class fromJSON{
	@AuraEnabled public cls_coord coord;
	@AuraEnabled public cls_weather[] weather;
	@AuraEnabled public String base;	//stations
	@AuraEnabled public cls_main main;
	@AuraEnabled public Integer visibility;	//10000
	@AuraEnabled public cls_wind wind;
	@AuraEnabled public cls_clouds clouds;
	@AuraEnabled public Integer dt;	//1667796654
	@AuraEnabled public cls_sys sys;
	@AuraEnabled public Integer timezone;	//19800
	@AuraEnabled public Integer id;	//1263214
	@AuraEnabled public String name;	//Meerut
	@AuraEnabled public Integer cod;	//200
	class cls_coord {
		@AuraEnabled public Double lon;	//77.7
		@AuraEnabled public Double lat;	//28.9833
	}
	class cls_weather {
		@AuraEnabled public Integer id;	//804
		@AuraEnabled public String main;	//Clouds
		@AuraEnabled public String description;	//overcast clouds
		@AuraEnabled public String icon;	//04d
	}
	class cls_main {
		@AuraEnabled public Double temp;	//299.89
		@AuraEnabled public Double feels_like;	//300.22
		@AuraEnabled public Double temp_min;	//299.89
		@AuraEnabled public Double temp_max;	//299.89
		@AuraEnabled public Integer pressure;	//1016
		@AuraEnabled public Integer humidity;	//48
		@AuraEnabled public Integer sea_level;	//1016
		@AuraEnabled public Integer grnd_level;	//991
	}
	class cls_wind {
		@AuraEnabled public Double speed;	//2.06
		@AuraEnabled public Integer deg;	//149
		@AuraEnabled public Double gust;	//2.02
	}
	class cls_clouds {
		@AuraEnabled public Integer all;	//99
	}
	class cls_sys {
		@AuraEnabled public String country;	//IN
		@AuraEnabled public Integer sunrise;	//1667783154
		@AuraEnabled public Integer sunset;	//1667822390
	}
	@AuraEnabled public static fromJSON parse(String json){
		return (fromJSON) System.JSON.deserialize(json, fromJSON.class);
	}

}