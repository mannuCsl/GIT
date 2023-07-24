import { LightningElement, track, wire} from 'lwc';

// import {getRecord} from 'lightning/uiRecordApi';
// import USER_ID from '@salesforce/user/Id';
// import NAME_FIELD from '@salesforce/schema/User.Name';
// import EMAIL_FIELD from '@salesforce/schema/User.Email';

   

export default class ClickAndGetPosition extends LightningElement {
    @track yourName = 'Name...';
    @track clientTop = 80;//max 177px; min 0px;
    @track clientLeft = 660;
    @track speed = 0;
    abc;
    @track clientTop1 = 90;//max 177px; min 0px;
    @track clientLeft1 = 690;
    @track clientTop2 = 70;//max 177px; min 0px;
    @track clientLeft2 = 630;
    @track clientTop3 = 60;//max 177px; min 0px;
    @track clientLeft3 = 600;





    // @track error ;
    // @track email ; 
    // @track name;
    // @wire(getRecord, {recordId: USER_ID, fields: [NAME_FIELD, EMAIL_FIELD]})
    // wireuser({ error, data}) {
    //     if (error) {
    //        this.error = error ; 
    //     } else if (data) {
    //         this.email = data.fields.Email.value;
    //         this.name = data.fields.Name.value;
    //         console.log('name: ',this.name);
    //         console.log('email: ',this.email);
    //         console.log('Id : ', data.fields.Id);
    //         console.log('Id : ', USER_ID);
    //     }
    // }














    onchangeYourNameHandler(event){
        this.yourName = event.target.value;
    }

    onchangeSpeedHandler(event){
        this.speed = event.target.value;
    }
    
    get textPosition(){
        return `top: ${this.clientTop}px; left: ${this.clientLeft}px; background: rgb(148, 152, 146); width: 70px; height: 70px;`;
    }
    get textPosition1(){
        return `top: ${this.clientTop1}px; left: ${this.clientLeft1}px; background: red; width: 55px; height: 55px;`;
    }
    // get textPosition2(){
    //     return `top: ${this.clientTop2}px; left: ${this.clientLeft2}px; background: green; width: 40px; height: 40px;`;
    // }
    // get textPosition3(){
    //     return `top: ${this.clientTop3}px; left: ${this.clientLeft3}px; background: blue; width: 25px; height: 25px;`;
    // }






    // handleClick(event) {
    //     const containerRect = this.template.querySelector('.click-container').getBoundingClientRect();
    //     const clientX = event.clientX - containerRect.left;
    //     const clientY = event.clientY - containerRect.top;
    //     this.yourName = `Clicked at (${clientX}, ${clientY})`;
    //     this.textPosition = `top: ${clientY}px; left: ${clientX}px;`;
    // }

    startbutton(){
        console.log('enter: ',this.clientLeft);
        console.log('speed: ',this.speed);
        var sakingCactus = true;
        var isUpDown = true;
        var isUpDown1 = true;
        this.abc = setInterval(() => {
            console.log('before clientLeft: ',this.clientLeft,' sakingCactus: ',sakingCactus);
            if(this.clientLeft <= 1320 && sakingCactus){
                this.clientLeft --; 
                //console.log(' before top: ', this.clientTop, ' isUpDown: ',isUpDown);
                if(this.clientTop <= 117 && isUpDown){
                    this.clientTop --; //Up
                    if(this.clientTop == 0){
                        isUpDown = false;
                    }
                }                
                if(this.clientTop >= 0 && !isUpDown){
                    this.clientTop ++;//Down                    
                    if(this.clientTop == 117){
                        isUpDown = true;
                    }
                    //console.log(' top: ', this.clientTop, ' isUpDown: ',isUpDown);
                }



                //this.clientTop1--;
                if(this.clientTop1 <= 117 && isUpDown1){
                    this.clientTop1 --; //Up
                    if(this.clientTop1 == 0){
                        isUpDown1 = false;
                    }
                }                
                if(this.clientTop1 >= 0 && !isUpDown1){
                    this.clientTop1 ++;//Down                    
                    if(this.clientTop1 == 117){
                        isUpDown1 = true;
                    }
                    console.log(' top111: ', this.clientTop1, ' isUpDown1: ',isUpDown1);
                }
                
                


                if(this.clientLeft == 0){
                    sakingCactus = false;
                }                 
            }         
            if(this.clientLeft >= 0 && !sakingCactus){
                this.clientLeft ++;
                //console.log(' before top: ', this.clientTop, ' isUpDown: ',isUpDown);
                if(this.clientTop <= 117 && isUpDown){
                    this.clientTop --; //Up                    
                    if(this.clientTop == 0){
                        isUpDown = false;
                    }
                }                
                if(this.clientTop >= 0 && !isUpDown){
                    this.clientTop ++;//Down                   
                    if(this.clientTop == 117){
                        isUpDown = true;
                    }
                    //console.log(' top: ', this.clientTop, ' isUpDown: ',isUpDown);
                }
                
                if(this.clientTop1 <= 117 && isUpDown1){
                    this.clientTop1 --; //Up
                    if(this.clientTop1 == 0){
                        isUpDown1 = false;
                    }
                }                
                if(this.clientTop1 >= 0 && !isUpDown1){
                    this.clientTop1 ++;//Down                    
                    if(this.clientTop1 == 117){
                        isUpDown1 = true;
                    }
                    //console.log(' top: ', this.clientTop, ' isUpDown1: ',isUpDown1);
                }
                
                









                if(this.clientLeft == 1320){
                    sakingCactus = true;
                }







            }
        }, this.speed);
    }

    stopIt(){
        clearInterval(this.abc);
    }



}