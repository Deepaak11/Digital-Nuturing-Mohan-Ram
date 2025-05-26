import java.io.*;

public class ClassDecompiler {
    public static void main(String[] args) {
        // Path to the CFR jar
        String cfrJar = "cfr-0.152.jar"; // Update with your actual version
        // Path to the .class file you want to decompile
        String classFilePath = "YourClass.class";

        try {
            // Build the command to run CFR
            ProcessBuilder pb = new ProcessBuilder(
                    "java", "-jar", cfrJar, classFilePath
            );

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
            System.out.println("Decompilation completed with exit code: " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
