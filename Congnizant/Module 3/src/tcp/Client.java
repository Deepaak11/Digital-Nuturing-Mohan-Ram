import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 5000);
        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        String msg;
        while (!(msg = userInput.readLine()).equalsIgnoreCase("exit")) {
            output.println(msg);
            System.out.println("Server: " + input.readLine());
        }

        socket.close();
    }
}
