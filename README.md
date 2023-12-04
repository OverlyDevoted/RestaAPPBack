# RestaAPPBack 

## Databse
Docker image for database would have to get rebuilt for production at image `redis-stack-server`

### Redis Setup 
Installed docker image and connected back-end to the server.
In the server `npm install redis`

## Implemented and WIP Actions
- [x] 'establish' connection and check if register againts databaes
- [x] 'register' user accept credentials and save them in mongoDB cluster or maybe redis for more speed 
- [ ] 'qr-scanned' when user scans qr and if it's an unique qr, save it under the users scanned qrs object in the databse
- [ ] 'qr-photo' when user takes a photo with scanned qrs models. Save the action in the database if it was unique under qr-photo

### Redis
- [ ] Redis database for user data
- [ ] Redis authentication
### S3
- [ ] S3 bucket integration for image storage
