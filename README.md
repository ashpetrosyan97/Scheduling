# Scheduling system
This is a simple application for planning tasks and manage them.

## Requirements 
To run this project you need 
1. Angular CLI 8.0.6
2. Node: 10.11.0
3. PostgreSQL 10 or Higher 
### Install
1.Execute ```npm install``` in root and in schedulingClient directories   
2.Replace your credentials(username/password) in config.json   
3.Since you haven't database, you should create it so enter command    
    ```sequelize db:create```   
    ```sequelize db:migrate```   
    
###Start   
1. Start server side with command    
    ```node app.js```   
2. To start client side go to schedulingClient directory and start it with command  
    ```ng serve``` or ```npm run start```      
