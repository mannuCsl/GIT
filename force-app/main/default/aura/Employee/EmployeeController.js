({    
    //Handle Employee__c Save
    handleLeadSave : function(component, event, helper) {
        var objemp = component.get("v.objemp");
        var action = component.get("c.createEmployee");
        action.setParams({
            objemp : objemp             
        });
       console.log('1js objemp--',+objemp);
        
        action.setCallback(this,function(a){
            var state = a.getState();
            if(state === "SUCCESS"){
                alert('Record is Created Successfully');
            } else if(state === "ERROR"){
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert(errors[0].message);
                    }
                }
            }else if (status === "INCOMPLETE") {
                alert('No response from server or client is offline.');
            }
        });   
        console.log('2js objemp--',+objemp);
        $A.enqueueAction(action);
    }
})