public class FindNearByCtrl {
    /*
    		* * * * * * * * * * * * * * * * * * * * *
    		* 	@version 1.0					    *
    		* 	@group : 						    *
    		* 	@createdBy : 					    *
    		* 	@date : 10-04-2023 			 	    *
   		    * * * * * * * * * * * * * * * * * * * * *
	*/
    @AuraEnabled
    public static string findNearBy(List<RelatedFilter> filterLists){
        //System.debug(' size '+filterLists.size()+'   Initial DATA ' +filterLists); 
        
        Map<String, List<filterList>> wrapperMap = new Map<String, List<filterList>>();
        String queryFields = ' ' ;
        String WHEREClause = ' ' ;
        for(integer i=0;i<filterLists.size();i++){
            //System.debug('Apex DATA ' + filterLists[i].label);
          //System.debug('Apex DATA ' + filterLists[i].filterList[0]);
            //for(integer j=0;j<filterLists[i].filterList.size();j++){
                wrapperMap.put(filterLists[i].label, filterLists[i].filterList);
               //System.debug('Final DATA ' +filterLists[i].filterList[j].operator); 
            //}
        }
         
        
        if(!wrapperMap.keySet().isEmpty()){
          
            if(wrapperMap.keySet().contains('Account')){
                if(wrapperMap.get('Account').size()!=0){
                	for(integer j=0;j<wrapperMap.get('Account').size();j++){
                 		System.debug('Applied Filter are ' + wrapperMap.get('Account')[j].name+' '+ wrapperMap.get('Account')[j].operator+' '
                                    + wrapperMap.get('Account')[j].operatorValue+' '+ wrapperMap.get('Account')[j].operatorValueType); 
                        //System.debug(' before : '+queryFields);
                        
                        queryFields = wrapperMap.get('Account')[j].name+','+queryFields;
                        WHEREClause = wrapperMap.get('Account')[j].operator;
                        if(wrapperMap.get('Account')[j].operatorValueType == 'BOOLEAN'){
                        		    
                        }
                        if(wrapperMap.get('Account')[j].operatorValueType == 'STRING'){
                            
                        }
                	}
                }
                else{
                    System.debug('No Filter is Applied From User');
                }
             	List<Account> accList = new List<Account>();
              
                queryFields=queryFields.substringBeforeLast(',');
                
        		String query = 'SELECT Id,'+queryFields+' FROM Account WHERE Name='+WHEREClause+' LIMIT 10';
                System.debug('Acoounts Query is: '+query); 
				accList = Database.query(query);
        		System.debug('Acoounts are '+accList);   
            }
            if(wrapperMap.keySet().contains('Contact')){
                List<Contact> conList = new List<Contact>();
        		String query = 'SELECT Id,Name FROM Contact  LIMIT 10';
				conList = Database.query(query);
        		System.debug('Contact are '+conList); 
                
            }
            if(wrapperMap.keySet().contains('Lead')){
                List<Lead> LeadList = new List<Lead>();
        		String query = 'SELECT Id, Name FROM Lead  LIMIT 10';
				LeadList = Database.query(query);
        		System.debug('Leads are '+LeadList); 
                
            }
            
        }
        else{
            System.debug('Please Add atleast one Filter');
        }
        
        
        
        
        return 'hello';
    }
    public class filterList{
        @AuraEnabled public String objectName{get;set;}
        @AuraEnabled public Integer id{get;set;}
        @AuraEnabled public Integer sno{get;set;}
        @AuraEnabled public String name{get;set;}
        @AuraEnabled public String operator{get;set;}
        @AuraEnabled public String operatorValue{get;set;}
        @AuraEnabled public String operatorValueType{get;set;}
    }    
    public class RelatedFilter {
        @AuraEnabled public List<filterList> filterList{get;set;}
        @AuraEnabled public String label{get;set;}
        @AuraEnabled public String value{get;set;}
    }
    
}