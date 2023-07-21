import { LightningElement, api, track } from 'lwc';

export default class Mapcontainer extends LightningElement {
     
     @track vfHost = "https://cloudsciencelabs-a-dev-ed--c.vf.force.com/apex/vfpage";
     @track Origin = 'https://cloudsciencelabs-a-dev-ed--c.vf.force.com'; //vfpagePreviewlink
     @track Address=[];
     @track isRunSpinner = false; 
     @track tempr=[]; 
     @track mapDivSize = "slds-size_12-of-12";
     @track markerAddressDivSize = "slds-size_3-of-12";   
     @track ElementListVisible; 
     @track elementList;

     connectedCallback(){                   
          window.addEventListener("message", this.handleVFResponse.bind(this));
          let that = this; 
          that.isRunSpinner = true;         
          let NullAddress =[{street: '', city: '', country: '', postal: '0'},]
          window.onload = function() {
               that.template.querySelector("iframe").contentWindow.postMessage(NullAddress, that.Origin);                  
               that.isRunSpinner = false;
          }
     }

     hanldeProgressValueChange(event){
          this.isRunSpinner  = true;
          this.Address = event.detail;
          try{
               console.log(JSON.parse(JSON.stringify(this.Address)));
               this.template.querySelector("iframe").contentWindow.postMessage((JSON.parse(JSON.stringify(this.Address))), this.Origin);
          } catch (error) {
               console.log(JSON.parse(JSON.stringify(error)));
               console.log(error.message);

          }
          console.log(this.Address);
          event.preventDefault();// Refreshhoneserokrahahai
          if(this.Address[0].street == ''){
               this.messageFromVF=[];
               this.tempr=[];
               //this.template.querySelector("c-drag-a-n-ddrop").handleGetData(this.messageFromVF);
               this.mapDivSize = "slds-size_12-of-12";
          }  
          this.isRunSpinner = false;        
     }  
     
     hanldeProgressValueChangeRemoveElement(event){
          this.elementList = event.detail;
          if(this.elementList.length == 0 || this.elementList[0] == null){
               this.mapDivSize = "slds-size_12-of-12";
               this.messageFromVF=[];
               this.tempr=[];
          }
          else{
               this.tempr = this.elementList;
          }

          // this.ElementListVisible = event.detail;
          // if(!this.ElementListVisible){
          //      this.mapDivSize = "slds-size_12-of-12";
          //      this.messageFromVF=[];
          //      this.tempr=[];
          // }          
     }
    
     handleVFResponse(message) { 
          for(var i=0; i< this.Address.length; i++){              
               if(message.data.lat == this.Address[i].lat && message.data.lng == this.Address[i].lng){  
                    this.tempr.push({ 
                         Name: this.Address[i].street,
                         lat : this.Address[i].lat,
                         lng : this.Address[i].lng,     
                    }); 
               }
          }
          const map = new Map(this.tempr.map((m) => [m.lat+m.lng, m])); 
          this.messageFromVF = Array.from(map, ([key, value]) => value); 
          // setTimeout(() => {
          //           this.messageFromVF=[];
          //           this.tempr=[];
          //      }, 1000,
               this.template.querySelector("c-drag-a-n-ddrop").handleGetData(this.messageFromVF);
               this.mapDivSize = "slds-size_9-of-12";
          //);  
                
     }
}