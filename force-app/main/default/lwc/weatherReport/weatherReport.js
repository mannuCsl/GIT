import { LightningElement, track} from 'lwc';
import weatherReportByCityName from '@salesforce/apex/WeatherReportHelper.weatherReportByCityName';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class WeatherReport extends LightningElement {
    
    @track CityName ='';
    weatherReportVisible = false;
    weatherData=[];
    dataError;

    onfocusCityName(){
      
    }

    onchangeCityName(event){
        this.CityName = event.target.value;
        console.log(this.CityName);
    }
    CityNameSearchbutton(){
        console.log('Search Before If=>>>>'+this.CityName);    
        if(this.CityName){// !== null || this.CityName !== ' '
            console.log(' Search After If=>>>>'+this.CityName);    
            weatherReportByCityName({CityName: this.CityName})
            .then(result =>{       
                console.log('result',result.clouds);                
                this.weatherData=result;
                console.log('data from apex---',this.weatherData);
                console.log('this.weatherData.coord.lat---'+this.weatherData.coord.lat);
                console.log('this.weatherData lon---'+this.weatherData.coord.lon);
                this.mapMarkers = [
                    {
                        location: {
                            Latitude: this.weatherData.coord['lat'],
                            Longitude: this.weatherData.coord['lon'],
                        },
                    },
                ];
                this.weatherReportVisible =true;
            })
            .catch(error =>{
                const evets = new ShowToastEvent({
                    title: 'Weather Report',
                    message: 'Please Fill Valid City Name',
                    variant: 'Error',              
                });
                this.dispatchEvent(evets);
                this.dataError = error;
                console.log('dataError--'+this.dataError);
                //this.CityName='';
                //this.template.querySelector('form').reset();
                this.weatherReportVisible =false;
            })       
        }
        else{
            console.log('Enter else =>>>>'+this.CityName);    
            const evet = new ShowToastEvent({
                title: 'Weather Report',
                message: 'Please Enter City Name',
                variant: 'Error',              
            });
            this.dispatchEvent(evet);
        }
    }
    CityNameclearbutton(){ 
        console.log('Before Clear=>>>>'+this.CityName);        
        this.CityName='';
        console.log('After Clear=>>>>'+this.CityName);    
        this.template.querySelector('form').reset();
        this.weatherReportVisible =false;
        //eval("$A.get('e.force:refreshView').fire();"); //fullPageRefresh
       
    }
    handleEnter(event){
        console.log('Enter handleEnter');        
        if(event.keyCode === 13){
          console.log('Enter If keycode 13');
          event.preventDefault();// Refreshhoneserokrahahai
          this.CityNameSearchbutton();
        }
      }
      
   
}