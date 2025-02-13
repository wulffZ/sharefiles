# sharefiles

uploading anything you need, powered by svelte.

## Setup
1. Edit the .env.example file to .env and change the values to your own if needed.
2. Build the docker file using `docker build -t sharefiles` then, run it `docker run -p 5173:5173 sharefiles`
or alternatively, you can use docker-compose to run the application.

### Pocketbase
Visit `http://0.0.0.0:8090/_/` where you will be greated with a register screen.
1. Create a super user account.
2. Import pb_schema.json from the repo.

You're done! sharefiles is now up and running on `localhost:5173`

## Issues

If you encounter any issues, or have general feedback for the application, you can create an issue

Please structure them properly, and include logs or steps to reproduce.
