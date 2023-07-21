import { LightningElement,api,track } from 'lwc';

export default class ModelForFilter extends LightningElement {
    //@api allowModelToOpen;
    @track optionOfAllFields = [];
    currentSelectedField = '--None--';
    currentSelectedOperator='';
    @track currentSelectedOperatorValue;
    datetime ='';
    setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
    setFilterModelValueInputBoxShowAndHideForPickList = false;
    setFilterModelValueInputBoxShowAndHideForBoolean = false;
    setFilterModelValueInputBoxShowAndHideForDate = false;
    setFilterModelValueInputBoxShowAndHideForDateTime = false;

    handleModalClose() {
        this.dispatchEvent(new CustomEvent('passval', { detail: false }));

       // console.log('child is allowModelToOpen',this.allowModelToOpen)
       // this.allowModelToOpen = false;
        this.showError_EmptyModel = false;
        this.showError_NoValueForField = false;
        this.idToFind = '';
        //console.log('child is allowModelToOpen',this.allowModelToOpen)

       // const event = new CustomEvent('passval', { detail: this.allowModelToOpen });
        
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
        console.log('object name ',this.getObjectName);

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
    handleModalOperator(event) {
        this.currentSelectedOperator = event.target.value;
    }
    handleModalFields(event) {
        console.log('ok',event.target.value);
        this.currentSelectedField = event.target.value;
        this.showError_NoValueForField = false;
        if (event.target.value != '--None--') {
            
            this.showError_EmptyModel = false;
            let entries = Object.entries(this.alloperatorValue);
            entries.map(([key, val] = entry) => {

                if (val.includes(event.target.value.toLowerCase())) {
                    this.fieldType = key;
                    if (key == 'STRING' || key == 'EMAIL') {
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'contains', value: 'contains'}, { label:'does not contains', value: 'does not contains'}, { label:'starts with', value:'starts with'}];
                        this.currentSelectedOperatorValue = null;
                        
                    }
                    if (key == 'BOOLEAN') {
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}];
                        this.currentSelectedOperatorValue = 'true';
                        
                    }
                    if (key == 'PHONE' || key == 'TEXTAREA' || key == 'URL' || key == 'CURRENCY' || key == 'INTEGER') {
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
                        this.currentSelectedOperatorValue =null;
                    }
                    if (key == 'DATETIME') {
                        this.setFilterModelValueInputBoxShowAndHideForDateTime = true;
                        this.setFilterModelValueInputBoxShowAndHideForDate = false;
                        this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                        this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                        this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                        this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
                        this.currentSelectedOperatorValue = null;
                    }
                    if (key == 'DATE') {
                            this.setFilterModelValueInputBoxShowAndHideForDate = true;
                            this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                            this.setFilterModelValueInputBoxShowAndHideForPickList = false;
                            this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                            this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
                            this.operatorValue = [{ label:'equals', value:'equals'}, { label:'not equals', value:'not equals'}, { label: 'less than', value: 'less than'}, { label:'greater than', value: 'greater than'}, { label:'less or equal', value:'less or equal'}, { label:'greater or equal', value:'greater or equal'}];
                            this.currentSelectedOperatorValue = null;
                    }
                    if (key == 'PICKLIST') {
                            this.setFilterModelValueInputBoxShowAndHideForPickList = true;
                            this.setFilterModelValueInputBoxShowAndHideForDate = false;
                            this.setFilterModelValueInputBoxShowAndHideForBoolean = false;
                            this.setFilterModelValueInputBoxShowAndHideForCustumLogic = false;
                            this.setFilterModelValueInputBoxShowAndHideForDateTime = false;
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
            this.operatorValue = [{ label: '--None--', value: '--None--' }];
            
        }
    }
}