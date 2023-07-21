import { LightningElement, api, track } from 'lwc';

export default class DisplayMap extends LightningElement{    
     @api street22;
     @api city33;
     @api country44;
     @api postal66;
     mapMarkers; 
     zoomlevel = 0;
     
     

     
     @api handleValueChange(event){ 
          // let btn = this.template.createElement("mapMarkers");
          // btn.innerHTML = "Save";
          // btn.addEventListener("click", function () {
          // alert("Button is clicked");
          // });
          // this.template.body.appendChild(btn);              
          this.zoomlevel = 10;               
          this.mapMarkers = [
               {
               location: {
                    Street: this.street22,
                    City:this.city33,              
                    Country:this.country44,
                    PostalCode: this.postal66,                                                            
               },  
               title: this.street22,
               description: this.aleartbutton,            
                     
               },
               {
               location: {
                    Street:this.city33+' Railway Station',
                    City:this.city33 ,
                    Country: this.country44,
                    PostalCode: this.postal66
                    },
                    title: "Railway Station",
                    description: this.city33+', '+this.country44+', '+this.postal66+' '+ '<button class="slds_button">Button</button>',
                    icon: "standard:announcement"                  
               },
               {
               location: {
                    Street:'District Hospital '+this.city33,
                    City:this.city33,
                    Country: this.country44,
                    PostalCode: this.postal66              
                    }, 
                    title: "Community Health Center",//"District Hospital",
                    description:this.street22+", "+this.city33+", "+this.country44+", "+this.postal66,
                    icon: "custom:custom98"                  
               },
               {
               location: {
                    Street:'primary school '+this.street22,
                    City:this.city33,
                    Country: this.country44,
                    PostalCode: this.postal66                     
               }, 
               title: "School",
               description: this.street22+', '+this.city33+', '+this.country44+', '+this.postal66,
               icon: "standard:store_group"                  
               },
               {
               location: {
                    Street:'Police Station '+this.city33,///this.city33+' Police Station',
                    City:this.city33,
                    Country: this.country44,
                    PostalCode: this.postal66                    
               },
               title: "Police Station",
               description: this.street22+', '+this.city33+', '+this.country44+', '+this.postal66,
               icon: "standard:orchestrator"                  
               }                              

          ];
     }

         
     
     
   
}