/* @version 1.0
* @group : 
* @createdBy : Prayag Raaz
* @date : 10-01-2023 
*/
global with sharing class SetFilterContrl {

    @AuraEnabled
    public static Map<String, List<String>>  mapForFields(String objectName){
        
        //setupData holds all the required fields as Account,Contact and Lead.
        Setup__c	setupData = [SELECT id, AccountFields__c, ContactFields__c, LeadFields__c FROM Setup__c limit 1];
        DescribeSObjectResult desSObjectResult = Schema.getGlobalDescribe().get(objectName).getDescribe();
        Map<String, Schema.SObjectField> allFieldsOfRequiredObjectAsMap =  desSObjectResult.fields.getMap();//Returns the name of Object's Original fields.
        Set<String> fieldsUsedInFilter = new Set<String>();		//holds data of setup Object & will be used as field name of Selected Object in lower case
        Set<String> fieldTypeSet = new Set<String>();		//holds field DATATYPE 
        Map<String, List<String>> datatypeToFieldsMap = new Map<String, List<String>>(); // holds DATATYPE : Field Values as Map
        try{
            String objectFilterFields = (String)setupData.get(objectName+'Fields__c'); //get values(fields) of only selected object
            fieldsUsedInFilter.addAll(objectFilterFields.split('%')); //removing % from value inserted in setup object
        }
        catch(Exception e){
            System.debug('Exception : ' + e.getMessage());
        }  
        for(String fieldName : fieldsUsedInFilter){
            if(!allFieldsOfRequiredObjectAsMap.keySet().contains(fieldName)) {continue;}
            
            if(datatypeToFieldsMap.isEmpty()){
			List<String> fieldListForMap = new List<String>(); //creating list to strore field name first time.               
                fieldListForMap.add(fieldName);
				datatypeToFieldsMap.put(allFieldsOfRequiredObjectAsMap.get(fieldName).getDescribe().getType().name(), fieldListForMap); //putting DATATYPE(BOOLEAN) : relatedfield(isdeleted) first time 
            }
            else{ 
                //Checking if there is an existing pair in map,if yes then add more fields for same KEY(DATATYPE)
                if(datatypeToFieldsMap.containsKey(allFieldsOfRequiredObjectAsMap.get(fieldName).getDescribe().getType().name())){
                   List<String> getExistingListFromMap = datatypeToFieldsMap.get(allFieldsOfRequiredObjectAsMap.get(fieldName).getDescribe().getType().name());
                 getExistingListFromMap.add(fieldName);
                  datatypeToFieldsMap.put(allFieldsOfRequiredObjectAsMap.get(fieldName).getDescribe().getType().name(), getExistingListFromMap);
               }
               else{
                   List<string> newfieldListForMap = new List<string>();
                    newfieldListForMap.add(fieldName);
                       datatypeToFieldsMap.put(allFieldsOfRequiredObjectAsMap.get(fieldName).getDescribe().getType().name().toUpperCase(), newfieldListForMap); 
                }
               
           }        }
            return datatypeToFieldsMap;
    }


    @AuraEnabled 
    public static List<String> requiredObjectFields(String objectName){
        SObjectType selectedObject = Schema.getGlobalDescribe().get(objectName);
        Map<String,Schema.SObjectField> allFieldsOfRequiredObject_Map = selectedObject.getDescribe().fields.getMap();
       Setup__c	setupData = [SELECT id, AccountFields__c, ContactFields__c, LeadFields__c FROM Setup__c limit 1];
        DescribeSObjectResult desSObjectResult = Schema.getGlobalDescribe().get(objectName).getDescribe();
        Map<String, Schema.SObjectField> fieldMap =  desSObjectResult.fields.getMap();
        Set<String> objectUsedInFilter = new Set<String>();
        List<String> sObjectDetailsList = new List<String>();
        try{
            String objectFilterFields = (String)setupData.get(objectName+'Fields__c');
            objectUsedInFilter.addAll(objectFilterFields.split('%'));
        }
        catch(Exception e){
            System.debug('Exception : ' + e.getMessage());
        }  
        for(String fieldName : objectUsedInFilter){
            if(!fieldMap.keySet().contains(fieldName)) {continue;}
            sObjectDetailsList.add(fieldName.toUpperCase());
        }
            return sObjectDetailsList;
    }

    @AuraEnabled 
    global static List<String> getPickListValues(String objectName, String fieldName){
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        List<Schema.PicklistEntry> picklistValues = fieldMap.get(fieldName).getDescribe().getPicklistValues();
        List<string> pickListValuesOfSelectedField = new List<string>();
        for(Schema.PicklistEntry pickListValue : picklistValues) {
           pickListValuesOfSelectedField.add(pickListValue.getLabel());
        }
        return pickListValuesOfSelectedField;
    }
    // global class PickListWrapper{
    //     String Label{get;set;}
    //     String Value{get;set;}
        
    //     public PickListWrapper(String Label, String Value){
    //         this.Label = Label;
    //         this.Value = Value;
    //     }
    // }
//=================================================================================================
    //  class CrossObjectFilterWrap{
    //     public String name {get; set;}
    //     public String label {get; set;} 
    //     public CrossObjectFilterWrap(string name, String label){
    //         this.name = name;
    //         this.label = label;
    //     }
    // }
    @AuraEnabled
    public static List<String> gettingChildObjectsToSetCrossFilters(String crossFilterObjectName){
        try {
            List<String> lstOfChildObjectAPI = new List<String>();       
        List<Setup__c> stupList =   [SELECT Id, Contact_Related_SObjects__c, Account_Related_SObjects__c, Lead_Related_SObjects__c FROM Setup__c LIMIT 1]; 
        System.debug('========'+stupList);
            if(stupList.size() != 0){
            if(crossFilterObjectName == 'Account' && stupList[0].Account_Related_SObjects__c != null){
                lstOfChildObjectAPI.addAll(stupList[0].Account_Related_SObjects__c.split('%'));
            }else if(crossFilterObjectName == 'Contact' && stupList[0].Contact_Related_SObjects__c != null){
                lstOfChildObjectAPI.addAll(stupList[0].Contact_Related_SObjects__c.split('%'));
            }else if(crossFilterObjectName == 'Lead' && stupList[0].Lead_Related_SObjects__c != null){
                lstOfChildObjectAPI.addAll(stupList[0].Lead_Related_SObjects__c.split('%'));
            }
        }
            System.debug('==lstOfChildObjectAPI======'+lstOfChildObjectAPI);
         if(!lstOfChildObjectAPI.isEmpty()){
             
            //List<CrossObjectFilterWrap> listOfWrap = new List<CrossObjectFilterWrap>();
             
             //SObjectType acc = Schema.getGlobalDescribe().get('Asset');
             //Map<String,Schema.SObjectField> allFields = acc.getDescribe().fields.getMap();
             
            // Schema.DescribeSobjectResult[] results = Schema.describeSObjects(lstOfChildObjectAPI);
            // for(Schema.DescribeSobjectResult res : results) {
            //     listOfWrap.add(new CrossObjectFilterWrap(res.getName(), res.getLabel()));
            // }
            //  System.debug('======listOfWrap=='+listOfWrap);
            return lstOfChildObjectAPI;
        }else {return null;}    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    public class CrossFieldNameLabelAndDatatype{
        public String fieldsName                    {get;set;}
        public String fieldsDataType                {get;set;}
        public String fieldsLabel                   {get;set;}
        public Map<String,String> pickListValues                   {get;set;}
        public CrossFieldNameLabelAndDatatype(String fieldsName,String fieldsDataType,String fieldsLabel, Map<String,String> pickListValues){                                        
            this.fieldsName = fieldsName;
            this.fieldsDataType = fieldsDataType;
            this.fieldsLabel = fieldsLabel;
            this.pickListValues = pickListValues;
        }
    }
     @AuraEnabled
    public static Map<String, List<String>> requiredObjectFieldsForCrossFilter(String objName){
        System.debug('object '+objName);
        Set<String> fieldTypeSet = new Set<String>();
        Map<String, List<String>> mapOfCrossFilterFieldsWithOperatorType = new Map<String, List<String>>();
       // public static List<String> getObjectFileds(){
        
        DescribeSObjectResult desSObjectResult1 = Schema.getGlobalDescribe().get(objName).getDescribe();
        Map<String, Schema.SObjectField> allFieldsOfRequiredObjectAsMap =  desSObjectResult1.fields.getMap();
          
            Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
			Map<String, Schema.SObjectField> fieldMap1 = schemaMap.get(objName).getDescribe().fields.getMap();
        	for(Schema.SObjectField objField : fieldMap1.values()){
            	Schema.DescribeFieldResult details = objField.getDescribe();
                if(mapOfCrossFilterFieldsWithOperatorType.isEmpty()){
                    List<String> lstOfChildObjectAPI = new List<String>(); 
                    lstOfChildObjectAPI.add(details.getLabel());
                    mapOfCrossFilterFieldsWithOperatorType.put(String.valueOf(details.getType()),lstOfChildObjectAPI);
                     System.debug('when empty '+mapOfCrossFilterFieldsWithOperatorType);
                }
                else{
                   if(!mapOfCrossFilterFieldsWithOperatorType.containsKey(String.valueOf(details.getType()))){
                       List<String> lstOfChildObjectAPI = new List<String>(); 
                       lstOfChildObjectAPI.add(details.getLabel());
                	   mapOfCrossFilterFieldsWithOperatorType.put(String.valueOf(details.getType()),lstOfChildObjectAPI); 
                       System.debug('when not contains key '+mapOfCrossFilterFieldsWithOperatorType);
               		}
                    else{
                         List<String> getExistingListFromMap = mapOfCrossFilterFieldsWithOperatorType.get(String.valueOf(details.getType()));
                 		getExistingListFromMap.add(details.getLabel());
                        System.debug('when contains key '+mapOfCrossFilterFieldsWithOperatorType);
                    }
                }    
        	}
        	System.debug('Final map '+mapOfCrossFilterFieldsWithOperatorType);
        return mapOfCrossFilterFieldsWithOperatorType;        
    }
 
}