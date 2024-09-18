use tauri_plugin_log::{Target, TargetKind};
use graphql_client::{GraphQLQuery, Response};
use reqwest;

#[allow(clippy::upper_case_acronyms)]
type DateTime = String;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/schema.graphql",
    query_path = "src/query.graphql",
    response_derives = "Debug",
)]
pub struct CreateUser;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

/*

    let client = reqwest::Client::new();
    let request_body = CreateUser::build_query(variables);

    let res = client.post("http://localhost:8686/graphql")
        .json(&request_body)
        .send().await?;    
    let response_body: Response<create_user::ResponseData> = res.json().await?;
    println!("{:#?}", response_body);
    Ok(())
*/


#[tauri::command]
async fn create_account(email: &str, password: &str, name: &str, remember_me: Vec<String>) -> Result<String, String> {
    println!("Creating account with email: {}, password: {}, name: {}, remember_me: {:?}", email, password, name, remember_me);
    let client = reqwest::Client::new();

    let variables = create_user::Variables {
        email: email.to_string(),
        password: password.to_string(),
        name: name.to_string(),
        remember_me: Some(remember_me.into_iter().map(|s| Some(s.to_string())).collect()),
    };

    let res = client.post("http://localhost:8686/graphql")
        .json(&CreateUser::build_query(variables))
        .send()
        .await
        .map_err(|err| err.to_string())?;

    let response_body: Response<create_user::ResponseData> = res.json().await.map_err(|err| err.to_string())?;
    println!("{:#?}", response_body);

    if let Some(errors) = response_body.errors {
        Err(errors[0].message.clone())
    } else {
        Ok("User created successfully".to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_log::Builder::new().targets([
            Target::new(TargetKind::Stdout),
            Target::new(TargetKind::LogDir { file_name: None }),
            Target::new(TargetKind::Webview),
        ]).build())
        .invoke_handler(tauri::generate_handler![greet, create_account])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
