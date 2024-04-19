use std::env;
use std::path::{PathBuf, Path};
use std::process::exit;

use path_absolutize::Absolutize;

#[derive(Debug)]
pub struct AppArgs {
  pub script_name: String,
  pub forwarded: String,
  pub change_dir: PathBuf,
  pub command: String,
  pub interactive: bool, 
}

pub const COMMANDS_TO_FORWARD: &[&str] = &["install", "i", "add", "remove", "uninstall"];


pub fn parse_args(args_vec: &[String]) -> AppArgs {
  let mut args_iter = args_vec.iter();

  let mut args = AppArgs {
    script_name: "".to_string(),
    change_dir: PathBuf::from(env::current_dir().as_ref().unwrap()),
    forwarded: "".to_string(),
    command: "".to_string(),
    interactive: false,
  };

  loop {
    let arg = args_iter.next();

    match arg {
        Some(v) => {
          if v == "--" {
            args.forwarded.push(' ');
            args.forwarded.push_str(args_iter.as_slice().join(" ").as_str());
            break;
          }

          if v.starts_with('-') {
            if args.script_name.is_empty() && (args.command.is_empty() || args.command == "run") {
              match v.as_str() {
                "-c" => {
                  let dir = match args_iter.next() {
                      Some(v) => PathBuf::from(Path::new(v).absolutize().unwrap()),
                      None => {
                        eprintln!("Error: -c requires a directory");
                        exit(1);
                      }
                  };
                  if !dir.exists() {
                    eprintln!("Error: Directory does not exist");
                    exit(1);
                  }
                  args.change_dir = dir;
                }
                "-i" | "--interactive" => {
                  args.interactive = true;
                }
                "-h" | "--help" => {
                  println!("{}", get_help());
                  exit(0);
                }
                "-v" | "--version" => {
                  println!("{}", get_version());
                  exit(0);
                }
                _ => {
                  println!("Unknown flag: {}", v);
                  exit(1);
                }
              }
            } else {
              args.forwarded.push(' ');
              args.forwarded.push_str(v);
            }
          } else if args.command.is_empty() &&  (COMMANDS_TO_FORWARD.contains(&v.as_str()) || v == "run") {
            args.command = match v.as_str() {
              "i" => "install".to_string(),
              _ => v.to_string(),
            }
          } else if (args.command.is_empty() || args.command == "run") && args.script_name.is_empty() {
            args.command ="run".to_string();
            args.script_name = match v.as_str() {
              "i" => "install".to_string(),
              _ => v.to_string(),
            }
          } else {
            if args.interactive {
              eprintln!("Error: -i/--interactive can only be used with the run command");
              exit(1);
            }

            args.forwarded.push(' ');
            args.forwarded.push_str(v);
          }
        }
        None => {
          break;
        }
    }
  }

  args
}

fn get_version() -> String {
  env!("CARGO_PKG_VERSION").to_string()
}

pub fn get_help() -> String {
  format!(
      "\
dum v{}

USAGE:
  dum [OUR_FLAGS] [SCRIPT_NAME] [SCRIPT_ARGS]

COMMANDS:
  <script_name>      Run an npm script (like npm run) or a script in node_modules/.bin (like npx)
  run                Show a list of available scripts
  run <script_name>  Run an npm script
  add <packages>     Add packages to the current project
  i, install         Install dependencies
  remove <packages>  Remove packages from the current project
  t, test            Run test script in nearest package.json
  [script]           Run scripts in nearest package.json

FLAGS:
  -c <dir>              Change working directory
  -i, --interactive     Interactive mode
  -h, --help            Prints help information
  -v, --version         Prints version number
",
      get_version()
  )
}
