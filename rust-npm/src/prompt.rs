use dialoguer::console::Term;
use dialoguer::{theme::ColorfulTheme, Input, Select};
use std::process::exit;

fn show_cursor() {
  Term::stderr().show_cursor().unwrap();
}
 pub fn handle_ctrlc() {
  ctrlc::set_handler(|| {
    show_cursor();
    exit(1);
  }).unwrap()
 }

 pub fn select(message: &str, script_names: Vec<&str>) -> Option<String> {
  let selection = Select::with_theme(&ColorfulTheme::default())
      .with_prompt(message)
      .items(&script_names)
      .default(0)
      .interact_on_opt(&Term::stderr())
      .ok()?;

  show_cursor();

  Some(script_names[selection.unwrap()].to_string())
}

pub fn input(message: &str) -> Option<String> {
  let input = Input::<String>::new()
      .with_prompt(message)
      .allow_empty(true)
      .with_initial_text("")
      .interact_text_on(&Term::stderr())
      .ok();

  show_cursor();

  input
}
