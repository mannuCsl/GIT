import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class TourManager extends LightningElement {
     visiblePopUp = false;
     Nam;
     Str;
     PstlKod;
     Ct;

     MapCurrentLocationButton(){
          alert('Map Current Location');
     }

     OpenPopUpButton(){
          this.visiblePopUp = true;
     }
     
     OnChangeNam(event){
          this.Nam = event.target.value;
     }          
     OnChangeStr(event){
          this.Str = event.target.value;
     }
     OnChangePstlKod(event){
          this.PstlKod = event.target.value;
     }
     OnChangeCt(event){
          this.Ct = event.target.value;
     }

     SelectSavedAddressButton(){
          if(this.Nam !='' && this.Str !='' && this.Ct !=''){
               const tost = new ShowToastEvent({
                    title: 'Please Fill Required Fields',
                    variant: 'Error',
               });
               this.dispatchEvent(tost); 
          }
     }

     SaveShowOnMapButton(){
          if(this.Nam !='' && this.Str !='' && this.Ct !=''){
               const tost = new ShowToastEvent({
                    title: 'Please Fill Required Fields',
                    variant: 'Error',
               });
               this.dispatchEvent(tost); 
          }     }

     ShowOnMapButton(){
          console.log(!this.Nam && !this.Str && !this.Ct);
          if(this.Nam !='' && this.Str !='' && this.Ct !=''){
               const tost = new ShowToastEvent({
                    title: 'Please Fill Required Fields',
                    variant: 'Error',
               });
               this.dispatchEvent(tost); 
          }     }
     closeModal() {
          this.visiblePopUp = false;
     }
       

}