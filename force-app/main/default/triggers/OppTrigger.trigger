trigger OppTrigger on Opportunity (after insert, after update) {
    /*if(Trigger.IsAfter && Trigger.IsUpdate){
        triggerOnOpportunity.amount20k(trigger.new);
    }
*/
    
    
    //trigger FollowRecordOpportunityTrigger on Opportunity (after insert, after update)
{
    if(Trigger.isInsert)
    {
        FollowRecordHandler.followRecord(Trigger.newMap, null, 'insert');
    }
    if(Trigger.isUpdate)
    {
        FollowRecordHandler.followRecord(Trigger.newMap, Trigger.oldMap, 'update');
    }
}
}