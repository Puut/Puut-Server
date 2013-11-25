#Puut-Server

[![Build Status](https://travis-ci.org/Puut/Puut-Server.png?branch=master)](https://travis-ci.org/Puut/Puut-Server)
[![Build Status](https://drone.io/github.com/Puut/Puut-Server/status.png)](https://drone.io/github.com/Puut/Puut-Server/latest)
[![Code Climate](https://codeclimate.com/github/Puut/Puut-Server.png)](https://codeclimate.com/github/Puut/Puut-Server)

This is the Puut server. Puut is a decentral and quick screenshot sharing service. You have to deploy this on a server with the ability to run `nodejs`. It offers a small uploading interface by itself but is intended for use with the OS-specific clients you can find [here](https://github.com/Puut).

## Setup

You have to have `nodejs` and `imagemagick` installed. Do this via your preferred packet manager on your server but beware that Ubuntu by now does not include the newest version of `nodejs` in their package sources, which might be an issue. If you encounter errors running Puut, try updating `nodejs`.
Now clone this repo to wherever you want via `git clone https://github.com/Puut/Puut-Server.git`. Go into the new directory and run `npm install` there, all dependencies will be downloaded automatically. Copy `config.example.json` to `config.json`.

You may now change the config of Puut, by setting the PORT environment variable (`export PORT=12345`) or changing the values in `config.json`.

If this is not done, Puut will run on Port 3000 by default.

Now change the user credentials in `config.json`. You have to enter this credentials in your client later.

Start the server by typing `npm start` in the terminal.

### Setup on a Uberspace
This chapter deals with the installation of Puut server on a uberspace, a neat webserver provided by [uberspace.de](https://uberspace.de/).

First perform an installation as described above. You may want a port in the firewall to be opened for your server. This can be done by simply mailing the uberspace team and requesting a port.
Another way is to add a subdomain and forward the port internally:
Create a folder for the subdomain by typing `mkdir /var/www/virtual/$USER/puut.$USER.$HOST.uberspace.de` (replace $USER with username and $HOST with hostname).
Create a `.htaccess` there and fill it with 

	RewriteEngine On
	RewriteRule (.*) http://localhost:3000/$1 [P]
and save it. Maybe you have to adjust the port for the server and in the .htaccess as the port 3000 is already in use.

Configuration as a daemon:
Now it gets interesting. Do you want your Puut-Server to start automatically and even be restarted if it crashed? Then read on!

If you haven't done this before, run `uberspace-setup-svscan` once
`cd` into your Puut-Server directory. Create a file called `run`. It should contain:

	#!/bin/sh
	export PORT=3001
  	cd ~/Puut-Server
	exec npm start 2>&1
This ensures that your server is always running on the same port by setting $PORT before launching the server. You may have to adjust the path to the server.

Now create a `log` directory and create a `run` file there containing

	#!/bin/sh
	exec multilog t ./main
This enables logging of output.
Make both scripts executable and symlink this folder to `~/service/Puut-Server` by running `ln -s ~/Puut-Server ~/service/Puut-Server`.

You're done now. Enjoy Puut!

### Tests

Tests can be run either by `grunt test`, `npm test` or `make test`.
If you see the error message "File not supported" please update ImageMagick on your system.
