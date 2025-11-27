use axum::{
    routing::{get, get_service},
    Json, Router,
};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::services::ServeDir;

#[derive(Serialize)]
struct Chore {
    id: u64,
    task: String,
    #[serde(rename = "assignedTo")]
    assigned_to: String,
    #[serde(rename = "dueDate")]
    due_date: String,
    completed: bool,
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        // A route for our API
        .route("/api/chores", get(get_chores))
        // A fallback service that serves files from the 'public' directory
        .fallback_service(get_service(ServeDir::new("public")));

    // Define the address to listen on.
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("--> Listening on http://{}", addr);

    // Run the server.
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn get_chores() -> Json<Vec<Chore>> {
    let chores = vec![
        Chore {
            id: 1,
            task: "Clean kitchen".to_string(),
            assigned_to: "Alex".to_string(),
            due_date: "2023-06-15".to_string(),
            completed: false,
        },
        Chore {
            id: 2,
            task: "Take out trash".to_string(),
            assigned_to: "Sam".to_string(),
            due_date: "2023-06-14".to_string(),
            completed: true,
        },
    ];
    Json(chores)
}
