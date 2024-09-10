# Repo for the frontend of our group project

### First install node.js

### Then install vue by running
```
npm install vue
```
### Then install all the required dependencies
```
npm install [dependency]
```
### Install certificate needed to run https

Use the following (in the main project folder) to check the location of certificates (usually it's `C:\Users\usr\AppData\Local\mkcert`)

```
.\mkcert-v1.4.4-windows-amd64.exe -CAROOT
```
\
Copy `rootCA.pem` to that location (create the directory if needed) \
\
Run this in console to install the certificate (make sure you run the console in admin mode)
```
.\mkcert-v1.4.4-windows-amd64.exe -install
```
\
The certificate should now be installed!


### Then run this, while being in the project's directory
```
npm run serve
```
## Dependencies

vue-router \
pinia \
enumify \
jwt-decode 
