import { LightningElement, track} from 'lwc';

export default class Game extends LightningElement {
    inputValue;
    @track runningValue=0;
    intervalId=null;
    startDisabled;
    imageUrl = 'https://cloudsciencelabs-a-dev-ed--c.vf.force.com/resource/1682947549000/StopBlueBullForGame';//stop   //'https://thumbs.gfycat.com/HiddenJaggedBoubou-size_restricted.gif';    //https://cdn4.vectorstock.com/i/1000x1000/30/58/cute-rabbit-cartoon-vector-1253058.jpg'; 
    @track progressValue = 0;
    isCssLoaded = false;
    visiblePopUp = false;
    progrsBarVisible;
    @track bullImgPosition = 0;
    @track cactusMarginLeft = 375;
    @track firstCactusTreePosition = this.cactusMarginLeft;

   
    
    @track clickedText = 'Name...';
   // @track textPosition = '';
    @track clientTop = 80;
    @track clientLeft = 660;
    @track speed = 0;

    onchangeYourNameHandler(event){
        this.clickedText = event.target.value;
    }
    onchangeSpeedHandler(event){
        this.speed = event.target.value;
    }
    // get textPosition(){
    //     return `top: ${this.clientTop}px; left: ${this.clientLeft}px;`;
    // }
    handleClick(event) {
        const containerRect = this.template.querySelector('.click-container').getBoundingClientRect();
        const clientX = event.clientX - containerRect.left;
        const clientY = event.clientY - containerRect.top;
        this.clickedText = `Clicked at (${clientX}, ${clientY})`;
        this.textPosition = `top: ${clientY}px; left: ${clientX}px;`;
    }
    abc;
    startbutton(event){
        console.log('enter: ',this.clientLeft)
        var sakingCactus = true;
        this.abc=setInterval(() => {
            if(this.clientLeft <= 1320 && sakingCactus){
                this.clientLeft --;
                if(this.clientLeft == 0){
                    sakingCactus = false;
                }                 
            }         
            if(this.clientLeft >= 0 && !sakingCactus){
                this.clientLeft ++; 
                if(this.clientLeft == 1320){
                    sakingCactus = true;
                }
            }
        }, this.speed);
    }
    stopIt(){
        clearInterval(this.abc);
    }


    




    playHandler(event){
        this.visiblePopUp = true;
        this.animateProgress();
    }

    get imageStyle() {
        return `position: relative; top: ${this.bullImgPosition}px;margin-bottom: -10px; margin-left: ${this.runningValue}px`;
    }
    get firstCactusTreeStyle(){
        return `position: relative;margin-top: -22px;max-width: 30px; margin-left: ${this.firstCactusTreePosition}px`;
    }
    oppositeRunValue(){
        var sakingCactus = true;
        this.OppIntervalId = setInterval(() => {  
            console.log('this.firstCactusTreePosition: ',this.firstCactusTreePosition)  
            console.log('if== ',this.firstCactusTreePosition <= this.cactusMarginLeft && sakingCactus)       
            if(this.firstCactusTreePosition <= this.cactusMarginLeft && sakingCactus){
                this.firstCactusTreePosition --;
                if(this.firstCactusTreePosition == 0){
                    sakingCactus = false;
                }                 
            }         
            if(this.firstCactusTreePosition >= 0 && !sakingCactus){
                this.firstCactusTreePosition ++; 
                if(this.firstCactusTreePosition == this.cactusMarginLeft){
                    sakingCactus = true;
                }
            }
        },20);
    }


    animateProgress() {
        this.progrsBarVisible = true;
        setInterval(() => {
            if (this.progressValue >= 100) {
                clearInterval();
                this.progrsBarVisible = false;
            } else {
                this.progressValue += 1;
            }
        }, 10);
    }

    startkHandler(){
        this.imageUrl= 'https://i.pinimg.com/originals/f3/72/8c/f3728cc94347d5a59e1a81bf8d5c4a52.gif';//running
        this.oppositeRunValue();
        //this.startDisabled = true;          
        this.intervalId = setInterval(() => { 
            console.log('this.runningValue: ',this.runningValue)
            this.runningValue ++; 
            if(this.runningValue != 0){
                //this.template.querySelector('.imgStyle').style.marginLeft =  this.runningValue+ '%';
                if(this.runningValue >= 1440){
                    this.stopkHandler();
                }
                if(this.runningValue >= 115 && this.runningValue <= 230 && this.bullImgPosition == 0 || this.runningValue >= 510 && this.runningValue <= 628 && this.bullImgPosition == 0 ||
                    this.runningValue >= 822 && this.runningValue <= 938 && this.bullImgPosition == 0){
                    this.restartHandler();
                }
                if(this.runningValue == 765){
                   //this.stopkHandler();
                }
            }               
        },10);        
    }

    jumpHandler(event){
        setTimeout(() =>{
            this.bullImgPosition += 30;//down
            this.runningValue += 10;
            console.log('in st bullImgPosition: ',this.bullImgPosition)
        },800);
        this.bullImgPosition -= 30;
        this.runningValue += 10;
        console.log('bullImgPosition: ',this.bullImgPosition)
    }   
    
    stopkHandler(){
        clearInterval(this.intervalId);
        clearInterval(this.OppIntervalId);
        //this.startDisabled = false;
        this.imageUrl= 'https://cloudsciencelabs-a-dev-ed--c.vf.force.com/resource/1682947549000/StopBlueBullForGame';//stop         
    }

    restartHandler() {
        clearInterval(this.OppIntervalId);
        clearInterval(this.intervalId);
        this.firstCactusTreePosition = this.cactusMarginLeft;
        this.runningValue=0;
        this.startDisabled = false;
        this.imageUrl= 'https://cloudsciencelabs-a-dev-ed--c.vf.force.com/resource/1682947549000/StopBlueBullForGame';//stop 
    }

    closeModal() {
        this.visiblePopUp = false;    
    }
}