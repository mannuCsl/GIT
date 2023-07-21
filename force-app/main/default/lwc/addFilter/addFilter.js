import { api, LightningElement, track } from 'lwc';
import requiredObjectFields from '@salesforce/apex/SetFilterContrl.requiredObjectFields';
import requiredObjectFieldsForCrossFilter from '@salesforce/apex/SetFilterContrl.requiredObjectFieldsForCrossFilter';
import mapForFields from '@salesforce/apex/SetFilterContrl.mapForFields';
import getPickListValues from '@salesforce/apex/SetFilterContrl.getPickListValues';
import gettingChildObjectsToSetCrossFilters from '@salesforce/apex/SetFilterContrl.gettingChildObjectsToSetCrossFilters';
import findNearBy from '@salesforce/apex/FindNearByCtrl.findNearBy';
// import getPickListValues from '@salesforce/apex/Testdemo.getPickListValues';


export default class addFilter extends LightningElement {

    @track isOpen = true;   
    iconName='utility:chevronup';
    get containerStyle() {
        return `max-height: ${this.isOpen ? '500px' : '0px'}; transition: max-height 1s ease-in-out;`;
    }
    handleToggleClick() {
        this.isOpen = !this.isOpen;
        if(this.isOpen){
             this.iconName='utility:chevronup'; //up
        }
        else{
             this.iconName='utility:chevrondown'; //down
        }
   }
   @api Address=[]; 
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


    isCrossFilterModelOpen = false;
    allowModelToOpen = false;
    showInputBoxOfAccount = false;
    showInputBoxOfContact = false;
    showInputBoxOfLead = false;
    currentSelectedField = '--None--';
    currentSelectedOperator='';
    itemSelected ='option1';
    @track currentSelectedOperatorValue;
    @track optionOfAllFields = [];
    @track operatorValue = [{ label: '--None--', value: '--None--' }];
    @track getObjectName = '';
    selectedObjectValue ="";
    searchAccount = 'Account';
    searchPickListForAccount;
    searchContact = 'Contact';
    searchLead = 'Lead';
    @track alloperatorValue = [];
    openAccountFilterOption = false;
    openContactFilterOption = false;
    openLeadFilterOption = false;
    
    openInfo = false;
    @track optionOfAllPicklist = [];
    setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
    setFilterModelValueInputBoxShowAndHideForPickList = false;
    setFilterModelValueInputBoxShowAndHideForBoolean = false;
    setFilterModelValueInputBoxShowAndHideForDate = false;
    setFilterModelValueInputBoxShowAndHideForDateTime = false;
    showInputBoxForEmail = false;

    @track filterListForAccount = [];
    @track filterListForContact = [];
    @track filterListForLead = [];
    @track todoTasks = [];
    showError_EmptyModel = false;
    showError_NoValueForField = false;
    fieldType = '';
    datetime ='';
    idToFind;
    addObjectAtFirst=true;
    @track filterContainer=[];
    //NearByVariables
    distanceValue=0;
    distanceUnit = 'KM';
    findOnlyMyRecords=false;
    //selected;
    isSubCrossFilterModel = false;
    currentSelectedPrimaryObject='Account';
    currentSelectedCrossFilterWith = 'with';
    currentSelectedSecondaryObject = 'Asset';
    currentSelectedFieldForCrossFilter = '';
    @track crossfilterListForAccount = [];
    @track crossfilterListForContact = [];
    @track crossfilterListForLead = [];
    @track optionOfSecondaryObject = [];
    @track optionOfAllFieldsForCrossFilter = [];
    @track operatorValueForCrossFilter = [];
    @track allObj ;
    @track currentSelectedOperatorValueForCrossFilter;
    setCrossFilterModelValueForBoolean =false;
    setCrossFilterModelValueForBooleanForPickList = false;
    @track optionToSelectObject = [{ label: 'Account', value: 'Account'},
                            { label: 'Contact', value: 'Contact'},
                             { label: 'Lead', value: 'Lead'},];
    get optionForCustomLigic() {
        return [
            { label: 'All of the conditions are met (AND)', value: 'option1'},
            { label: 'Any of the conditions are met (OR)', value: 'option2' },
            { label: 'Customize the logic', value: 'option3' },
        ];
    }
    get optionToChangeUnit() {
        return [
            { label: 'KM', value: 'KM' },
            { label: 'Miles', value: 'Miles' },
        ];
    }
    get optionsOfTrueFalse(){
        return [
            { label: 'True', value: 'true' },
            { label: 'False', value: 'false' },
        ];
    }
    get optionOfCrossFilterWith(){
        return [
            {label:'With', value:'with'},
            {label:'Without', value:'without'},
        ]
    }
    get optionOfPrimaryObject(){
       return [
        {label:this.selectedObjectValue, value:this.selectedObjectValue},
       ] 
    }
    showInfo() {
        this.openInfo = true;
    }
    hideInfo() {
        this.openInfo = false;
    }
    handledistanceUnit(event) {
        this.distanceUnit = event.target.value;
        console.log('currentUnit is ',this.distanceUnit);
    }
    handleFindOnlyMyRecords(event){
        this.findOnlyMyRecords=event.target.checked;
        console.log('does record i own ',this.findOnlyMyRecords)
    }
    handledistanceValue(event){
        this.distanceValue=event.target.value;
        console.log('Distance is ',this.distanceValue);
    }
    findNearByHandler(event){
        console.log('distanceValue',this.distanceValue,' ',this.distanceUnit,' DoesRecordIOwn ',this.doesRecordIOwn);
        console.log('current Object is ',JSON.stringify(this.filterContainer));

        findNearBy({filterLists:JSON.stringify(this.filterContainer)})
        .then(result => {
          console.log('result ',result);
        })
        .catch(error => {
            console.error(error);
        });
        console.log('current related Filter ',JSON.stringify(this.filterListForAccount));
    }
    
    handelModel(event) {
        this.getObjectName = event.target.title;
        this.allowModelToOpen = true;
        this.operatorValue = [{ label: '--None--', value: '--None--' }];
        this.currentSelectedField = '--None--';
        this.currentSelectedOperator = '--None--';
        this.currentSelectedOperatorValue=null;
        this.datetime='';
        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
        this.setFilterModelValueInputBoxShowAndHideForDate = false;
        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
        this.showInputBoxForEmail = false;

        requiredObjectFields({ objectName: this.getObjectName })
            .then(result => {
                let arr = [{ label: '--None--', value: '--None--' }];
                for (var i = 0; i < result.length; i++) {
                    arr.push({
                        label: result[i],
                        value: result[i]
                    })
                }
                this.optionOfAllFields = arr;
            })
            .catch(error => {
                console.error(error);
            });
        mapForFields({ objectName: this.getObjectName })
            .then(result => {
                this.alloperatorValue = result;
            })
            .catch(error => {
                console.error(error);
            });
    }
    handleModalClose() {
        this.allowModelToOpen = false;
        this.showError_EmptyModel = false;
        this.showError_NoValueForField = false;
        this.idToFind = '';
    }
    handleObjectChange(event) {
        this.selectedObjectValue = event.detail.value;
        this.optionToSelectObject = this.optionToSelectObject.filter(item => item.label !== event.detail.value);  //This will remove the selected Option(Object) From OptionToSelectObject
        if(this.filterContainer.length < 3){
            this.filterContainer.push({ label: event.detail.value, value: event.detail.value,});
        }
        if (this.selectedObjectValue == this.searchAccount) {
            this.openAccountFilterOption = true;    
        }
        if (this.selectedObjectValue == this.searchContact) {
            this.openContactFilterOption = true;
        }
        if (this.selectedObjectValue == this.searchLead) {
            this.openLeadFilterOption = true;     
        }
        if((this.openAccountFilterOption) && (this.openContactFilterOption) && (this.openLeadFilterOption)){
                this.addObjectAtFirst = false;
            }
    }
    CloseObjectFilter(event) {
       this.selectedObjectValue = "";
       this.addObjectAtFirst = true;
            this.filterContainer.splice(this.filterContainer.findIndex(x => x.value ===event.target.alternativeText),1);
        if (event.target.alternativeText == this.searchAccount) {
            this.openAccountFilterOption = false;
            this.filterListForAccount = [];
            this.crossfilterListForAccount = [];
            
            this.optionToSelectObject.splice(0, 0, { label:event.target.alternativeText, value:event.target.alternativeText});
            this.optionToSelectObject = [...this.optionToSelectObject];
        }
        if (event.target.alternativeText == this.searchContact) {
            this.openContactFilterOption = false;
            this.filterListForContact = [];
           
            this.optionToSelectObject.splice(1, 0, { label:event.target.alternativeText, value:event.target.alternativeText});
            this.optionToSelectObject = [...this.optionToSelectObject];
        }
        if (event.target.alternativeText == this.searchLead) {
           this.openLeadFilterOption = false;
            this.filterListForLead = [];
            
            this.optionToSelectObject.splice(2, 0, { label:event.target.alternativeText, value:event.target.alternativeText});
            this.optionToSelectObject = [...this.optionToSelectObject];
        }
    }
    handleModalFields(event) {
        this.currentSelectedField = event.target.value;
        this.showError_NoValueForField = false;
        if (event.target.value != '--None--') {
            
            this.showError_EmptyModel = false;
            let entries = Object.entries(this.alloperatorValue); 
            //It gives Key and Value returned From apex
            entries.map(([key, val] = entry) => {

                if (val.includes(event.target.value.toLowerCase())) {
                    
                    this.fieldType = key;
                    console.log('key type ',key);
                    if (key == 'STRING'  || key == 'TEXTAREA') {
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                        this.showInputBoxForEmail = false;
                        console.log('this.operatorValue ',this.operatorValue);
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];
                        this.currentSelectedOperatorValue = null;
                        
                    }
                    if (key == 'EMAIL') {
                        this.showInputBoxForEmail = true;
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                        console.log('this.operatorValue Email',this.operatorValue);
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];
                        this.currentSelectedOperatorValue = null;
                        
                    }
                    if (key == 'BOOLEAN') {
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                        this.showInputBoxForEmail = false;
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}];
                        this.currentSelectedOperatorValue = 'true';
                        
                    }
                    if (key == 'URL' || key == 'CURRENCY' || key == 'INTEGER') {
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                        this.showInputBoxForEmail = false;
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
                        this.currentSelectedOperatorValue =null;
                    }
                    if (key == 'PHONE') {
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                        this.showInputBoxForEmail = false;
                        this.operatorValue = [{label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, {label:'does not contains', value: 'does not contains'}, {label:'starts with', value:'starts with'}];
                        this.currentSelectedOperatorValue =null;
                    }
                    if (key == 'DATETIME') {
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                        this.showInputBoxForEmail = false;
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
                        this.currentSelectedOperatorValue = null;
                    }
                    if (key == 'DATE') {
                            this.setFilterModelValueInputBoxShowAndHideForDate = true;
                            this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                            this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                            this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                            this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                            this.showInputBoxForEmail = false;
                            this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
                            this.currentSelectedOperatorValue = null;
                    }
                    if (key == 'PICKLIST') {
                            this.setFilterModelValueInputBoxShowAndHideForPickList = true;
                            this.setFilterModelValueInputBoxShowAndHideForDate = false;
                            this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                            this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                            this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                            this.showInputBoxForEmail = false;
                            this.searchPickListForAccount = key;
                            this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}];

                            getPickListValues({ objectName: this.getObjectName, fieldName: event.target.value})
                                .then(result => {
                                    let array = [{ label: '--None--', value: '--None--' }];
                                    this.currentSelectedOperatorValue =array[0].value;
                                    for (var i = 0; i < result.length; i++) {
                                        array.push({
                                            label: result[i],
                                            value: result[i]
                                        })
                                    }
                                    this.optionOfAllPicklist = array;
                                })
                                .catch(error => {
                                    console.error(error);
                                });                                    
                    }
                }     
            });
            this.currentSelectedOperator = this.operatorValue[0].value;
            
        }
        else {
            this.currentSelectedOperator = '--None--';
            this.currentSelectedOperatorValue = null;
            this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
            this.setFilterModelValueInputBoxShowAndHideForDate = false;
            this.setFilterModelValueInputBoxShowAndHideForPickList = false;
            this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
            this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
            this.showInputBoxForEmail = false;
            this.operatorValue = [{ label: '--None--', value: '--None--' }];
            
        }
    }
    handleModalOperator(event) {
        this.currentSelectedOperator = event.target.value;
    }
    handleModalBooleanValue(event){ 
        this.currentSelectedOperatorValue = event.target.value;
    }
    handleModalPicklistOption(event) {
        this.currentSelectedOperatorValue = event.target.value;
    }
    handleModalCustumLogicValue(event) {
        this.currentSelectedOperatorValue = event.target.value;
    }
    handleModalDateValue(event) {
        this.showError_NoValueForField = false;
        this.currentSelectedOperatorValue = event.target.value;
    }
    handleModalDateTimeValue(event) {
        
        this.showError_NoValueForField = false;
        this.datetime = event.target.value;
        var formatedDate = new Date(Date.parse(event.target.value));
        this.currentSelectedOperatorValue =  ("0"+(formatedDate.getMonth()+1)).slice(-2) + "/" +("0" + formatedDate.getDate()).slice(-2) + "/" +
        formatedDate.getFullYear() + " " + ("0" + formatedDate.getHours()).slice(-2) + ":" + ("0" + formatedDate.getMinutes()).slice(-2);
    }
    handleRadioButton(event) {
        (event.currentTarget.name == this.searchAccount) ? (event.currentTarget.value == 'option3') ? this.showInputBoxOfAccount = true : this.showInputBoxOfAccount = false :
        (event.currentTarget.name == this.searchContact) ? (event.currentTarget.value == 'option3') ? this.showInputBoxOfContact = true : this.showInputBoxOfContact = false :
        (event.currentTarget.name == this.searchLead)    ? (event.currentTarget.value == 'option3') ? this.showInputBoxOfLead    = true : this.showInputBoxOfLead    = false :
        console.log('None', event.currentTarget.name);
    }
    
    addAppliedFilterAsList(event) {
        if (this.currentSelectedField != '--None--') {
            
            if ((this.currentSelectedOperatorValue === null ||this.currentSelectedOperatorValue == 'aN/aN/NaN aN:aN') && (this.fieldType === 'STRING' || this.fieldType === 'DATE' || this.fieldType === 'DATETIME' || this.fieldType === 'PHONE' || this.fieldType === 'TEXTAREA' || this.fieldType === 'URL' || this.fieldType === 'CURRENCY' || this.fieldType === 'INTEGER')) {
                         this.showError_NoValueForField = true;
                         this.allowModelToOpen = true;
                }  
            else{
                this.showError_NoValueForField = false;
                if (event.target.name === 'Account') {
                    const isFound = this.filterListForAccount.some(element => {
                        if (element.id == this.idToFind) {
                            element.operatorValue = this.currentSelectedOperatorValue; 
                            element.operator= this.currentSelectedOperator;
                            element.name= this.currentSelectedField;
                            element.operatorValueType = this.fieldType;
                            this.showError_NoValueForField = false;
                            this.allowModelToOpen = false;
                            this.idToFind = '';
                             return true;
                            }
                             return false;
                      });
                      if(!isFound){
                        this.filterListForAccount.push({
                            id: this.filterListForAccount[this.filterListForAccount.length - 1] ? this.filterListForAccount[this.filterListForAccount.length - 1].id + 1 : 1,
                            objectName:event.target.name,
                            name:this.currentSelectedField,
                            operatorValue : this.currentSelectedOperatorValue,
                            operator: this.currentSelectedOperator,
                            operatorValueType: this.fieldType,
                           });
                           this.filterListForAccount = this.filterListForAccount.map((item, index) => {
                            return {
                                    objectName:item.objectName,
                                    id:item.id,
                                    sno: index + 1,
                                    name:item.name,
                                    operator: item.operator,
                                    operatorValue:item.operatorValue,
                                    operatorValueType:item.operatorValueType
                            };
                        });
                        this.filterContainer[this.filterContainer.findIndex(x => x.label == this.getObjectName)].filterList = this.filterListForAccount;
                      }
                }
                if (event.target.name==='Contact') {
                    const isFound = this.filterListForContact.some(element => {
                        if (element.id == this.idToFind) {
                            element.operatorValue = this.currentSelectedOperatorValue; 
                            element.operator= this.currentSelectedOperator;
                            element.name= this.currentSelectedField;
                            element.operatorValueType = this.fieldType;
                            this.showError_NoValueForField = false;
                            this.allowModelToOpen = false;
                            this.idToFind = '';
                             return true;
                            }
                             return false;
                      });
                      if(!isFound){
                        this.filterListForContact.push({
                            id: this.filterListForContact[this.filterListForContact.length - 1] ? this.filterListForContact[this.filterListForContact.length - 1].id + 1 : 1,
                            objectName:event.target.name,
                            name:this.currentSelectedField,
                            operatorValue : this.currentSelectedOperatorValue,
                            operator: this.currentSelectedOperator,
                            operatorValueType: this.fieldType,
                           });
                           this.filterListForContact = this.filterListForContact.map((item, index) => {
                            return {
                                    objectName:item.objectName,
                                    id:item.id,
                                    sno: index + 1,
                                    name:item.name,
                                    operator: item.operator,
                                    operatorValue:item.operatorValue,
                                    operatorValueType:item.operatorValueType
                            };
                        });
                        this.filterContainer[this.filterContainer.findIndex(x => x.label == this.getObjectName)].filterList = this.filterListForContact;
                      }
                 }
                if (event.target.name==='Lead') {
                    const isFound = this.filterListForLead.some(element => {
                        if (element.id == this.idToFind) {
                            element.operatorValue = this.currentSelectedOperatorValue; 
                            element.operator= this.currentSelectedOperator;
                            element.name= this.currentSelectedField;
                            element.operatorValueType = this.fieldType;
                            this.showError_NoValueForField = false;
                            this.allowModelToOpen = false;
                            this.idToFind = '';
                             return true;
                            }
                             return false;
                      });
                      if(!isFound){
                        this.filterListForLead.push({
                            id: this.filterListForLead[this.filterListForLead.length - 1] ? this.filterListForLead[this.filterListForLead.length - 1].id + 1 : 1,
                            objectName:event.target.name,
                            name:this.currentSelectedField,
                            operatorValue : this.currentSelectedOperatorValue,
                            operator: this.currentSelectedOperator,
                            operatorValueType: this.fieldType,
                           });
                           this.filterListForLead = this.filterListForLead.map((item, index) => {
                            return {
                                    objectName:item.objectName,
                                    id:item.id,
                                    sno: index + 1,
                                    name:item.name,
                                    operator: item.operator,
                                    operatorValue:item.operatorValue,
                                    operatorValueType:item.operatorValueType
                            };
                        });
                        this.filterContainer[this.filterContainer.findIndex(x => x.label == this.getObjectName)].filterList = this.filterListForLead;
                      }
                    }
            
            this.allowModelToOpen = false;
        }
         
        }
        else {
            this.allowModelToOpen = true;
            this.showError_EmptyModel = true;
        }this.currentSelectedOperatorValue='';
    }
    /* It  opens model to Edit the Existing  Filter Criteria */
    editFilterCriteria(event){
    this.allowModelToOpen = true;
    this.filterContainer.forEach(elemt => {
        if(elemt.label==event.currentTarget.title){
                this.getObjectName=elemt.label;
                requiredObjectFields({ objectName: elemt.label })
                .then(result => {
                    let arr = [{ label: '--None--', value: '--None--' }];
                    for (var i = 0; i < result.length; i++) {
                        arr.push({
                            label: result[i],
                            value: result[i]
                        })
                    }
                    this.optionOfAllFields = arr;
                })
                .catch(error => {
                    console.error(error);
                });
                elemt.filterList.forEach(element => {
                    if(element.id == event.currentTarget.dataset.id){
                        let entries = Object.entries(this.alloperatorValue);
                        entries.map(([key, val] = entry) => {
                            if(key==element.operatorValueType){
                                
                                this.fieldType = key;
                                this.currentSelectedField=element.name;
                                this.currentSelectedOperator=element.operator;
                                this.currentSelectedOperatorValue=element.operatorValue; 
                                this.idToFind = element.id;    
                            }
                        });
                     }
                });
            
            }
      });
      if (this.fieldType == 'STRING'|| this.fieldType == 'TEXTAREA') {
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                this.showInputBoxForEmail = false;
                this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];
            }
            if (this.fieldType == 'EMAIL') {
                this.showInputBoxForEmail = true;
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                console.log('this.operatorValue Email',this.operatorValue);
                this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];
                
            }
            if (this.fieldType == 'BOOLEAN') {
                this.setFilterModelValueInputBoxShowAndHideForBoolean = true;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                this.showInputBoxForEmail = false;
                this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}];
            }
             if (this.fieldType == 'URL' || this.fieldType == 'CURRENCY' || this.fieldType == 'INTEGER') {
               this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                this.showInputBoxForEmail = false;
                this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
            }
            if (this.fieldType == 'PHONE') {
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                this.showInputBoxForEmail = false;
                this.operatorValue = [{label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, {label:'does not contains', value: 'does not contains'}, {label:'starts with', value:'starts with'}];
                this.currentSelectedOperatorValue =null;
            }
            if (this.fieldType == 'DATETIME') {
                this.setFilterModelValueInputBoxShowAndHideForDateTime = true;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.showInputBoxForEmail = false;
                this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
            }
            if (this.fieldType == 'DATE') {
                    this.setFilterModelValueInputBoxShowAndHideForDate = true;
                    this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                    this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                    this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                    this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                    this.showInputBoxForEmail = false;
                    this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
            }


            if(this.fieldType == 'PICKLIST'){
                this.setFilterModelValueInputBoxShowAndHideForPickList = true;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                this.showInputBoxForEmail = false;
                this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}];

                console.log('piclist ',this.currentSelectedField)
                getPickListValues({ objectName: this.getObjectName, fieldName: this.currentSelectedField})
                                .then(result => {
                                    let array = [{ label: '--None--', value: '--None--' }];
                                    //this.currentSelectedOperatorValue = result1.operatorValue;
                                    for (var i = 0; i < result.length; i++) {
                                        array.push({
                                            label: result[i],
                                            value: result[i]
                                        })
                                    }
                                    this.optionOfAllPicklist = array;
                                })
                                .catch(error => {
                                    console.error(error);
                                });
            }    
    }
    deleteFilterFromList(event) {
        console.log('Current Object Name ',event.currentTarget.name,' name ',this.getObjectName);
                    //  this.filterContainer.forEach(elemt => {
                    //     console.log('Current Obj is ',elemt.label);
                    //     if(event.currentTarget.name==elemt.label){

                    //     }
                    //  });
                    if(event.currentTarget.name==this.searchAccount){
                    //     this.filterListForAccount.forEach(element => {
                    //     console.log('Account Filter Id ',element.id,' current id',event.target.dataset.id);
                    //     //const   index =this.filterListForAccount.findIndex(x => (x.id == event.target.dataset.id));
                    //      if(this.filterListForAccount.findIndex(x => (x.id == event.target.dataset.id)) !=-1){
                    //         this.filterListForAccount.splice(this.filterListForAccount.findIndex(x => (x.id == event.target.dataset.id)), 1); 
                    //      }  
                    // });
                    if(this.filterListForAccount.findIndex(x => (x.id == event.target.dataset.id)) !=-1){
                        this.filterListForAccount.splice(this.filterListForAccount.findIndex(x => (x.id == event.target.dataset.id)), 1); 
                     } 
                    this.filterListForAccount = this.filterListForAccount.map((item, index) => {
                        return {
                                objectName:item.objectName,
                                sno: index + 1,
                                id: item.id,
                                name:item.name,
                                operator: item.operator,
                                operatorValue:item.operatorValue,
                                operatorValueType:item.operatorValueType
                        };
                    });
                    this.filterContainer[this.filterContainer.findIndex(x => x.label == event.currentTarget.name)].filterList = this.filterListForAccount;
                }
                if(event.currentTarget.name==this.searchContact){
                    this.filterListForContact.forEach(element => {
                        console.log('contact Filter Id ',element.id,' current id',event.target.dataset.id);
                        const   index =this.filterListForContact.findIndex(x => (x.id == event.target.dataset.id));
                         if(index !=-1){
                            this.filterListForContact.splice(index, 1); 
                         }
                    });
                     this.filterListForContact = this.filterListForContact.map((item, index) => {
                        return {
                                objectName:item.objectName,
                                sno: index + 1,
                                id: item.id,
                                name:item.name,
                                operator: item.operator,
                                operatorValue:item.operatorValue,
                                operatorValueType:item.operatorValueType
                        };
                    });
                    this.filterContainer[this.filterContainer.findIndex(x => x.label == event.currentTarget.name)].filterList = this.filterListForContact;             
                }
                if(event.currentTarget.name==this.searchLead){
                    this.filterListForLead.forEach(element => {
                        console.log('Lead Filter Id ',element.id,' current id',event.target.dataset.id);
                        const   index =this.filterListForLead.findIndex(x => (x.id == event.target.dataset.id));
                         if(index !=-1){
                            this.filterListForLead.splice(index, 1); 
                         }
                    });

                    this.filterListForLead = this.filterListForLead.map((item, index) => {
                        return {
                                objectName:item.objectName,
                                sno: index + 1,
                                id: item.id,
                                name:item.name,
                                operator: item.operator,
                                operatorValue:item.operatorValue,
                                operatorValueType:item.operatorValueType
                        };
                    });
                    this.filterContainer[this.filterContainer.findIndex(x => x.label == event.currentTarget.name)].filterList = this.filterListForLead;
                
                
                }    
    }
    deleteCrossFilterFromList(event){
        if(event.target.name === this.searchAccount){
            const index = this.crossfilterListForAccount.findIndex(object => {
                return object.id == event.currentTarget.value;
            });
            if(index != -1){
                this.crossfilterListForAccount.splice(index, 1);
            }    
        }
    }
    
    applyCrossFilter(event){
        this.isCrossFilterModelOpen = false;
       this.crossfilterListForAccount.push(
        {
            primaryObject:this.currentSelectedPrimaryObject,
            with:this.currentSelectedCrossFilterWith,
            secondaryObject:this.currentSelectedSecondaryObject
        });
        this.crossfilterListForAccount = this.crossfilterListForAccount.map((item, index) => {
            return {
                    id: index,
                    primaryObject:item.primaryObject,
                    with:item.with,
                    secondaryObject:item.secondaryObject
            };
        });
        console.log('1.1',this.getObjectName);
        console.log('2222',this.crossfilterListForAccount);
        console.log('3333',this.filterContainer);
        this.filterContainer[this.filterContainer.findIndex(x => x.label == 'Account')].crossFilterList = this.crossfilterListForAccount;
      console.log('444444',this.filterContainer);
       
    }

    handleCrossFilter(event){
        this.isCrossFilterModelOpen = true;
        gettingChildObjectsToSetCrossFilters({ crossFilterObjectName : this.selectedObjectValue })
        .then(result => {
            if(result != null){
                let array = [];
                for (var i = 0; i < result.length; i++) {
                    array.push({
                        label: result[i],
                        value: result[i]
                    })
                }
                this.optionOfSecondaryObject = array;
            }
            else{
                alert('please add related Object from option tab, There is no availble related object to set cross filter');
            }
            
        })
        .catch(error => {
            console.error(error);
        });
        console.log('3333');
    }
    closeCrossFilterModelHandler(event){
        this.isCrossFilterModelOpen = false;
    }
    handleoptionOfPrimaryObject(event){
        this.currentSelectedPrimaryObject = event.target.value;
    }
    handleoptionOfCrossFilterWith(event){
        this.currentSelectedCrossFilterWith = event.target.value;
    }
    handleoptionOfSecondaryObject(event){
        this.currentSelectedSecondaryObject = event.target.value;    
    }
    openSubCrossFilterModel(event){
        this.isSubCrossFilterModel  = true;
        this.currentSelectedFieldForCrossFilter = '--None--';  
        console.log('okok',this.currentSelectedSecondaryObject);
        requiredObjectFieldsForCrossFilter({ objName: this.currentSelectedSecondaryObject })
        .then(result => {
            this.allObj = result;
            console.log('typeOf ',typeof(this.allObj))
            const allObjKeys = Object.keys(this.allObj);
            let arr = [{ label: '--None--', value: '--None--' }];
            allObjKeys.forEach(key => {
                console.log(' aaaaa ',this.allObj[key]); 
              for (var i = 0; i < this.allObj[key].length; i++) {
                //arr.push({value:data[key], key:key});

                arr.push({
                    label: this.allObj[key][i],
                    value: this.allObj[key][i]
                })
            }
              });
            
            this.optionOfAllFieldsForCrossFilter = arr;
            console.log('result.optionOfAllFieldsForCrossFilter ',this.optionOfAllFieldsForCrossFilter);
        })
        .catch(error => {
            console.error(error);
        }); 
    }
    closeSubCrossFilterModel(event){
        this.isSubCrossFilterModel  = false;
    }
    applySubCrossFilter(event){
        console.log('Work is in Progress, inconvenience caused is deeply regretted',this.getObjectName);    
    }
    handleAllFieldsForCrossFilter(event){
        this.currentSelectedFieldForCrossFilter = event.target.value;
        console.log('fields are ', this.currentSelectedFieldForCrossFilter);
        console.log('fields==== ',this.allObj);
        console.log(this.optionOfAllFieldsForCrossFilter.includes(this.currentSelectedFieldForCrossFilter));
        function getKeyByValue(object, value) {
        for (let key in object) {
            for(var i = 0; i < object[key].length; i++){
                if (object[key][i] === value) {
                    return key;
                  }
            }
          
        }
        return null; // Value not found in object
      }
       console.log(' field type ',getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter));
        if(getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'TEXTAREA' ||
           getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'STRING'   ||
           getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'ADDRESS'   ||
           getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'REFERENCE' ||
           getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'ID'){
            //this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
            this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];                  
        }
        
        
        if(getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'BOOLEAN'){
            this.setCrossFilterModelValueForBoolean = true;
            this.setCrossFilterModelValueForBooleanForPickList = false;
            //this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
            this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}];
            this.currentSelectedOperatorValueForCrossFilter = true;                  
        }
        // if(getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'ID'){
        //     //this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
        //     this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];                  
        // }
        if(getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'CURRENCY' ||
            getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'DATE'){
            this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
        }
        
        if(getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'DATETIME'){
            this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
        }
        if(getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'DOUBLE'){
            //this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
            this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];                  
        }
        if(getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'INTEGER'){
            //this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
            this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];                  
        }
        if(getKeyByValue(this.allObj,this.currentSelectedFieldForCrossFilter) === 'PICKLIST'){
            this.setCrossFilterModelValueForBoolean = false
            this.setCrossFilterModelValueForBooleanForPickList = true;
            //this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
           // this.operatorValueForCrossFilter = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];                  
           //console.log('objectname ',this.currentSelectedSecondaryObject);
           //console.log('picklist ',this.currentSelectedSecondaryObject ,' fieldName ',this.currentSelectedFieldForCrossFilter)
           getPickListValues({ objectName: this.currentSelectedSecondaryObject, fieldName: event.target.value})
           .then(result => {
               let array = [{ label: '--None--', value: '--None--' }];
               this.currentSelectedOperatorValueForCrossFilter =array[0].value;
               for (var i = 0; i < result.length; i++) {
                   array.push({
                       label: result[i],
                       value: result[i]
                   })
               }console.log('pic val ',array);
               this.optionOfAllPicklistForCrossFilter = array;
           })
           .catch(error => {
               console.error(error);
           });  
        }       
    }
}