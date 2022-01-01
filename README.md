# Folder Hierarchy
```	
mjpg-streamer (module to streaming)
backend (API to send images from mjpg-streamer to endpoint)	
    config.js (*)
image (contains images from mjpg-streamer)	
```

# Configuration
* Step 1: npm install
* Step 2: Modify all the properties in config.js to fit your machine
* Step 3: Have mjpg-streamer installed in your machine, in the same hierachical level with the repo

# NGINX Server Configuration
```
# view
server {
	listen 3006;

	#root /home/noat/Programming/streaming-main/frontend/build;
	root /home/noat/Programming/streaming-main/backend;


	index index.html index.htm index.nginx-debian.html index.html;

    # @desc server_name ${your_local_or_public_IP};
	server_name 192.168.1.137;
	#server_name 192.168.0.191;

	location / {
		try_files $uri $uri/ =404;		
		autoindex on;	
	}
}
```

# Run
After the configuration above, run this command
```
# to start mpjg-streamer
npm run streaming

# to start API
npm start
```
