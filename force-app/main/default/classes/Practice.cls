public class Practice {
    public static void recursion(Integer firstNum){
        System.debug('firstNum: '+firstNum);
        Integer result = callRec(firstNum);
        System.debug('result: '+result);
    }
    private static Integer callRec(Integer num){
        System.debug('num: '+num);
        if(num==0 || num==1){
            return 1;
        }
        else{
            return num*callRec(num-1);
        }
    }
    
    
    
    
    public static void continueMethod(DateTime strDate, DateTime endDate){
        System.debug('strDate: '+strDate+' endDate: '+endDate);
        while (strDate <= endDate) {
            Decimal totalRequiredDaysTracked = 0;
            
            if(strDate.format('EEEE') == 'Saturday' || strDate.format('EEEE') == 'Sunday'){
                strDate = strDate.addDays(1);
                continue;
            }
            System.debug('Date: '+strDate+' Day: '+strDate.format('EEEE'));
            strDate = strDate.addDays(1);
        }
    }
    
    
    
    public static void swithchMethod(String context){
        switch on context {
            when 'a' {
                system.debug('abc');
            }                
            when 'x' {
                system.debug('xyz');
            }
            when else{
                System.debug('none');
            }        
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public static List<Map<String, String>> getPicklistFieldValues(String objectApiName, String fieldApiName) {
        //List<String> picklistValues = new List<String>();
        Map<String, String> picklistMap = new Map<String, String>();
        
        try {
            Schema.DescribeSObjectResult describeResult = Schema.getGlobalDescribe().get(objectApiName).getDescribe();
            Schema.DescribeFieldResult fieldResult = describeResult.fields.getMap().get(fieldApiName).getDescribe();
            
            if (fieldResult != null) {
                List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();
                
                for (Schema.PicklistEntry picklistEntry : picklistEntries) {
                    //picklistValues.add(picklistEntry.getLabel());
                    picklistMap.put(picklistEntry.getLabel(), picklistEntry.getLabel());
                }
            }
        } catch (Exception ex) {
            // Handle any exceptions, such as invalid object or field API names
            System.debug('Error retrieving picklist values: ' + ex.getMessage());
        }
        System.debug('picklistMap...'+picklistMap);
        List<Map<String, String>> listOfPicklistMap = new List<Map<String, String>>();
        listOfPicklistMap.add(picklistMap);
        return listOfPicklistMap;
    }
    
    
    
    
    
    
    public static Integer getNoOfDaysBetween2Dates(Date firstDate, Date secondDate, List<String> leaveDaysList){
		System.debug('firstDate'+firstDate);
        System.debug('secondDate'+secondDate);
        System.debug('leaveDaysList'+leaveDaysList);
        Integer returnCount = 0;
        DateTime startDate = firstDate; 
        Datetime endDate   = secondDate;
        while (startDate < endDate) {
            for(String leaveDay: leaveDaysList){
                System.debug(leaveDaysList+'startDate.format(\'EEEE\')'+startDate.format('EEEE'));
                if (startDate.format('EEEE') == leaveDay) {
                    returnCount++; 
                }
            }            
            startDate = startDate.addDays(1);
            System.debug('startDate'+startDate);
        }
        System.debug('TimeTrackingUtils-returnCount====>>>'+returnCount);
        return returnCount;
    }
    Id profileId = userinfo.getProfileId();
    String profileName = [Select Id, Name from Profile where Id =: profileId].Name;
    List<Account>accList = [SELECT Id, Name, CreatedDate FROM Account WHERE CreatedDate > Last_N_Months:4];
    
    /////////////////////////////////////////////////////////////////////////
 /*   Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
system.debug('schemaMap-->'+schemaMap);
sObject sobj;
Schema.SObjectType leadSchema = schemaMap.get('account');
sobj = leadSchema.newSObject();
system.debug('sobj-->'+sobj);
Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
Schema.SObjectField field = fieldMap.get('Name');
Schema.DisplayType fielddataType = fieldMap.get('Name').getDescribe().getType();//return string

system.debug(field+'<<==fielddataType-->'+fielddataType);*/
////////////////////////////////////////////////////////////////////////
}