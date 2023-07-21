public class FollowRecordHandler {
    public static void followRecord(Map<Id, Opportunity> newOppMap, Map<Id, Opportunity> oldOppMap, String operation){
        System.debug('1--newOppMap'+newOppMap);
        System.debug('2--oldOppMap'+oldOppMap);
        System.debug('3--String-operation'+operation);
        
        List<EntitySubscription> entitySubToBeInsert = new List<EntitySubscription>();   //EntitySubscripition(SObject) To Be Insert
        System.debug('4--list-entitySubToBeInsert'+entitySubToBeInsert);
        List<Id> entitySubIdsToBeDelete = new List<Id>();   //EntitySubscripitionId To Be Delete
        System.debug('5--entitySubIdsToBeDelete'+entitySubIdsToBeDelete);
        
        if(operation.equalsIgnoreCase('insert')){  
        System.debug('6--operation.equalsIgnoreCase');
            for(Opportunity currOpp : newOppMap.values()){
                // Add your condition with if statement
                EntitySubscription follow = new EntitySubscription(parentId = currOpp.id, subscriberid =currOpp.ownerid);
                entitySubToBeInsert.add(follow);
                System.debug('7--follow'+follow);
            }
            
        }
        
        else if(operation.equalsIgnoreCase('update')){
            System.debug('8--equalsIgnoreCase');
            for(Opportunity currOpp : newOppMap.values()){
                
                if(oldOppMap.get(currOpp.Id).OwnerId != currOpp.OwnerId){
                    
                    EntitySubscription follow = new EntitySubscription(parentId = currOpp.id, subscriberid =currOpp.ownerid);
                    
                    entitySubToBeInsert.add(follow);
                   
                    entitySubIdsToBeDelete.add(oldOppMap.get(currOpp.Id).OwnerId);
                   
                }
            }
        }
        
        if(!entitySubToBeInsert.isEmpty()){
            
            insert entitySubToBeInsert;
           
        }
        
        if(!entitySubIdsToBeDelete.isEmpty()){
            
            List<EntitySubscription> entitySubDelete = new List<EntitySubscription>();
            
            for(EntitySubscription currEntity : [select id from EntitySubscription where subscriberid =:entitySubIdsToBeDelete]){
                
                EntitySubscription ent = new EntitySubscription();
               
                ent.ID = currEntity.Id;
               
                entitySubDelete.add(ent);
               
            }
           
            Delete entitySubDelete;
            
        }
    }
}