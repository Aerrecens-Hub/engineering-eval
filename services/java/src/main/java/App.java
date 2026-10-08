import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class App {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 8081), 0);
        server.createContext("/metrics", App::handleMetrics);
        server.start();
        System.out.println("Java service listening on http://localhost:8081");
    }

    private static void handleMetrics(HttpExchange exchange) throws IOException {
        if (!"POST".equals(exchange.getRequestMethod())) {
            writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }

        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8).trim();
        if (body.isEmpty() || !body.startsWith("{") || !body.endsWith("}")) {
            writeJson(exchange, 400, "{\"error\":\"Malformed JSON\"}");
            return;
        }

        try {
            writeJson(exchange, 200, metrics(body));
        } catch (UnsupportedOperationException exception) {
            writeJson(
                exchange,
                501,
                "{\"error\":\"Not implemented. Group tasks by projectId and calculate total, completed, and completionRate.\"}"
            );
        }
    }

    /**
     * Parse the request into {@link MetricsRequest} and return project metrics.
     * A task is completed only when its status is {@code done}.
     */
    static String metrics(String body) {
        throw new UnsupportedOperationException("not implemented");
    }

    private static void writeJson(HttpExchange exchange, int status, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(bytes);
        }
    }
}

record TaskInput(String projectId, String status) {}

record MetricsRequest(List<TaskInput> tasks) {}

record ProjectMetrics(int total, int completed, double completionRate) {}
