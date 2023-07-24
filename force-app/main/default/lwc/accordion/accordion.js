import { LightningElement, track } from 'lwc';

export default class Accordion extends LightningElement {

    @track isOpen = true;
    iconName='utility:chevronup';
    isLoading = false;

    get containerStyle() {
     var five=500;
        return `max-height: ${this.isOpen ? five+'px' : '0px'}; transition: max-height 1s ease-in-out; background-color: antiquewhite; border-radius: 10px;`;
    }

    handleToggleClick() {
     this.isLoading =  !this.isLoading;
     console.log('isLoading: ',this.isLoading)
          this.isOpen = !this.isOpen;
          if(this.isOpen){
               this.iconName='utility:chevronup'; //up
          }
          else{
               this.iconName='utility:chevrondown'; //down
          }
     }
     items = [{name: 'A1', id: 1}, {name: 'A2', id: 2}, {name: 'A3', id: 3},{name: 'A4', id: 4},{name: 'A5', id: 5}]





//      activeSections = ['A', 'C'];
//     activeSectionsMessage = '';

//     handleSectionToggle(event) {
//      console.log('activeSections: ',this.activeSections);

//         const openSections = event.detail.openSections;
//         console.log('openSections: ',openSections);

//         console.log('if==',openSections.length === 0);
//         console.log('openSections.length: ',openSections.length);
        
//         if (openSections.length === 0) {
//             this.activeSectionsMessage = 'All sections are closed';
//             console.log('in if activeSectionsMessage: ',this.activeSectionsMessage);

//         } else {
//             this.activeSectionsMessage =
//                 'Open sections: ' + openSections.join(', ');
//                 console.log('in else activeSectionsMessage: ',this.activeSectionsMessage);
//                }
//     }
}