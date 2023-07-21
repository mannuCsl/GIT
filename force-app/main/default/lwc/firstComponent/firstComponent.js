import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class FirstComponent extends LightningElement {  
    messageContext = false;
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            console.log('currentPageReference: ',currentPageReference)
            this.isNewSkill = currentPageReference.state.isTrue__c;
            console.log('isNewSkill 12: ',this.isNewSkill)
            if (this.isNewSkill) {            
                this.firstComponent();              
            }
        }
    }

    connectedCallback() {
        console.log('connectedCallback val: ',this.isNewSkill);
        //this.messageContext = window.localStorage.getItem('val');        
    }
 
    firstComponent(){
        console.log('isNewSkill 40: ',this.isNewSkill);
        alert('Run handleClick method');
    }
}