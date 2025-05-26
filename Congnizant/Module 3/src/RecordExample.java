import java.util.List;
import java.util.stream.Collectors;

record Person(String name, int age) {}

public class RecordExample {
    public static void main(String[] args) {
        List<Person> people = List.of(
                new Person("Alice", 30),
                new Person("Bob", 20),
                new Person("Charlie", 25)
        );

        people.forEach(System.out::println);

        List<Person> adults = people.stream()
                .filter(p -> p.age() >= 25)
                .collect(Collectors.toList());

        System.out.println("Filtered Adults:");
        adults.forEach(System.out::println);
    }
}
