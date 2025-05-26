import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<String> students = new ArrayList<>();
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter student names (type 'stop' to finish):");
        while (true) {
            String name = sc.nextLine();
            if (name.equalsIgnoreCase("stop")) break;
            students.add(name);
        }

        System.out.println("Student List:");
        for (String name : students) {
            System.out.println(name);
        }
    }
}
