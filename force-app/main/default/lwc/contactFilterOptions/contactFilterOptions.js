import { LightningElement,api,track } from 'lwc';

export default class AccountFilterOptions extends LightningElement {
   @api search_account;
   @api option_for_custom_logic;
   @track filterListForAccount = [];
   itemSelected ='option1';

   CloseObjectFilter(event) {
    this.selectedObjectValue = "";
    
    
     if (event.target.alternativeText == this.search_account) {
         this.openAccountFilterOption = false;
         this.filterListForAccount = [];
         this.crossfilterListForAccount = [];
     }
   
 }
 addAppliedFilterAsList(event) {
    if (this.currentSelectedField != '--None--') {
        if (this.getObjectName === this.searchAccount) {
            if ((this.currentSelectedOperatorValue === null ||this.currentSelectedOperatorValue == 'aN/aN/NaN aN:aN') && (this.fieldType === 'STRING' || this.fieldType === 'DATE' || this.fieldType === 'DATETIME' || this.fieldType === 'PHONE' || this.fieldType === 'TEXTAREA' || this.fieldType === 'URL' || this.fieldType === 'CURRENCY' || this.fieldType === 'INTEGER')) {
                this.showError_NoValueForField = true;
                this.allowModelToOpen = true;
            }
            else { 
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
                    name: this.currentSelectedField,
                    operator: this.currentSelectedOperator,
                    operatorValue: this.currentSelectedOperatorValue,
                    operatorValueType: this.fieldType
                    });
                    this.filterListForAccount = this.filterListForAccount.map((item, index) => {
                        return {sno: index + 1,
                                id: item.id,
                                name:item.name,
                                operator: item.operator,
                                operatorValue:item.operatorValue,
                                operatorValueType:item.operatorValueType
                        };
                    });
                    

                     this.showError_NoValueForField = false;
                     this.allowModelToOpen = false;
                  }
            }
        }
    }
    }
    editFilterCriteria(event){
        this.allowModelToOpen = true;
        this.getObjectName = event.currentTarget.title;
        if(event.currentTarget.title == this.searchAccount){
            requiredObjectFields({ objectName: event.currentTarget.title })
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
            this.idToFind = event.currentTarget.parentElement.title;
            var result1 = this.filterListForAccount.find(item => item.id == event.currentTarget.parentElement.title);
            this.currentSelectedOperatorValue = result1.operatorValue;
            var findTypeOfValue = result1.operatorValueType;
            this.currentSelectedOperator = result1.operator;
            this.currentSelectedField = event.currentTarget.firstElementChild.title;
            this.fieldType = findTypeOfValue;
            if(findTypeOfValue == 'BOOLEAN'){
                this.setFilterModelValueInputBoxShowAndHideForBoolean = true;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
            }
        
            if(findTypeOfValue == 'EMAIL' || findTypeOfValue == 'STRING' || findTypeOfValue == 'PHONE' || findTypeOfValue == 'TEXTAREA'||findTypeOfValue == 'URL' || findTypeOfValue == 'CURRENCY' || findTypeOfValue =='INTEGER'){
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
            }
            if(findTypeOfValue == 'DATETIME'){
                this.setFilterModelValueInputBoxShowAndHideForDateTime = true;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
            }
            if (findTypeOfValue == 'DATE') {
                this.setFilterModelValueInputBoxShowAndHideForDate = true;
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
            }
            if(findTypeOfValue == 'PICKLIST'){
                this.setFilterModelValueInputBoxShowAndHideForPickList = true;
                this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                this.setFilterModelValueInputBoxShowAndHideForDate = false;
                this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                getPickListValues({ objectName: this.getObjectName, fieldName: event.currentTarget.firstElementChild.title})
                                .then(result => {
                                    let array = [{ label: '--None--', value: '--None--' }];
                                    this.currentSelectedOperatorValue = result1.operatorValue;
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
    }
    deleteFilterFromList(event) {
        if(event.target.name === this.searchAccount){
            const index = this.filterListForAccount.findIndex(object => {
                return object.id == event.currentTarget.parentElement.previousSibling.title;
            });
            this.filterListForAccount.splice(index, 1);
            this.filterListForAccount = this.filterListForAccount.map((item, index) => {
                return {sno: index + 1,
                        id: item.id,
                        name:item.name,
                        operator: item.operator,
                        operatorValue:item.operatorValue,
                        operatorValueType:item.operatorValueType
                };
            });
        }}
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
        handleRadioButton(event) {
            (event.currentTarget.name == this.searchAccount) ? (event.currentTarget.value == 'option3') ? this.showInputBoxOfAccount = true : this.showInputBoxOfAccount = false :
            (event.currentTarget.name == this.searchContact) ? (event.currentTarget.value == 'option3') ? this.showInputBoxOfContact = true : this.showInputBoxOfContact = false :
            (event.currentTarget.name == this.searchLead)    ? (event.currentTarget.value == 'option3') ? this.showInputBoxOfLead    = true : this.showInputBoxOfLead    = false :
            console.log('None', event.currentTarget.name);
        }
}