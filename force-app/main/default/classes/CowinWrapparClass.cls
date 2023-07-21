public class CowinWrapparClass{
	    @AuraEnabled public cls_sessions[] sessions;
	public class cls_sessions {
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
	
	@AuraEnabled public static CowinWrapparClass parse(String json){
		return (CowinWrapparClass) System.JSON.deserialize(json, CowinWrapparClass.class);
	}

}