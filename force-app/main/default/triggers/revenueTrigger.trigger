trigger revenueTrigger on Revenue__c (before insert, before Update, After Insert, After Update) {
   if(Trigger.isbefore && Trigger.isInsert || Trigger.isbefore && Trigger.isUpdate){
        RevenueAssignment.totalAmount(trigger.new);
    }
    if(Trigger.isAfter && Trigger.isInsert || Trigger.isAfter && Trigger.isUpdate){
        Insert RevenueAssignment.createChieldRecord(trigger.new);
       }
    
}