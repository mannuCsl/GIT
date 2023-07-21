trigger ContactTrigger on Contact (Before insert, Before update, after update, after insert, after delete){
    
  
    
  /*  if(Trigger.isBefore && Trigger.isUpdate || Trigger.isBefore && Trigger.isInsert){
       Count_Sibling_Of_Contact.throwerror(trigger.new); 
    }*/
   /*
    if(Trigger.isAfter && Trigger.isUpdate){
        Count_Sibling_Of_Contact.dead70IntelTrue(trigger.new);
    }*/
    /*
     if(trigger.isAfter && trigger.isInsert ){
        Count_Sibling_Of_Contact.notsame(trigger.new);
    } 
    /*
    if(trigger.isAfter && trigger.isDelete){
             Count_Sibling_Of_Contact.notsame(trigger.old);            
        }*/
    
     /*if(trigger.IsAfter && trigger.IsUpdate){
      Count_Sibling_Of_Contact.accDependOnIsdead(trigger.new, trigger.oldMap);         
    }*/
    
    /*   if(trigger.isAfter && trigger.isInsert ){
   Count_Sibling_Of_Contact.NewTrigger(Trigger.new);
    }
    
    if(trigger.isAfter && trigger.isdelete){
        Count_Sibling_Of_Contact.OldTrigger(Trigger.old); 
    }
    
  */  
}