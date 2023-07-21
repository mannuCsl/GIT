import { LightningElement, api, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import  locationByLatLng  from '@salesforce/apex/LwcCurrentLocationlatlng.locationByLatLng';
import  LatLngByAddress  from '@salesforce/apex/LwcCurrentLocationlatlng.LatLngByAddress';
import saveAdrsInMpCntnrObj from '@salesforce/apex/LwcCurrentLocationlatlng.saveAdrsInMpCntnrObj';
import getSavedAdrsFromMpCntnrObj from '@salesforce/apex/LwcCurrentLocationlatlng.getSavedAdrsFromMpCntnrObj';
import { deleteRecord } from 'lightning/uiRecordApi';
import { label  } from 'c/tm24Labels';
import {loadStyle} from 'lightning/platformResourceLoader';
import setTextAlignment from '@salesforce/resourceUrl/setTextAlignment';

const COLUMNS = [ 
     {label: 'Name', fieldName: 'Name', sortable: "true", type: "button", typeAttributes: { 
          label: { fieldName: 'Name' },
          name: 'Name',  
          variant: 'base',
          value: 'Id',     
          class: 'setTextAlignment' 
     }},
     { label: 'Street', fieldName: 'Street__c', sortable: "true" },      
     { label: 'City', fieldName: 'City__c', sortable: "true" },
     { label: 'Postal Code', fieldName: 'Postal_Code__c', sortable: "true" },     
     { type: "button-icon", initialWidth: 70 ,typeAttributes: {  
          name: 'Delete', 
          iconName:"action:delete",
          title: 'Delete',
          variant: 'bare',
          disabled: false,  
          value: 'delete',          
          iconClass: 'slds-icon_small slds-text-color_error',
     },}  
];  

export default class MapContainerChild extends LightningElement {

     @track label = label;
     @api Address=[]; 
     @track AdrsObj={};
     @track isLoadingMap = false;
     columns = COLUMNS;  
     getSavedAdrs = [];
     visiblePopUp = false;
     showButtons = true;
     randomPositionButtons = false;
     enterAddressButtons = false; 
     savedAdrsVisiblePopUp = false;     
     Nam;
     Str;
     PstlKod;
     Ct;
     @track messageFromVF=[];
     @track tempr = [];
     @track dragStart;
     @track sortBy;
     @track sortDirection;
     isCssLoaded = false;
     manuallyAddressHeadingShow;    
     showFilter=false;   // Add Filter===c/addFilter

     
     renderedCallback(){ 
          if(this.isCssLoaded){
              return
          }

          this.isCssLoaded = true
   
          loadStyle(this, setTextAlignment).then(()=>{
              console.log("Loaded Successfully")
          }).catch(error=>{ 
              console.log(error)
          });
     }


     
     manualRefreshHandler(event){
          console.log('Refresh');
          // setTimeout(() => {
          //      console.log('eval',eval);
          //      eval("$A.get('e.force:refreshView').fire();");
          // }, 1000);       
          //location.reload();//URL of the page we want to reload   
          this.Address=[];
          this.Address.push({street:'', city: '', postal: '', lat: '', lng: ''}); 
          this.dispatchEvent( new CustomEvent("progressvaluechange", {detail: this.Address})); 
          this.Address=[];       
          this.showButtons = true; 
          this.showFilter = false;        
     }

     MapCurrentLocationButton(event){ 
          if (navigator.geolocation) {
               this.closeModal();
               navigator.geolocation.getCurrentPosition(position => { 
                    locationByLatLng({lat: position.coords.latitude, longi: position.coords.longitude}) //call locationByLatLng method in apex
                    .then(result =>{   
                         console.table(result);
                         var numericPostalCode;
                         result.forEach(item =>{
                              if (!isNaN(parseInt(item.long_name)) && Number.isInteger(parseInt(item.long_name))) {
                                   numericPostalCode = item.long_name;
                                   console.log("item.long_name contains a numeric value that can be converted to an integer.",numericPostalCode);
                              }
                         })
                         this.Address.unshift({street: result[1].long_name, city: result[2].long_name, postal: numericPostalCode, lat: position.coords.latitude, lng: position.coords.longitude});
                         this.Address = this.removeDuplicates(this.Address); 
                         console.table(this.Address);
                         this.dispatchEvent( new CustomEvent("progressvaluechange", {detail: this.Address}));                         
                         this.showButtons = false;
                    })
                    .catch(error =>{
                         console.log('error from apex address by lat & lng => ',error);
                    })                              
               });  
               this.showFilter=true;            
          } 
     }

     removeDuplicates(array) {
          const resuArray = [];
          for (let i = 0; i < array.length; i++) {
               let exists = false;
               for (let j = 0; j < resuArray.length; j++) {                   
                    if (array[i].street === resuArray[j].street && array[i].lat === resuArray[j].lat) {
                         exists = true;
                         break;
                    }               
               }
               if (!exists) {
               resuArray.push(array[i]);
               }
          }
          return resuArray;
     }



     doSorting(event) {
          this.sortBy = event.detail.fieldName;
          console.log('this.sortBy --> ',this.sortBy);
          this.sortDirection = event.detail.sortDirection;
          console.log('this.sortDirection --> ',this.sortDirection);
          this.sortData(this.sortBy, this.sortDirection);
      }
  
      sortData(fieldname, direction) {
          console.log('fieldname --> ',fieldname);
          console.log('direction --> ',direction);
          let parseData = JSON.parse(JSON.stringify(this.getSavedAdrs));
          console.log('parseData --> ',parseData);
          // Return the value stored in the field
          let keyValue = (a) => {
               console.log('a --> ',a); // Object
               console.log('a[fieldname] --> ',a[fieldname]); //ObjectkifieldNamevalue
               console.log('a[fieldname].toLocaleLowerCase() --> ',a[fieldname].toLocaleLowerCase());
              return a[fieldname].toLocaleLowerCase();
          };
          // cheking reverse direction
          //data.sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1);

          let isReverse = direction === 'asc' ? 1: -1;
          console.log('isReverse --> ',isReverse);
          // sorting data
          parseData.sort((x, y) => {
               console.log('parseData.sort x --> ',x);  //firstObject
               console.log('parseData.sort y --> ',y);  //secondObject

              x = keyValue(x) ? keyValue(x) : ''; // handling null values
              //console.log('x = keyValue(x) ? keyValue(x) :  --> ',keyValue(x) ? keyValue(x) : '');  //secondObject
              console.log('x --> ',x);
              y = keyValue(y) ? keyValue(y) : '';
              //console.log('keyValue(y) ? keyValue(y) :  --> ',keyValue(y) ? keyValue(y) : '');  //secondObject
              console.log('y --> ',y);
              // sorting values based on direction
              return isReverse * ((x > y) - (y > x));
          });
          this.getSavedAdrs = parseData;
      }

   
     OpenRandomPopUpButton(){
          this.visiblePopUp = true;
          this.enterAddressButtons = false;
          this.randomPositionButtons = true;
     }

     OpenPopUpButton(){
          this.visiblePopUp = true;
          this.randomPositionButtons = false;
          this.enterAddressButtons = true;
     }    

     SelectSavedAddressButton(){       
          this.visiblePopUp = false;
          this.savedAdrsVisiblePopUp = true;
          getSavedAdrsFromMpCntnrObj()
          .then(result =>{
               this.getSavedAdrs = result;   
               console.log('result from apex method getSavedAdrsFromMpCntnrObj => ',this.getSavedAdrs);
          })
          .catch(error =>{
               console.log('error from apex method getSavedAdrsFromMpCntnrObj',error);
          })   
   
     }

     getRecordDetail(recId){
          this.getSavedAdrs.forEach( abc => {
               if(abc.Id === recId){         //event.target.title
                    this.Nam = abc.Name;
                    this.Str = abc.Street__c;
                    this.PstlKod = abc.Postal_Code__c;
                    this.Ct = abc.City__c;  
                     //disable save & show map button
                    this.closeModalSavedAdrsVisiblePopUp();                  
               }
          })
     }

     deleteThisAddrs(event){      
          const actionName = event.detail.action.name;  
          if ( actionName === 'Delete' ) {
               deleteRecord(event.detail.row.Id)
               .then(() => {
                    this.tostfunction(this.label.DeleteMessage, '', 'Success');    //showtost 
                    this.SelectSavedAddressButton();             
               })
               .catch(error => {
                    console.log('error from apex method getSavedAdrsFromMpCntnrObj',error);
               });
          }
          else if( actionName === 'Name' ){
               this.getRecordDetail(event.detail.row.Id);
          }

     //    deletethisRecord({recId: event.target.value})
     //      .then(result =>{
     //           this.tostfunction(result, '', 'Success');    //showtost 
     //           this.SelectSavedAddressButton();
     //      })
     //      .catch(error =>{
     //           console.log('error from apex method getSavedAdrsFromMpCntnrObj',error);
     //      })
     }
     
     runSpinnerfunction() {
          this.closeModal();
          this.isLoadingMap = true; 
          setTimeout(() => {
               this.isLoadingMap = false;
          }, 3000); 
     }

     closeModalSavedAdrsVisiblePopUp(){
          this.visiblePopUp = true;
          this.savedAdrsVisiblePopUp = false;
     }


     SaveShowOnMapButton(){
          if(this.isInputValid()) { 
               var goToHel;              
               if (this.AdrsObj.postal.trim() === ""){
                    goToHel = null;
               }
               else{
                    goToHel = this.AdrsObj.postal;
               }
               this.AdrsObj.postal = goToHel;               
               //console.log( 'this.AdrsObj = > ',this.AdrsObj.Name, this.AdrsObj.street, this.AdrsObj.city, this.AdrsObj.postal);
               saveAdrsInMpCntnrObj({name:this.Nam, street:this.Str, city:this.Ct,  postalCode:this.AdrsObj.postal})
               .then(result =>{
                    //console.log('result from apex method saveAdrsInMpCntnrObj ',result);
                    if(result === 'Record is Saved'){
                    this.tostfunction(this.label.Save_address, '', 'Success' );  //showtost                        
                    }
                    else{                         
                         this.tostfunction(this.label.Already_saved, '', 'Error' );  //showtost
                    }
                    this.ShowOnMapButton();                 
               })
               .catch(error =>{
                    console.log('error from apex method saveAdrsInMpCntnrObj',error);
               }) 
          }
     }    

     ShowOnMapButton(event){         
          if(this.isInputValid()) {
               this.closeModal();
               delete this.AdrsObj.Name; //delete Name field 
               LatLngByAddress({StreetVal:this.AdrsObj.street, CityVal:this.AdrsObj.city, PostalCodeVal:this.AdrsObj.postal})   //CALL APEX FOR LATITDE AND LONGITUDE BY ADDRESS 
               .then(result =>{ 
                    console.log('result ==> ',JSON.parse(JSON.stringify(result)));
                    this.Address.unshift({street: this.AdrsObj.street, city: this.AdrsObj.city, country: '', postal: this.AdrsObj.postal, lat: result[0].geometry.location.lat, lng: result[0].geometry.location.lng});
                    this.Address = this.removeDuplicates(this.Address);
                    this.dispatchEvent( new CustomEvent("progressvaluechange", {detail: this.Address}));   
                    this.showButtons = false;
               })
               .catch(error =>{
                    console.log('error from apex lat & lng by address ==> ',error);
                    this.tostfunction('invalid', ' address', 'Error' );  //showtost
               })                
          }
     }
    
     //THIS FUNCTIN FOR INPUT FIELD VALIDATIONS
     isInputValid() {
          let isValid = true;
          let inputFields = this.template.querySelectorAll('.validate');
          inputFields.forEach(inputField => {
               console.log('inputField ++> ',inputField);
               console.log('inputField.checkValidity() ++> ',inputField.checkValidity());
               console.log('inputField.reportValidity() ++> ',inputField.reportValidity());
              if(!inputField.checkValidity()) {
                  inputField.reportValidity();  
                  isValid = false;
               }
              console.log('inputField.name ++> ',inputField.name); 
             console.log('inputField.value ++> ',inputField.value);             
            
              if(inputField.name === 'postal' && inputField.value == ' '){//becauseTypeOfPostalCodeIsNumberSoitsNotContainsBlank(throwError)itsContainsNull
               this.AdrsObj[inputField.name] = null;
              }
              else{
               this.AdrsObj[inputField.name] = inputField.value;
              }
              
          });
          return isValid;
     }

     closeModal() {
          this.visiblePopUp = false;
          this.Nam = '';
          this.Str = '';
          this.PstlKod = null;
          this.Ct = '';
     }

     tostfunction(ttlValue, ttltxt, vrntValue){
          const tost = new ShowToastEvent({
               title: ttlValue+ttltxt,
               variant: vrntValue,
          });
          this.dispatchEvent(tost);
     }

     OnChangeName(event){
          this.Nam = event.target.value;    // console.log('Nam  ',this.Nam);
     }

      OnChangeStreet(event){
          this.Str = event.target.value;     // console.log('Street  ',this.Str);
     }

     OnChangeCity(event){
          this.Ct = event.target.value;       // console.log('Ct  ',this.Ct);
     } 

     OnChangePostalCode(event){
          this.PstlKod = event.target.value;     // console.log('PstlKod  ',this.PstlKod);          
     }
       

   
}




































 // @track streetvalue;
     // @track cityvalue;
     // @track countryvalue;
     // @track postalvalue;

     // OnChangeStreet(event){
     //      this.streetvalue = event.target.value;       //console.log('Street  ',this.streetvalue);
     // }
     // OnChangeCity(event){
     //      this.cityvalue = event.target.value;        //console.log('cityvalue  ',this.cityvalue);
     // }
     // OnChangeCountry(event){
     //      this.countryvalue = event.target.value;     //console.log('countryvalue  ',this.countryvalue);
     // }
     // OnChangePostalCode(event){
     //      this.postalvalue = event.target.value;      //console.log('postalvalue  ',this.postalvalue)          
     // }

       // OnClickSearch(event){    
     //      this.Address = [     
     //           { street: this.streetvalue, city: this.cityvalue, country: this.countryvalue, postal: this.postalvalue, lat:0 , lng: 0},
     //           { street: 'Meerut Railway Station', city: 'Meerut', country: 'India', postal: '250002', lat: 28.978875078302796, lng: 77.6756264493438 },
     //           { street: 'Vaishno Dham Colony', city: 'Meerut', country: 'India', postal: '250001', lat: 29.02653847795684, lng: 77.6639314920318 },
     //           { street: 'Meerut', city: 'Meerut', country: 'India', postal: '250001', lat: 28.984429201414642, lng: 77.70625620273202 },
     //           { street: 'Bhole ki Jhaal', city: 'Meerut', country: 'India', postal: '201301', lat: 29.008216235400123, lng:  77.56949810618984},
     //           { street: 'Taj Mahal', city: 'Aagra', country: 'India', postal: '282001', lat: 27.17497293592565, lng: 78.04214182444113},//aagra , 
     //           { street: 'Prem Mandir', city: 'Vrindavan', country: 'India', postal: '281121', lat: 27.573183598753623, lng: 77.67173038404496 },//mathura, 
     //           { street: 'Hawa Mahal', city: 'Jaipur', country: 'India', postal: '302002', lat: 26.924261523954105, lng: 75.82674379785045 }, //jaipur hawa mahal
     //           { street: 'Gawlior Fort', city: 'Gawlior', country: 'India', postal: '470008', lat: 26.231336782224336, lng: 78.1694950923667 }, //gawlior fort 
     //           { street: 'Kanpur Central', city: 'Kanpur', country: 'India', postal: '208004', lat: 26.45434266337381, lng: 80.35129507676781 }, //kanpur 
     //           { street: 'Shri Kashi Vishwanath Temple', city: 'Varanasi', country: 'India', postal: '221001', lat: 25.31086318582137, lng: 83.01067628666854 }, //varansi kasi temple
     //           { street: 'Bareli Jn.', city: 'Bareli', country: 'India', postal: '243001', lat: 28.336954462585407, lng: 79.41087669086528 }, //Bareli, 
     //           { street: 'Bara Imambara', city: 'Lucknow', country: 'India', postal: '226003', lat: 26.86962095097507, lng: 80.91262011487375 }, //lucknow   
     //           { street: 'India Gate', city: 'Delhi', country: 'India', postal: '110001', lat: 28.61467196011712, lng: 77.22918775078787 }, //india gate
     //           { street: 'Etawah Safari Park', city: 'Etawah', country: 'India', postal: '206001', lat: 26.768940303333594, lng: 79.00109977939681 }, //Etawah 
     //           { street: 'Taragarh Fort', city: 'Ajmer', country: 'India', postal: '305001', lat: 26.448511999394835, lng: 74.61928537969031 }, //Ajmer
     //           { street: 'Samaypur Badli', city: 'Badli', country: 'India', postal: '110042', lat: 28.744700821620505, lng: 77.13832311882906 }, //Samaypur Badli,,  
     //           { street: 'Chandi Ghat', city: 'Haridwar', country: 'India', postal: '249408', lat: 29.94464324293449, lng: 78.1708761319496 }, //Haridwar  
     //           { street: 'Akshardham', city: 'New Delhi', country: 'India', postal: '110092', lat: 28.612684910888905, lng: 77.27725943444803 }, //Akshardham
     //           { street: 'Golghar', city: 'Patna', country: 'India', postal: '800001', lat: 25.62034713367559, lng: 85.13944528852939 }, // Golghar 
     //           { street: 'Gandhi Maidan', city: 'Patna', country: 'India', postal: '800001', lat: 25.617400584563185, lng: 85.14502292978655 },// Gandhi Maidan
     //           { street: 'Rashtrapati Bhawan', city: 'New Delhi', country: 'India', postal: '110004', lat: 28.614410848158144, lng: 77.1994366052617 },//Rashtrapati Bhawan
     //       ]



//***********************************************create marker in loop******************************************************************
          // let Latitu = 25.75923572918471;
          // let Longit = 12.519951950248034; //70.37276470255895;
          // var a;
          // var AdressSize = 5000;

          // for(a=1; a< AdressSize; a++){              
          //      this.Address[a] =  { street: 'Test '+a, city: 'City Name'+a, country: 'Country Name'+a, postal: '0'+a, lat: Latitu, lng: Longit }; 
          //      if(a < AdressSize/2){ //94.97137120255731                             
          //      Longit = Longit + 0.0099;
          //      }
          //      else if(a==AdressSize/2){
          //           Latitu = 8.091144609492403;
          //           Longit = 77.53603608512493;
          //      }
          //      else if(Latitu < 72){
          //           Latitu = Latitu + 0.009;
          //      }
          //      else{
          //           break;
          //      }                         
          // }
          // console.log('a Longit-',a+' ',Longit);
     //***************************************************************************************************************************************


//*************************************************call vfPage********************************************************************************/

     //      var vfWindow = this.template.querySelector("iframe").contentWindow.postMessage(this.Address, this.Origin);
     //      // console.log('Array Size -',this.Address.length);
     //      // console.log('Clicked search btn -',this.Address);
     //      //eval("$A.get('e.force:refreshView').fire();"); //componentRefreshkrtahai
     //      event.preventDefault();// Refreshhoneserokrahahai
     //      // Toast for marker
     //      const tost = new ShowToastEvent({
     //           title: this.Address.length+' Marker Found',
     //           variant: 'success',
     //      });
     //      this.dispatchEvent(tost);        
//**************************************************************************************************************************************
     // }

       // OnClickClear(event){
     //      this.streetvalue='';
     //      this.cityvalue='';
     //      this.countryvalue='';
     //      this.postalvalue='';
     //      this.Address='';                   
     //      var vfWindow = this.template.querySelector("iframe").contentWindow.postMessage(this.Address, this.Origin); 
     //      this.template.querySelector('form').reset();
     //      event.preventDefault();// Refreshhoneserokrahahai
     // }