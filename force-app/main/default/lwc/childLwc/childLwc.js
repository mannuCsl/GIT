import { LightningElement, api, track } from "lwc";

export default class ChildLwc extends LightningElement {
  @api progressValue;
  @api postal66;
  handleChnage(event) {        
     this.progressValue = event.target.value;   
    
    // Creates the event with the data.
    const selectedEvent = new CustomEvent("progressvaluechange", {
      detail: this.progressValue
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }
  @api handleValueChange(pstl){
     this.dispatchEvent( new CustomEvent("progressvaluechange", {
          detail: pstl}));
    
             
  }
}