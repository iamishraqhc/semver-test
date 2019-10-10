# 7m-mos-gateway

On-premises service for communication with automation systems (Mosart) via the MOS protocol

Scripts

npm run start:

When this start script is executed, at first the file to start the app is generated with the generate script and then the app starts running.

## Description about the other scripts will be given shortly

Information regarding other scripts..

## How to have a secured https conenction

At first, install openssl for the specific OS you are using.
Next, run the command below: 
openssl req -nodes -new -x509 -keyout cert.key -out cert.pem

Then the command window will bring up some fields to fill up such as:
-Country Name
-State/Province
-Locality Name(City)
-Organization Name

You can leave all of these empty.
But after that, there comes Common Name and here you need to set it to localhost 
And add email address to the next field. Then the two files wiil be generated.

Create a folder within the project directory and name it "security" and keep the two generated files here in this folder.

Before starting the app, go to the config/dev.json and config/prod.json and add enableHTTPS like the one below

"http": {
    "port": 5000,
    "enableHTTPS: 'true'
  },

Then start the app and then in the browser, add https:// before the url
