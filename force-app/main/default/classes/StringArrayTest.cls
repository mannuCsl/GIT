public class StringArrayTest {
    public static List<String> generateStringArray(Integer n){
       List<String> arrays = new List<String>();
        for(Integer i=0;i<n;i++){
            arrays.add('Test ' + i);
            System.debug(arrays[i]);      
        }
        return arrays;
    }
}