({
	closeModel : function(component, event, helper) {
		component.set("v.isModalOpen", false)
	},
      savecontact: function(component, event, helper) {
      var newcon = component.get("v.newContacts");
  	  var action = component.get("c.save");
       action.setParams({ "con": newcon  });
		action.setCallback(this, function(response) {
           var state = response.getState();
           if (state === "SUCCESS") {
               var name = response.getReturnValue();
               console.log('returned value ',name);
               alert("success");
            }
         else
         {
              alert("Failed");
         }
        });
    $A.enqueueAction(action)
	},
     handleSubmit : function(component, event, helper) {
    },
    handleClose : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire()
    }
})