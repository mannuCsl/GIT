trigger TriggrBook on Book__c (after insert, after Update, after delete, after Undelete) {
    
    if(Trigger.isafter && Trigger.isInsert || Trigger.isafter && Trigger.isUpdate || Trigger.isafter && Trigger.isUndelete){
        BookTriggerHelper.BookQtyUpdateInAccount(trigger.new);
    }
    if(Trigger.isdelete == true && Trigger.isafter == true || Trigger.isafter && Trigger.isUpdate){
        BookTriggerHelper.BookQtyUpdateInAccount(Trigger.old);
    }
}