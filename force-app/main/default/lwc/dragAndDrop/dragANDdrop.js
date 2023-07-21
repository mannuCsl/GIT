import { LightningElement ,track, api} from 'lwc';

export default class DragANDdrop extends LightningElement {
     @track dragStart;
     @api elementList=[]; 
     @api elementListVisible;
     
     @api handleGetData(getArray){
          this.dispatchEvent( new CustomEvent("progressvaluechange", {detail: getArray}));
          this.elementList = getArray;
          for(var i=0; i<this.elementList.length; i++){
               this.elementListVisible = true;
               if(this.elementList.length >26){
                    this.elementList[i].icon = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+i+"%7Cf88962%7C000000";
               }
               else{
                    const letter = String.fromCharCode(i + 'A'.charCodeAt(0));
                    this.elementList[i].icon = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+letter+"%7Cf88962%7C000000";
               }              
          }
     }
     
     DragStart(event) {
          this.dragStart = event.target.title;
          event.target.classList.add("drag");
     }

     DragOver(event) {
          event.preventDefault();
          return false;
     }

     Drop(event) {
          event.stopPropagation();
          const DragValName = this.dragStart;
          const DropValName = event.target.title;
          if (DragValName === DropValName) {
               return false;
          }
          const currentIndex = DragValName;
          const newIndex = DropValName;
          Array.prototype.move = function (from, to) {
               this.splice(to, 0, this.splice(from, 1)[0]);
          };
          this.elementList.move(currentIndex, newIndex);
          this.indexnum = newIndex; 
          this.setIndex();   
     }

     removeElement(event) {
          var elmnt=event.target.value; 
          this.elementList = this.elementList.filter(item => item.Name !== elmnt.Name);          
          //this.elementListVisible = false;
          this.dispatchEvent( new CustomEvent("progressvaluechangeremoveelement", {detail: this.elementList}));          
          this.setIndex();           
     }

     setIndex(){
          this.elementList.forEach((Element,index)=>{
               if(this.elementList.length >26){
                    this.elementList[index].icon = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+index+"%7Cf88962%7C000000";
               }
               else{
                    const letter = String.fromCharCode(index + 'A'.charCodeAt(0));
                    Element.icon = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+letter+"%7Cf88962%7C000000";
               }               
          });
     }        
}