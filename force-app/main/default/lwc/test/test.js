import { LightningElement, track, api, wire} from 'lwc';
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';  
 import { deleteRecord } from 'lightning/uiRecordApi';
 import { NavigationMixin } from 'lightning/navigation';
  
// const COLUMNS = [  
       
//     { label: 'Id', fieldName: 'Id'},      
//     { label: 'Name', fieldName: 'Name', cellAttributes:{ label: { fieldName: 'Name', onClick: 'handleDownloadClick' }}},  
//     { label: 'Industry', fieldName: 'Industry' },  
//     { type: "button", typeAttributes: {  
//         label: 'View',  
//         name: 'View',  
//         title: 'View',  
//         disabled: false,  
//         value: 'view',  
//         iconPosition: 'left'  
//     } },  
//     { type: "button", typeAttributes: {  
//         label: 'Delete',  
//         name: 'Delete',  
//         variant: 'destructive',
//         title: 'Delete',  
//         disabled: false,  
//         value: 'delete',  
//         iconPosition: 'left'  
//     } },
//     // {
//     //     type: 'action',
//     //     typeAttributes: {
//     //       rowActions: [
//     //         { label: 'Edit', name: 'edit', iconName: 'utility:edit', iconClass: 'slds-icon-text-default' },
//     //         { label: 'Delete', name: 'delete', iconName: 'utility:delete', iconClass: 'slds-icon-text-error' },
//     //       ],
//     //       menuAlignment: 'right',
//     //     },
//     //   }, 
// ];  

// export default class accountSearchLWC extends NavigationMixin(LightningElement) { 
  
//     accounts;  
//     error;  
//     columns = COLUMNS; 
//     handleDownloadClick(){
//         alert("click hello");
//     } 
  
//     handleKeyChange( event ) {  
          
//         const searchKey = event.target.value;  
  
//         if ( searchKey ) {  
//             fetchAccounts( { searchKey } )    
//             .then(result => {   
//                this.accounts = result;  
//             })  
//             .catch(error => {   
//                this.error = error; 
  
//             });  
  
//         } else  
//         this.accounts = undefined;  
  
//     }      
      
//     callRowAction( event ) {            
//         const recId =  event.detail.row.Id;  
//         const actionName = event.detail.action.name;  
//         console.log('actionName  -',actionName);

//         if ( actionName === 'Delete' ) { 

//           console.log('recId  -',recId);
//           deleteRecord(recId)
//             .then(() => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'Record deleted',
//                         variant: 'success'
//                     })
//                 );              
//             })
//             .catch(error => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Error deleting record',
//                         message: error.body.message,
//                         variant: 'error'
//                     })
//                 );
//             });


  
//         } else if ( actionName === 'View') {  
  
//             this[NavigationMixin.Navigate]({  
//                 type: 'standard__recordPage',  
//                 attributes: {  
//                     recordId: recId,  
//                     objectApiName: 'Account',  
//                     actionName: 'view'  
//                 }  
//             })  
  
//         }          
  
//     }  
  
// }  


















// 2222222222222222222222222222222222
import setTextAlignment from '@salesforce/resourceUrl/setTextAlignment';
import getAccount from '@salesforce/apex/AccountInLwc.getAccount';
import {loadStyle} from 'lightning/platformResourceLoader';

const columns = [
         { label: 'Name', fieldName: 'Name' ,type: "button", typeAttributes: { 
          label: { fieldName: 'Name' },
          name: 'View',  
          variant: 'base',
          value: 'Id',
          class: 'setTextAlignment' 
          }
        },
         { label: 'Website', fieldName: 'Website'},
         { label: 'Rating', fieldName: 'Rating'},
         { label: 'Created Date', fieldName: 'CreatedDate'},
         { label: 'Address', fieldName: 'BillingStreet'},
         { type: "button-icon", initialWidth: 70 ,typeAttributes: {  
          name: 'Delete', 
          iconName:"action:delete",
          title: 'Delete',
          variant: 'bare',
          disabled: false,  
          value: 'delete',          
          iconClass: 'slds-icon_small slds-text-color_error',
        }}
     ];
export default class Test extends LightningElement {

     @track allAccount;
     //@track columns = columns;
     @track accountData;
     showTable = false;
     isCssLoaded = false;


   
     renderedCallback(){ 
      if(this.isCssLoaded){
          return;
      }
      this.isCssLoaded = true;
      loadStyle(this, setTextAlignment).then(()=>{
          console.log("Loaded Successfully");
      }).catch(error=>{ 
          console.log(error)
      });
    }

    error;
    @wire(getAccount)
    wiredAccount({ data, error }) {
        if (data) {
            this.allAccount = data;
            this.showTable = true;
            console.log('in prnt call child -',this.allAccount);
            setTimeout(() => {
              this.template.querySelector("c-drag-a-n-ddrop").handleGetData(this.allAccount);
            },1000);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.allAccount = undefined;
            const event = new ShowToastEvent({
              title: 'Error',
              message: 'Data Not Found',
              variant: 'Error',
          });
          this.dispatchEvent(event);
        }
    }
    handleClick(){
      return refreshApex(this.wiredAccount);    
    }
// }        getAccount()
//         .then(result => { 
//           this.allAccount = result;
//           this.showTable = true;
//           console.log('in prnt call child -',this.allAccount);
//           setTimeout(() => {
//             this.template.querySelector("c-drag-a-n-ddrop").handleGetData(this.allAccount);
//           },1000);
//         })
//         .catch(error =>{
//           const event = new ShowToastEvent({
//               title: 'Error',
//               message: 'Data Not Found',
//               variant: 'Error',
//           });
//           this.dispatchEvent(event);
//         });                    
//       }

      handleClose(){
        this.showTable = false; 
        this.allAccount = [];
      }

     onRowActionHandler(event){
        const actionName = event.detail.action.name;  
        var Ids = event.detail.row.Id;
        //console.log('Ids-> ',Ids,', actionName-> ',actionName);
        if ( actionName === 'Delete') {
          deleteRecord(Ids)
          .then(() => {
            this.tostfunction('Record is', ' Deleted', 'Success');    //showtost   
            this.handleClick();          
          })
          .catch(error => {
            console.log('error from apex ',error);
            this.tostfunction('Can not ', ' deleted record at this time.', 'Error');    //showtost 
          });
        }else if ( actionName === 'View') {   
          console.log('Ids-> ',Ids,', actionName-> ',actionName);
          this[NavigationMixin.Navigate]({            
            type: 'standard__recordPage',  
            attributes: {  
              recordId: Ids,  
              objectApiName: 'Account',  
              actionName: 'view'  
            },  
          })                    
        }
      }

     updateContactHandlerpage(event){
        this.accountData = [...event.detail.records]
     }


     tostfunction(ttlValue, ttltxt, vrntValue){
      const tost = new ShowToastEvent({
           title: ttlValue+ttltxt,
           variant: vrntValue,
      });
      this.dispatchEvent(tost);
 }
        
}


 










//555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555//
// @track buttonVariants = {
//   Beginner: 'neutral',
//   Advanced: 'neutral',
//   Expert: 'neutral',
//   Reset: 'neutral'
// };

// //isDisabledSkillRange = false; // Set the disabled state as needed

// skillRangeHandler(event) {
//   const selectedLabel = event.target.dataset.label;

//   console.log('selectedLabel: ',selectedLabel)

//   if (selectedLabel === 'Reset') {
//       this.buttonVariants = {
//           Beginner: 'neutral',
//           Advanced: 'neutral',
//           Expert: 'neutral',
//           Reset: 'neutral'
//       };
//   } else {
//       this.buttonVariants = {
//           Beginner: selectedLabel === 'Beginner' ? 'brand' : 'neutral',
//           Advanced: selectedLabel === 'Advanced' ? 'brand' : 'neutral',
//           Expert: selectedLabel === 'Expert' ? 'brand' : 'neutral',
//           Reset: 'neutral'
//       };
//   }
// }
//555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555//









// visible = false;
     // newObjectList=[];
     // @track selected;
     // newObjectListTemperorarily=[
     //      { label: 'Account', value: 'Account'},
     //      { label: 'Contact', value: 'Contact'},
     //      { label: 'Lead', value: 'Lead'},
     // ];
     // get optionToSelectObject() {
     //       this.newObjectList = this.newObjectListTemperorarily;          
     //      return this.newObjectList;
     // }
     // handleObjectChange(event){
     //      this.selected = event.target.value
     //      console.log('selected-- ', event.target.value);
     //      this.visible = true;
     //      this.newObjectListTemperorarily=this.newObjectListTemperorarily.filter((item) => item.value !== this.selected);
     //      console.log('newObjectListTemperorarily-- ', this.newObjectListTemperorarily);
     // }
     // closeModal(event){
     //      console.log('close val-- ', event.target.value);
     //      var tempArr =[];
     //      tempArr.push(this.newObjectListTemperorarily[0]);
     //      tempArr.push(this.newObjectListTemperorarily[1]);
     //      tempArr.push({label: event.target.value, value: event.target.value});
     //      this.newObjectListTemperorarily = tempArr;
     //      console.log(tempArr,'list val-- ', this.newObjectListTemperorarily);
     //      this.visible = false;
     // }