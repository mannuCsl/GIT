public class followContactFromlwc {
    public static void followCon(Map<Id, Contact> newMap){
        List<EntitySubscription> olist = new List<EntitySubscription>();
        for(Contact con:newMap.values()){
            //EntitySubscription follow = new EntitySubscription(parentId = con.id, subscriberid =con.ownerid);
             //EntitySubscription unfollow = new con. deleteMember(con.Id, subscriberid =con.ownerid);
             system.debug(con);
            EntitySubscription unfollow = [SELECT id FROM EntitySubscription WHERE parentId =: con.id AND subscriberid =:UserInfo.getUserId()];
        system.debug(unfollow);
           
            
               // olist.add(unfollow);
                delete unfollow;
        }
    }
        
    }