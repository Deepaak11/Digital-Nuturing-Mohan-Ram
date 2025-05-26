import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(5000);
        System.out.println("Server started...");
        Socket socket = server.accept();

        BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

        String msg;
        while ((msg = input.readLine()) != null) {
            System.out.println("Client: " + msg);
            output.println("Server Echo: " + msg);
        }

        socket.close();
        server.close();
    }
}
