import { LightningElement, track } from 'lwc'; 
    export default class employeeDetai  extends LightningElement {
        valuename = 'Kuchh'
        dateValue;

        dateOnchangeHandler(e){
            this.dateValue = e.target.value;
            ///this.dateValue.toLocaleDateString('en-US'); 
            console.log('dateValue: ',this.dateValue)
        }
        @track dateValue123 = new Date();
    
        get formattedDate() {
            console.log(this.dateValue123.toLocaleDateString('en-US'))
            return this.dateValue123.toLocaleDateString('en-US');
        }
    










        get salutationOptions() {
            return[
                { label:'--None--', vlaue: '--None--'},{label:'Mr.', value: 'Mr.'},{label:'Ms.', value: 'Ms.'},{label:'Mrs.', value: 'Mrs.'},
                {label:'Dr.', value: 'Dr.'},{label:'Prof.', value: 'Prof.'},
            ];
        }
        salutationFunction(event){
            this.value = event.detail.value;
        } 


    _selected = [];

    get lanuageOptions() {
        return [
            { label: 'English', value: 'English' },{ label: 'German', value: 'German' },{ label: 'Spanish', value: 'Spanish' },
            { label: 'French', value: 'French' },{ label: 'Italian', value: 'Italian' },{ label: 'Japanese', value: 'Japanese' },
            { label: 'Urdu', value: 'Urdu' },
        ];
    }
    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    languageFunction(e) {
        this._selected = e.detail.value;
    }


    value = '';
    get genderOptions() {
        return [
            { label:'Male', value:'Male'},{ label:'Female', value:'Female'},{ label:'Transgender', value:'Transgender'},
        ];
    }

    value = '';
    get nationalityOptions() {
        return [
            { label:'Indian', value:'Indian'},{ label:'Other', value:'Other'},
        ];
    }

   
}