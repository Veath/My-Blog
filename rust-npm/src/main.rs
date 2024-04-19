use std::env;
mod prompt;
mod args;
mod install;
mod run;


fn main() {
    prompt::handle_ctrlc();

    let args_vec: Vec<_> = env::args().collect();
    let args = args::parse_args(&args_vec[1..]);

    run::run(&args);
    println!("{:?}", args);
}
