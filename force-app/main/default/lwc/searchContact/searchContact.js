import { LightningElement, track, api } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import conSearch from '@salesforce/apex/SearchContact.conSearch';
import followbuttonfunc from '@salesforce/apex/SearchContact.followbutton';
import unfollowbuttonsApexMethod from '@salesforce/apex/SearchContact.unfollowbuttonsApexMethod';
import searchContact from './searchContact.html';
import searchCont2 from './searchCont2.html';  
export default class SearchContact  extends LightningElement {

  @track namevalue;
  @track emailvalue;
  @track phonevalue;
  @track streetvalue;
  @track cityvalue;
  @track countryvalue;
  @track provincevalue;
  @track postalvalue; 
  @api displaysearchCont2 = false;
  @track dt=[]; 
  @track labelNamefollowing=' Following';
  @track labelNamefollow='+ Follow'; 
  @track recodId;
  @track subjectText;
  @track subjectmessage;
  totalContacts
  visibleContacts
  
  messageClick = false;
  contactShow = true;


  
  messageClickbutton(event){
    this.contactShow = false;
    this.messageClick=true;
  }
  messageClear(event){
    this.messageClick=false;
    this.contactShow = true;
  }
  subjectChange(event){
    this.subjectText = event.target.value;
    console.log(this.subjectText);
  }
  messageChange(event){
    this.subjectmessage = event.target.value;
    console.log(this.subjectmessage);
  }
  

  updateContactHandler(event){
    this.visibleContacts=[...event.detail.records]
    console.log(event.detail.records);
}

  unfollowClick(event){
    console.log('clickbutton id '+JSON.stringify(event.target.value));
    this.recodId = event.target.value;    
    unfollowbuttonsApexMethod({conid: this.recodId})
    .then(result =>{
      this.runCode();
      console.log('NEW '+event.detail.records);

    })
    .catch(error =>{
      this.error = error;
      aleart("Contact Record Not Founnd");
      console.log("error from apex"+this.error);
    })
   
   /*setTimeout(function() {
    this.runCode();
  }, 2000);*/
  }

  followClick(event){
    
    console.log('clickbutton id '+JSON.stringify(event.target.value));
    this.recodId=event.target.value;
    
    followbuttonfunc({conid: this.recodId})
    .then(result =>{
      this.runCode();
    })
    .catch(error =>{  
      this.error = error;
      aleart("Contact Record Not Founnd");
      console.log("error from apex"+this.error);
    })
   
   
   /*setTimeout(function() {
    this.runCode();
   }, 2000);*/       
  }  

  runCode() {
    conSearch({name: this.namevalue, email:this.emailvalue, phone:this.phonevalue, street:this.streetvalue, city:this.cityvalue, country:this.countryvalue, province:this.provincevalue, postal:this.postalvalue})
      .then(result =>{
        this.dt=result;
        console.log("data from apex"+JSON.stringify(this.dt));
      })
      .catch(error =>{
        this.error = error;
        console.log("error from apex"+this.error);
      })
  }
 
  render(){
    return this.displaysearchCont2 ? searchCont2 : searchContact;
  }

  nameChange(event){
    this.namevalue = event.target.value;// isSeInputDataMiltaHai
  console.log(this.namevalue);

  }
  emailChange(event){
    this.emailvalue = event.target.value;
  console.log(this.emailvalue);
  }
  phoneChange(event){
    this.phonevalue = event.target.value;
    console.log(this.phonevalue);
  } 
  addressChange(event){
    this.streetvalue = event.target.street;
    this.cityvalue = event.target.city;
    this.countryvalue = event.target.country;
    this.provincevalue = event.target.province;
    this.postalvalue = event.target.postalCode;
  }
   
  fun1(){
    if(this.namevalue || this.emailvalue || this.phonevalue || this.streetvalue || this.cityvalue || this.countryvalue || this.provincevalue || this.postalvalue){
      conSearch({name: this.namevalue, email:this.emailvalue, phone:this.phonevalue, street:this.streetvalue, city:this.cityvalue, country:this.countryvalue, province:this.provincevalue, postal:this.postalvalue})
      .then(result =>{
        this.dt=result;
        console.log("data from apex"+JSON.stringify(this.dt));
        if(this.dt.length === 0){
          const evt = new ShowToastEvent({
            title: 'No Records Found',
            message: 'No Contact Record Found',
            variant: 'Error',
          });
          this.dispatchEvent(evt);
        }
        else{
        this.displaysearchCont2 = !this.displaysearchCont2;
        }              
      })
      .catch(error =>{
        this.error = error;
        aleart("Contact Record Not Founnd");
        console.log("error from apex"+this.error);
      })
    }
    else{  
      this.showNotification();      
    }
  }
  showNotification(){
    const evt = new ShowToastEvent({      
      title: 'Search Contact',
      message: 'Fill Minimum One Field',
      variant: 'error',
    });
    this.dispatchEvent(evt);
  } 
  searchClear(){
    this.template.querySelector('form').reset();
    this.namevalue='';
    this.emailvalue='';
    this.phonevalue='';
    this.streetvalue='';
    this.cityvalue='';
    this.countryvalue='';
    this.provincevalue='';
    this.postalvalue='';
    this.template.querySelector('form').reset();
  }
  GotoSearchPage(){
    console.log("Full-data-"+this.dt);
    this.dt='';
    console.log("Empty-data-"+this.dt); 
    this.displaysearchCont2 = !this.displaysearchCont2; 
    this.namevalue='';
    this.emailvalue='';
    this.phonevalue='';
    this.streetvalue='';
    this.cityvalue='';
    this.countryvalue='';
    this.provincevalue='';
    this.postalvalue='';
  } 
}