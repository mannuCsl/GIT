import { LightningElement, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import doConvert from '@salesforce/apex/LeadConvertController.doConvert';
import searchAccountName from '@salesforce/apex/LeadConvertController.searchAccountName';
import { CloseActionScreenEvent } from "lightning/actions";

export default class ConvertLead extends LightningElement {
    activeSections = ['A', 'C'];
    activeSectionsMessage = '';
    valuename;
    data =[];
    ConvertedName;
    CreateNewValue = 'true';   
    @api recordId;// isSeRecordKiIdAutomaticMitiHai
    
    get ConvertedOptions() {
        return[
            { label:'Converted', vlaue: 'Converted'},
        ];
    }
    ConvertedFunction(event){
        this.ConvertedName = event.detail.value;
    } 
    // CreateNewRadioButton(){
    //     this.CreateNewValue = 'false';
    //     this.ChooseExistingValue = 'true';
    // }
    // ChooseExistingRadioButton(){
    //     this.ChooseExistingValue = 'false';
    //     this.CreateNewValue = 'true';
    // }

    // value = '';
    // get CrearteOptions() {
    //     return [
    //         { label:'Create New', value:'Crearte New'},{ label:'Choose Existing', value:'Choose Existing'},
    //     ];
    // }

    onchangeAccNameSearch(event){
        this.valuename = event.target.value;
        console.log(this.valuename)
        searchAccountName({accname:this.valuename})
        .then(result =>{
           this.data = result;
            console.log('result--',result);
        })
        .catch(error =>{
            console.log('error--',error);
        })
    }

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', '); 
                 this.activeSectionsMessage = !this.openSections;
        }
    }
    halndelClickCancle() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
      halndelClickConvert(){
        doConvert({leadId : this.recordId})
        .then(result => {
            this.data = result;
            console.log('Data--',this.data);
            const evet = new ShowToastEvent({
                title:'Your Lead had been Converted',
                message:'Account , Contact and Opportunity',
                variant: 'Success',              
            });
            this.dispatchEvent(evet);
        })
        .catch(error => {
            console.log('There was an Error :( ...');
            this.error = error;
            console.log(error);
        })
    }
    lookupRecord(event){
        console.log('Selected Record Value on Parent Component is ' +  JSON.stringify(event.detail.selectedRecord));
        //alert('Selected Record Value on Parent Component is ' +  JSON.stringify(event.detail.selectedRecord));
    }
   
}