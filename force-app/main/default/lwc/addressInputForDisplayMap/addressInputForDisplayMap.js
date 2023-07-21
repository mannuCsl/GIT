import { LightningElement, track, api } from 'lwc';

export default class AddressInputForDisplayMap extends LightningElement {

     @api streetvalue;
     @api cityvalue;
     @api countryvalue;     
     @api postalvalue;
     @api updateRecordView;
     @track progressValue = 0;
     @track postal66;
     itemSize = 12;
     @track fromChild;
  
    
     OnChangeStreet(event){     
     this.streetvalue = event.target.value;
     console.log('Street  ',this.streetvalue);
     }
     OnChangeCity(event){
     this.cityvalue = event.target.value;
     console.log('cityvalue  ',this.cityvalue);
     }
     OnChangeCountry(event){
     this.countryvalue = event.target.value;
     console.log('countryvalue  ',this.countryvalue);
     }     
     OnChangePostalCode(event){
     this.postalvalue = event.target.value;  
     console.log('postalvalue prnt ',this.postalvalue);  
     this.postal66 = this.postalvalue;
     console.log('this.postal66 prnt ',this.postal66);  

     }
     OnClickSearch(event){
          console.log('search click');
          event.preventDefault();// Refreshhoneserokrahahai 
          this.template.querySelector("c-child-Lwc").handleValueChange(this.postal66);
          event.preventDefault();// Refreshhoneserokrahahai          
     }
     OnClickClear(event){
          this.streetvalue='';
          this.cityvalue='';
          this.countryvalue='';
          this.postalvalue='';
          this.template.querySelector('form').reset();
          event.preventDefault();// Refreshhoneserokrahahai
     }

  hanldeProgressValueChange(event) {
    this.progressValue = event.detail;
    this.fromChild = this.progressValue;     
    console.log('this.progressValue--> ',this.progressValue);
  }
       
}