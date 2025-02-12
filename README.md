# sharefiles

uploading anything you need, powered by svelte.

## Setup
Build the docker file using `docker build -t sharefiles` then, run it `docker run -p 5173:5173 sharefiles`

### Pocketbase
Visit `http://0.0.0.0:8090/_/` where you will be greated with a register screen. 
1. Create a super user account.
2. Import pb_schema.json from the repo.

You're done! sharefiles is now up and running on `localhost:5173`

## Issues

If you encounter any issues, or have general feedback for the application, you can create an issue

Please structure them properly, and include logs or steps to reproduce.
