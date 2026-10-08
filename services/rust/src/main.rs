use serde::{Deserialize, Serialize};
use tiny_http::{Header, Method, Request, Response, Server, StatusCode};

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
struct TaskInput {
    status: String,
    priority: String,
}

#[derive(Debug, Deserialize)]
struct StatisticsRequest {
    tasks: Vec<TaskInput>,
}

#[derive(Debug, Serialize)]
struct StatisticsResponse {
    total: u32,
    completed: u32,
    #[serde(rename = "highPriority")]
    high_priority: u32,
    #[serde(rename = "completionRate")]
    completion_rate: f64,
}

fn main() {
    let server = Server::http("127.0.0.1:8082").expect("bind the statistics service");
    println!("Rust service listening on http://localhost:8082");

    for mut request in server.incoming_requests() {
        let response = handle(&mut request);
        let _ = request.respond(response);
    }
}

fn handle(request: &mut Request) -> Response<std::io::Cursor<Vec<u8>>> {
    if request.method() != &Method::Post || request.url() != "/statistics" {
        return json_response(StatusCode(404), r#"{"error":"Not found"}"#);
    }

    let mut body = String::new();
    if request.as_reader().read_to_string(&mut body).is_err() {
        return json_response(StatusCode(400), r#"{"error":"Malformed JSON"}"#);
    }

    let parsed = match serde_json::from_str::<StatisticsRequest>(&body) {
        Ok(parsed) => parsed,
        Err(_) => return json_response(StatusCode(400), r#"{"error":"Malformed JSON"}"#),
    };

    match statistics(&parsed) {
        Ok(stats) => {
            let body = serde_json::to_string(&stats).unwrap_or_else(|_| "{}".to_string());
            json_response(StatusCode(200), &body)
        }
        Err(message) => {
            let body = serde_json::json!({ "error": message }).to_string();
            json_response(StatusCode(501), &body)
        }
    }
}

fn statistics(request: &StatisticsRequest) -> Result<StatisticsResponse, &'static str> {
    let _ = &request.tasks;
    Err("Not implemented. Calculate total, completed, highPriority, and completionRate.")
}

fn json_response(status: StatusCode, body: &str) -> Response<std::io::Cursor<Vec<u8>>> {
    let header = Header::from_bytes(&b"Content-Type"[..], &b"application/json"[..]).unwrap();
    Response::from_string(body.to_string())
        .with_status_code(status)
        .with_header(header)
}
