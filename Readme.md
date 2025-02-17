To run the project

Step 1:
Installing Dependancies
for installing dependancies type the following commands in the directory ...\job portal\backend> npm install
and in the directory ...\job portal\frontend> npm install

Step 2:
Create a .env file in backend directory

Step 3:
add the following enviroment variables to the file with their corresponding values<br/> 

PORT = 8080<br/> 

MONGO_URI = "url" //localhost or mongodb atlas<br/>

SECRET_KEY =<SECRET_KEY> // you will get it by registering on a cloudinary website<br/>

EMAIL = --email--<br/>

EMAIL_PASSWORD = --password--<br/>

Step 4:
After installing all dependancies and creating enviroment variable folder type the following commands in the directory ...\job portal\backend>npm run dev in the directory ...\job portal\client\client>npm run start