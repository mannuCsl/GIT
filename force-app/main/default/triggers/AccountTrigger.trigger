trigger AccountTrigger on Account (Before insert, Before update, After insert, After Update, After Undelete) {
  
    
    
    
    /*  if(trigger.isAfter && (trigger.isInsert || trigger.isUpdate)) {
        if(!TopParentAccountNameRecursiveHelper.recursive){
            List<Account> accountsToUpdate = new List<Account>();
            for (Account acc : trigger.new){
                if (acc.Geo_Location__c == null){
                    accountsToUpdate.add(acc);
                    AccountTriggerHelper.getLocation(acc.Id);
                }
            }            
        }
    } 
    */
 /* 
     if(trigger.isAfter && trigger.isInsert){
        AccountTriggerHelper.neverCloseThisMetod(trigger.new);
    }    
    */
    
    /*if(trigger.isAfter && trigger.isInsert || Trigger.isAfter && Trigger.isUpdate){
        AccountTriggerHelper.TopParentAccountName(trigger.new);
    }
   /*    
    if(Trigger.isAfter && Trigger.isUpdate){
        AccountTriggerHelper.OutOfZip(trigger.new, trigger.oldMap);
    }*/
    
    /* 
    if(trigger.isAfter && trigger.isUpdate){
       AccountTriggerHelper.ProfileAssignment(trigger.new); 
    }
    */
    
    /*
     if(trigger.isAfter && trigger.isInsert){
        AccountTriggerHelper.Assignment_3(trigger.new);
    } */  
   
   /* 
     if(Trigger.isAfter && Trigger.isInsert){
        AccountTriggerHelper.CreateContactFromCOC(trigger.new);
    }
     if(Trigger.isAfter && Trigger.isUndelete){
    AccountTriggerHelper.UndeleteContactForCOC(trigger.new);
     }
    if(Trigger.isAfter && Trigger.isUpdate){
        AccountTriggerHelper.CreateConUpdateAccCOC(trigger.new, trigger.oldMap);
    }*/
    
 /*  if(Trigger.IsBefore && Trigger.IsUpdate){
        AccountTriggerHelper.updateLastName(trigger.new);
}
/*
     if(Trigger.IsBefore && Trigger.IsInsert){
       AccountTriggerHelper.Update_Same_Address(trigger.new);
}

     if(trigger.isAfter && trigger.isInsert){
       AccountTriggerHelper.accInsertconCreate(trigger.new);
}
   
     if(trigger.isAfter && trigger.isUpdate){
       AccountTriggerHelper.accUpdateoppCreate(trigger.new);
}*/
}