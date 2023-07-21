public without sharing class SfWiki_Handler {

    @AuraEnabled(Cacheable=true)
    public static List<Fields> getListOfFields(String sObjectName, String searchTerm) {
        List<Fields> listOfFields = new List<Fields>();

        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = schemaMap.get(sObjectName).getDescribe().fields.getMap();

        for(String fieldName : fieldMap.keySet()) {
            //We don't want to search for fields with these data-types: ADDRESS, REFERENCE, ID & URL
            if(String.valueOf(fieldMap.get(fieldName).getDescribe().getType()) != 'ADDRESS'
                    && String.valueOf(fieldMap.get(fieldName).getDescribe().getType()) != 'REFERENCE'
                    && String.valueOf(fieldMap.get(fieldName).getDescribe().getType()) != 'ID'
                    && String.valueOf(fieldMap.get(fieldName).getDescribe().getType()) != 'URL') {
                if(String.valueOf(fieldMap.get(fieldName).getDescribe().getLabel().toLowerCase()).contains(searchTerm.toLowerCase())) {
                    Fields newFieldProperties = new Fields();
                    newFieldProperties.fieldLabel = fieldMap.get(fieldName).getDescribe().getLabel();
                    newFieldProperties.fieldName = fieldMap.get(fieldName).getDescribe().getName();
                    newFieldProperties.fieldType = String.valueOf(fieldMap.get(fieldName).getDescribe().getType());
                    listOfFields.add(newFieldProperties);
                }
            }

        }

        return listOfFields;
    }

    public class Fields {
        @AuraEnabled
        public String fieldLabel { get; set; }
        @AuraEnabled
        public String fieldName { get; set; }
        @AuraEnabled
        public String fieldType { get; set; }
    }

}