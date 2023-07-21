trigger EmployeeTrigger on Employee__c (before insert, before update) {
     if(Trigger.isBefore && Trigger.isInsert || Trigger.isBefore && Trigger.isUpdate){
     
    for(Employee__c emp :Trigger.new){
        if(emp.Name == 'demo'){
            emp.Name.addError('First name cannot be demo');
        }
    }
}

}