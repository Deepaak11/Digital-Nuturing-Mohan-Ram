import java.util.*;

public class LambdaSort {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("Banana", "Apple", "Mango", "Cherry");

        Collections.sort(list, (a, b) -> a.compareTo(b));

        System.out.println("Sorted List:");
        list.forEach(System.out::println);
    }
}
