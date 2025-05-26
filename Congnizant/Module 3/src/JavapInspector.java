import java.io.*;

public class JavapInspector {
    public static void main(String[] args) {
        // Replace this with the full path to your .class file or just the class name if it's in classpath
        String className = "YourClass";  // Do not include .class extension

        try {
            // Build the command to run javap with verbose output
            ProcessBuilder pb = new ProcessBuilder("javap", "-c", "-v", className);

            pb.redirectErrorStream(true);
            Process process = pb.start();

            // Read and print the output
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            System.out.println("\n`javap` finished with exit code: " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
