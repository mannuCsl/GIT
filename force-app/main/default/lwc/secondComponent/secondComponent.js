import { LightningElement, track, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class SecondComponent extends NavigationMixin(LightningElement) {    

  // data = [
  //   { Name: 'John', age: 25, phone: 111 },
  //   { name: 'Jane', age: 30, phone: 222 },
  //   { NAME: 'Mark', age: 35, phone: 333 },
  // ];
  // @track star ='';
  // fName = 'naME'
  

hello;

  connectedCallback(){
   this.hello = '123';
  }




  secondhandleClick(){
    this.connectedCallback();
    //this.fName = this.fName.toLowerCase();
    // console.log('dat : ', this.data);
    // console.log('fName: ',this.fName)
    // this.data.forEach(obj => {
    //   console.log('obj : ', obj);
    //   Object.keys(obj).forEach(key => {
    //     console.log('key : ', key);
    //     if (key.toLowerCase() === this.fName) {
    //       console.log('in if: ',obj[key]);
    //     }
    //   });
    // });



    // for(var i=0; i<10; i++){
    //   if(i<5){
    //     console.log('*');
    //     this.star = true;
    //   }
    //   else{
    //     console.log('#');
    //     this.star = false;
    //   }
    // }
  















    //window.localStorage.setItem('val', true);
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__navItemPage',
        //     attributes: {
        //       apiName: 'First_Component_Testing'
        //     },
        //     state:{
        //       isTrue__c : true,
        //     }           
        // });
  }


  

}