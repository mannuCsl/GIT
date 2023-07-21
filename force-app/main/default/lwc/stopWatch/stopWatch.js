import { LightningElement, track} from 'lwc';

export default class StopWatch extends LightningElement {  

//  progressBar = document.getElementById("bar");
//  loadingMsg = document.getElementById("loading");
//  barWidth = 0;

// animate = () => {
//   this.barWidth++;
//   this.progressBar.style.width = `${this.barWidth}%`;
//   setTimeout(() => {
//     this.loadingMsg.innerHTML = `${this.barWidth}% Completed`;
//   }, 10100);
// };

// // animation starts 2 seconds after page load
// connectedCallback(){
// setTimeout(() => {
//   let intervalID = setInterval(() => {
//     if (this.barWidth === 100) {
//       clearInterval(intervalID);
//     } else {
//       this.animate();
//     }
//   }, 100); //this sets the speed of the animation
// }, 2000);
// }

     


/////////////////////////////////////////////////////////////////////////////stopWatch///////////////////////////////////

  displayTime = '00:00:00';
  intervalId = null;
  startTime = null;
  elapsedTime = 0;

  startTimer() {
    this.startTime = Date.now() - this.elapsedTime;
    this.intervalId = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      const minutes = Math.floor(this.elapsedTime / 60000);
      const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
      const milliseconds = this.elapsedTime % 1000;
      this.displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
    }, 10);
  }

  handleStart() {
    this.startTimer();
  }

  handleStop() {
    console.log('intervalId >> ',this.intervalId)
    clearInterval(this.intervalId);
  }

  handleReset() {
    clearInterval(this.intervalId);
    this.elapsedTime = 0;
    this.displayTime = '00:00:00';
    console.log('elapsedTime >> ',this.elapsedTime)

  }
/////////////////////////////////////////////////////////////////////////////stopWatch///////////////////////////////////

//<!--################################################# Number Incrementer #################################################-->

// displayNumber = 0;
//   intervalId = null;

//   startIncrement() {
//      console.log('##enter startIncrement##');
//     this.intervalId = setInterval(() => {
//           console.log('before displayNumber: ',this.displayNumber);
//           this.displayNumber++;
//           console.log('after displayNumber: ',this.displayNumber);
//     }, 1000);
//   }

//   handleStart() {
//      console.log('call startIncrement: ',this.displayNumber);
//     this.startIncrement();
//   }

//   handleStop() {
//      console.log('handleStop call clearInterval: ',clearInterval);
//      //console.log('JSON clearInterval: ',JSON.parse(JSON.stringify(clearInterval)));
//     clearInterval(this.intervalId);
//     //console.log('WITH VALUE clearInterval: ',clearInterval(this.intervalId));
//   }

//   handleReset() {
//     clearInterval(this.intervalId);
//     this.displayNumber = 0;
//   }
  //<!--################################################# Number Incrementer #################################################-->

}