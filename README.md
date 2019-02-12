
# Happn Android Technical Test Back-End

Back-End for Happn Android Test

### Prerequisites

You need for installing this back-end :

- NodeJS 

- MongoDB server

### Installing
  
- Start MongoDB server 
  
```
mongod
```

- Install npm dependencies
```
npm install
```  

- And then, start the server
  
```
npm start
```
### Test

- For running Postman unit tests, you should install Newmam

```
npm install -g newman
```

- For running test go to Postman folder and run this 

```
newman  run Happn-Android-Technical-Test.postman_collection.json -e happn-android-technical-test.postman_environment.json
```