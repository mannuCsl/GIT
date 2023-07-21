public class ClassForLeads {
    public static void cloneLead(List<Lead> lidlist){
        List<Lead> llist = new List<Lead>();
        for(Lead lid: lidlist){
            Lead lee = new Lead();
            lee.LastName = lid.LastName;
            lee.Company = lid.Company;
            llist.add(lee);
        }
        Insert llist;
    }

}