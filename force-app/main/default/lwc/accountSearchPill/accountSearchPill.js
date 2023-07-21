import {api, LightningElement, wire} from 'lwc';
import getListOfFields from '@salesforce/apex/SfWiki_Handler.getListOfFields';


export default class AccountSearchPill extends LightningElement {


    @api searchPlaceholder = "Search";
    @api isValueSelected;
    @api selectedFieldLabel;
    @api sObjectName;

    listOfFields;
    searchTerm;

    //CSS
   // boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    //inputClass = '';

    @wire(getListOfFields, {sObjectName: '$sObjectName', searchTerm : '$searchTerm'})
    wiredRecords({ error, data }) {
        if (data) {
            let listOfFields = [];
            for(let i = 0; i < data.length; i++) {
                let tempRecord = Object.assign({}, data[i]); //cloning object
                listOfFields.push(tempRecord);
            }
            listOfFields.sort(this.compare);
            this.listOfFields = listOfFields;
        } else if (error) {
            console.log(error);
        }
    }

    handleClick() {
        this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onSelect(event) {
        let selectedFieldApiName = event.currentTarget.dataset.id;
        this.selectedFieldLabel = event.currentTarget.dataset.name;
        let selectedFieldType = event.currentTarget.dataset.item;
        const valueSelectedEvent = new CustomEvent('fieldselected', {
            detail: {
                selectedFieldApiName: selectedFieldApiName,
                selectedFieldType: selectedFieldType,
                selectedFieldLabel: this.selectedFieldLabel,
            }});
        this.dispatchEvent(valueSelectedEvent);
        this.isValueSelected = true;
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }

    handleRemovePill() {
        this.isValueSelected = false;
    }

    onChange(event) {
        this.searchTerm = event.target.value;
    }

    /**
     * This function compares two fields (for sorting purposes) with each other
     */
    compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const fieldLabelA = a.fieldLabel.toUpperCase();
        const fieldLabelB = b.fieldLabel.toUpperCase();

        let comparison = 0;
        if (fieldLabelA > fieldLabelB) {
            comparison = 1;
        } else if (fieldLabelA < fieldLabelB) {
            comparison = -1;
        }
        return comparison;
    }

}