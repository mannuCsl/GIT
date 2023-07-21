public class RevenueAssignment {
       public static void totalAmount(List<Revenue__c> newlist){
        for(Revenue__c rev: newlist){
            rev.Total_Amount__c = rev.Quanity__c*rev.Price__c;
        }
    }
   
    public static List<Monthly_Revenue__c> createChieldRecord(List<Revenue__c> newRevenue){
        List<Monthly_Revenue__c> mRevlist = new List<Monthly_Revenue__c>();
        Map<Integer,String> monthNameMap=new Map<Integer, String>{1 =>'January',2=>'February', 3=>'March', 4=>'April', 5=>'May',6=>'June', 7=>'July', 8=>'August', 9=>'September',10=>'October',11=>'November', 12=>'December'};
        List<Monthly_Revenue__c> n =[SELECT Id FROM Monthly_Revenue__c WHERE Revenue__c IN: newRevenue]; 
        
        Delete n;
        
        for(Revenue__c rev: newRevenue){            
            Date S=rev.Start_Date__c;
            Date E=rev.End_Date__c;
            Integer i, totalMonth=S.monthsBetween(E);
            System.debug('totalMonth--'+totalMonth);
          Integer totaldays=S.daysBetween(E);
             if(totaldays==0){totaldays=1;}
        for(i=0;i<=totalMonth;i++){
            Integer monthDay=Date.daysInMonth(S.year(),S.month())-S.day()+1;
            Integer OneMonthDay=(E.day()-S.day()+1);
            if(OneMonthDay==0){OneMonthDay=1;}
            Monthly_Revenue__c mRev = new Monthly_Revenue__c();
            if(i==totalMonth){
                mRev.Name=monthNameMap.get(S.month())+' '+S.year()+' '+' '+'('+E.day()+' Days'+')';
                mRev.End_Date__c=E; 
                if(i==0){
                    mRev.Name=monthNameMap.get(S.month())+' '+S.year()+' '+' '+'('+OneMonthDay+' Days'+')';
                    mRev.End_Date__c=E; 
                }
            }
            else{
                mRev.Name=monthNameMap.get(S.month())+' '+S.year()+' '+' '+'('+monthDay+' Days'+')';
                mRev.End_Date__c=S.addDays(monthDay-1);
            }
            mRev.Monthly_Quantity__c=(rev.Quanity__c*monthDay)/totaldays;
            mRev.Price__c=rev.Price__c;
            mRev.Monthly_Amount__c=mRev.Monthly_Quantity__c*mRev.Price__c;
            mRev.Start_Date__c=S;
            mRev.Revenue__c=rev.Id;
            mRevlist.add(mRev);
            S=mRev.End_Date__c.addDays(1);
        }
    }
     return mRevlist;
 } 
}