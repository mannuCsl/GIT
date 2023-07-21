@isTest
public class TestVerifyDate {
    @isTest static void checkDate(){
        Date startDate =Date.newInstance(2022, 9, 14);
        Date st =Date.newInstance(2022, 10, 1);
        Date re = VerifyDate.CheckDates(startDate, st );
        //System.assertEquals(startDate, celsius); 
        }
        @isTest static void checkDate1(){
        Date startDate =Date.newInstance(2022, 9, 14);
        Date st =Date.newInstance(2022, 10, 1);
        Date re = VerifyDate.CheckDates(st, startDate );

    }
      //@isTest static void checkDate2(){
       // Date startDate =Date.newInstance(2022, 9, 14);
        //Date re = VerifyDate.SetEndOfMonthDate(startDate );

      //}
  }