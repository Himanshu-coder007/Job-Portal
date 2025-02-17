To run the project

Step 1:
Installing Dependancies
for installing dependancies type the following commands in the directory ...\job portal\backend> npm install
and in the directory ...\job portal\frontend> npm install

Step 2:
Create a .env file in backend directory

Step 3:
add the following enviroment variables to the file with their corresponding values 
PORT = 8080 
MONGO_URI = "url" //localhost or mongodb atlas
SECRET_KEY =<SECRET_KEY> // you will get it by registering on a cloudinary website
EMAIL = --email-- 
EMAIL_PASSWORD = --password--

Step 4:
After installing all dependancies and creating enviroment variable folder type the following commands in the directory ...\job portal\backend>npm run dev in the directory ...\job portal\client\client>npm run start