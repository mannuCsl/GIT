public class tourManagerUtil {
    public static String getGoogleApiKey(){
        ConfigurationKey__mdt mcs = ConfigurationKey__mdt.getAll().values();  //Custom Metadata Type Methods
		return mcs.Google_API_Key__c;
    }

}