trigger LeadTrigger on Lead (after insert, before insert, before update) {
    if(Trigger.isAfter && Trigger.isInsert){
    //ClassForLeads.cloneLead(trigger.new);
        }
   if(Trigger.isBefore && Trigger.isInsert || Trigger.isBefore && Trigger.isUpdate){
     
    for(Lead obj :Trigger.new){
        if(obj.FirstName == 'Test'){
            obj.FirstName.addError('First name cannot be test');
        }
    }
}
}