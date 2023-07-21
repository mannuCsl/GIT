import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import cowinDataSorting from '@salesforce/apex/CowinHomeController.cowinDataSorting';
import saveCowinRecord from '@salesforce/apex/CowinHomeController.saveCowinRecord';
// const columns = [
//     { label: 'Center Id', fieldName: 'center_id' },
//     { label: 'Name', fieldName: 'name' },
//     { label: 'Block Name', fieldName: 'block_name' },
//     { label: 'Vaccine', fieldName: 'vaccine' },
//     { label: 'Available Capacity', fieldName: 'available_capacity' },
//     { label: 'Fee Type', fieldName: 'fee_type'},
// ];

export default class CowinHome extends LightningElement {
  @track data = [];
  @track dat = [];
  //@track columns = columns;
  @track pincodevalue;
  @track date;
  @track recordId;
  @track int;
  tableShow = false;
  visibleContacts;   
  //labelsavebutton = 'Save';


  updateContactHandlerpage(event){
    this.visibleContacts=[...event.detail.records]
    console.log(event.detail.records);
  }

  SearchClickbutton(){
    this.tableShow = false;
    this.data='';
    if( this.pincodevalue && this.date){
      cowinDataSorting({pincode: this.pincodevalue , covidDate: this.date})
      .then(result =>{ 
        console.log('apex results--'+result);//yeEkSathSbDegaEkHiBarMe
        console.log(result);// yeArrayDegaThenClickPeObjectDegaFirClickPefields
        console.log('buttonDisable------',result[0].buttonDisable);
        this.dat=result;
        if(this.dat.length == 0 || this.dat ==''){
          const evt = new ShowToastEvent({
          title: 'Data Not Found',
          message: 'On This Pin Code '+this.pincodevalue+' and Date '+this.date,
          variant: 'Error',
          });
          this.dispatchEvent(evt);
        }
        else{
          console.log('lenth'+this.dat.length);
          const evt = new ShowToastEvent({
            title: this.dat.length+' Data Found',
            //message: 'On This Pin Code '+this.pincodevalue+' and Date '+this.date,
            variant: 'success',
            });
            this.dispatchEvent(evt);
          this.data=result;
          this.tableShow = true;
          console.log("data from apex"+JSON.stringify(this.data));
        }
      })
      .catch(error =>{
        this.error = error;
        console.log("error from apex"+this.error);
        const evets = new ShowToastEvent({
          title: 'Data Not Found',
          message: 'Please Fill Valid PinCode & Date ',
          variant: 'Error',              
      });
      this.dispatchEvent(evets);
      })
    }
    else{
      const evet = new ShowToastEvent({
          title: 'For Covid Data',
          message: 'Enter Pin Code and Date',
          variant: 'Error',
        });
        this.dispatchEvent(evet);
    }
  }
  saveOnclick(event){    
    this.recordId= event.target.value;
    console.log('recordId '+this.recordId);
    saveCowinRecord({pincode: this.pincodevalue , covidDate: this.date, recordId: this.recordId })
    .then(result =>{
      this.int=result;
      console.log('apex record save check--'+this.int);      
      if(this.int === 0){          
        const evt = new ShowToastEvent({
          title: 'This Record is Already Saved',
          variant: 'Error',
        });
        this.dispatchEvent(evt);
      }
      else if(this.int === 1){
        this.labelsavebutton = 'Saved' ;
        const evt = new ShowToastEvent({
          title:' This Record is Saved ',
          variant: 'success',
        });
        this.dispatchEvent(evt);      
      }
    })
    .catch(error =>{
      this.error = error;
      console.log("error from apex"+this.error);
    })
  }

  onchangePincode(event){
      this.pincodevalue=event.target.value;
      console.log(this.pincodevalue);
  }
  onchangeDate(event){
      this.date=event.target.value;
      console.log(this.date);
  }  
  clearClickbutton(){    
    this.pincodevalue='';
    this.date='';
    this.tableShow = false;
    this.data='';
    //this.template.querySelector('lightning-input').value=null;    
    const inputFields = this.template.querySelectorAll('lightning-input');
    if (inputFields) {
        inputFields.forEach(field => {
            field.value=null;
        });
    }    
  } 


  
}