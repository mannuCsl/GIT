@isTest
 public class CowinHomeControllerTest {   
     static testmethod void testsample(){  
         Date startDate =Date.newInstance(2022, 9, 14);
         Test.startTest();
         
         String body = '{"sessions":[{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"21e2fb21-559b-4d0a-b5db-599c8f20ea15","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":12,"max_age_limit":44,"allow_all_age":false,"vaccine":"CORBEVAX","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"10ca88d0-9ae9-4895-870e-5f0b9168ea1c","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1094546,"name":"Yadav Nagar Swaroop Nagar out","address":"Yadav Nagar ","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"3390fc36-7a08-451b-b930-94344f3c4727","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]}]}';
         Test.setMock(HttpCalloutMock.class, new CowinHomeMock(200, body));        
         CowinHomeController.cowinDataSorting('250001', startDate);
         
         Test.stopTest();
    }
     static testmethod void testsamples(){  
         Date startDate =Date.newInstance(2022, 9, 14);
         Test.startTest();
         
         String body = '{"sessions":[{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"21e2fb21-559b-4d0a-b5db-599c8f20ea15","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":12,"max_age_limit":44,"allow_all_age":false,"vaccine":"CORBEVAX","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"10ca88d0-9ae9-4895-870e-5f0b9168ea1c","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1094546,"name":"Yadav Nagar Swaroop Nagar out","address":"Yadav Nagar ","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"3390fc36-7a08-451b-b930-94344f3c4727","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]}]}';
         Test.setMock(HttpCalloutMock.class, new CowinHomeMock(201, body));        
         CowinHomeController.cowinDataSorting('250001', startDate);
         
         Test.stopTest();
    }
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     static testmethod void nextmethod1(){  
         Cowin_PinCode__c cp = new Cowin_PinCode__c();
         cp.Name='Babu lal school tikri khurd';
         cp.Pin_Code__c =250001;
         
         insert cp;
         
         Cowin_Data__c cow = new Cowin_Data__c();
         cow.Cowin_PinCode__c =cp.Id;
         cow.Name='Test';
         cow.Session_Id__c ='21e2fb21-559b-4d0a-b5db-599c8f20ea15';
         
         Insert cow;  
         
         Date startDate =Date.newInstance(2022, 9, 14);
         String session_id ='21e2fb21-559b-4d0a-b5db-599c8f20ea15';
         
         Test.startTest(); 
         
         String body = '{"sessions":[{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"21e2fb21-559b-4d0a-b5db-599c8f20ea15","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":12,"max_age_limit":44,"allow_all_age":false,"vaccine":"CORBEVAX","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"10ca88d0-9ae9-4895-870e-5f0b9168ea1c","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1094546,"name":"Yadav Nagar Swaroop Nagar out","address":"Yadav Nagar ","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"3390fc36-7a08-451b-b930-94344f3c4727","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]}]}';
         Test.setMock(HttpCalloutMock.class, new CowinHomeMock(200, body));         
         CowinHomeController.saveCowinRecord('250001', startDate, session_id);
         
         Test.stopTest();
   }
     
     
      static testmethod void nextmethod2(){ 
          Cowin_PinCode__c cp = new Cowin_PinCode__c();
          cp.Name='Babu lal school tikri khurd';
          cp.Pin_Code__c =250001;
          
          insert cp;
          Date startDate =Date.newInstance(2022, 9, 14);
          String session_id ='21e2fb21-559b-4d0a-b5db-599c8f20ea15';
          
          Test.startTest(); 
          
          String body = '{"sessions":[{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"21e2fb21-559b-4d0a-b5db-599c8f20ea15","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":12,"max_age_limit":44,"allow_all_age":false,"vaccine":"CORBEVAX","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"10ca88d0-9ae9-4895-870e-5f0b9168ea1c","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1094546,"name":"Yadav Nagar Swaroop Nagar out","address":"Yadav Nagar ","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"3390fc36-7a08-451b-b930-94344f3c4727","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]}]}';
          Test.setMock(HttpCalloutMock.class, new CowinHomeMock(200, body));         
          CowinHomeController.saveCowinRecord('250001', startDate, session_id);
          
          Test.stopTest();
   }
     
           static testmethod void nextmethod3(){ 
               Cowin_PinCode__c cp = new Cowin_PinCode__c();
               cp.Name='Babu lal school tikri khurd';
               cp.Pin_Code__c =250001;
               
               insert cp;
               
               Date startDate =Date.newInstance(2022, 9, 14);
               String session_id ='21e2fb21-559b-4d0a-b5db-599c8f20ea15';
               
               Test.startTest(); 
               
               String body = '{"sessions":[{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"21e2fb21-559b-4d0a-b5db-599c8f20ea15","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":12,"max_age_limit":44,"allow_all_age":false,"vaccine":"CORBEVAX","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"10ca88d0-9ae9-4895-870e-5f0b9168ea1c","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1094546,"name":"Yadav Nagar Swaroop Nagar out","address":"Yadav Nagar ","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"3390fc36-7a08-451b-b930-94344f3c4727","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]}]}';
               Test.setMock(HttpCalloutMock.class, new CowinHomeMock(201, body));         
               CowinHomeController.saveCowinRecord('250001', startDate, session_id);
               
               Test.stopTest();
   }
     static testmethod void nextmethod4(){  
         Cowin_PinCode__c cp = new Cowin_PinCode__c();
         cp.Name='Babu lal school tikri khurd';
          cp.Pin_Code__c =250001;
         
         insert cp;
         /*
         Cowin_Data__c cow = new Cowin_Data__c();
         cow.Cowin_PinCode__c =cp.Id;
         cow.Name='Test';
         cow.Session_Id__c ='21e2fb21-559b-4d0a-b5db-599c8f20ea15';
         
         Insert cow; */ 
         Date startDate =Date.newInstance(2022, 9, 14);
         String session_id ='21e2fb21-559b-4d0a-b5db-599c8f20ea15';
         
         Test.startTest(); 
         
         String body = '{"sessions":[{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"21e2fb21-559b-4d0a-b5db-599c8f20ea15","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":12,"max_age_limit":44,"allow_all_age":false,"vaccine":"CORBEVAX","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"10ca88d0-9ae9-4895-870e-5f0b9168ea1c","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1094546,"name":"Yadav Nagar Swaroop Nagar out","address":"Yadav Nagar ","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"3390fc36-7a08-451b-b930-94344f3c4727","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]}]}';
         Test.setMock(HttpCalloutMock.class, new CowinHomeMock(200, body));         
         CowinHomeController.saveCowinRecord('250001', startDate, session_id);
         
         Test.stopTest();
   }
     static testmethod void nextmethod5(){  
         Cowin_PinCode__c cp = new Cowin_PinCode__c();
         cp.Name='Babu lal school tikri khurd';
          cp.Pin_Code__c =250001;
         
         insert cp;
         
         Cowin_Data__c cow = new Cowin_Data__c();
         cow.Cowin_PinCode__c =cp.Id;
         cow.Name='Test';
         cow.Session_Id__c ='21e2fb21-559b-4d0a-b5db-599c8f20ea15';
         
         Insert cow; 
         Date startDate =Date.newInstance(2022, 9, 14);
         String session_id ='21e2fb21-559b-4d0a-b5db-599c8f20ea15';
         
         Test.startTest(); 
         
         String body = '{"sessions":[{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"21e2fb21-559b-4d0a-b5db-599c8f20ea15","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":12,"max_age_limit":44,"allow_all_age":false,"vaccine":"CORBEVAX","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1097501,"name":"Babu lal school tikri khurd ","address":"Dgd narela","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"10ca88d0-9ae9-4895-870e-5f0b9168ea1c","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]},{"center_id":1094546,"name":"Yadav Nagar Swaroop Nagar out","address":"Yadav Nagar ","state_name":"Delhi","district_name":"North Delhi","block_name":"Not Applicable","pincode":110042,"from":"09:00:00","to":"14:00:00","lat":21,"long":70,"fee_type":"Free","session_id":"3390fc36-7a08-451b-b930-94344f3c4727","date":"14-09-2022","available_capacity":0,"available_capacity_dose1":0,"available_capacity_dose2":0,"fee":"0","min_age_limit":15,"allow_all_age":true,"vaccine":"COVAXIN","slots":[{"time":"09:00AM-10:00AM","seats":0},{"time":"10:00AM-11:00AM","seats":0},{"time":"11:00AM-12:00PM","seats":0},{"time":"12:00PM-02:00PM","seats":0}]}]}';
         Test.setMock(HttpCalloutMock.class, new CowinHomeMock(200, body));         
         CowinHomeController.saveCowinRecord('250001', startDate, session_id);
         
         Test.stopTest();
   }
 }