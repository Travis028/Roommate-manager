--- a/src/main.rs
+++ b/src/main.rs
@@ -1,3 +1,20 @@
-fn main() {
-    println!("Hello, world!");
+use axum::{routing::get_service, Router};
+use std::net::SocketAddr;
+use tower_http::services::ServeDir;
+
+#[tokio::main]
+async fn main() {
+    // Define the router that will serve files from the 'public' directory.
+    // `ServeDir` is a service that serves files from a directory.
+    // `nest_service` applies this service to all requests starting with "/".
+    let app = Router::new().nest_service("/", get_service(ServeDir::new("public")));
+
+    // Define the address to listen on.
+    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
+    println!("--> Listening on http://{}", addr);
+
+    // Run the server.
+    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
+    axum::serve(listener, app).await.unwrap();
 }

