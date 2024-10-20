firstly for backend with the help of spring initializr a maven project is created where all the dependency where added. with Mysql as a databases , a databases is create with name ve3,
in application.properties file server port number, db setting and orm setting has been done.

for backend
create a database with name ve3
directly in mysql database using cmd in the admin table id and password is added.
email:akshay@gmail.com
password:akshay@123
this is one the time admin as admin can not added from server or frontend.
there are different role admin and user,
for admin -> admin can create an events,update it,delete it,also control the user profile.
for user -> user can register,update only but he can also register for event, and withdrawn from it.

for frontend
react has been use with all the dependency such as axios to interact with server,boot strap , router dom to route
firstly in terminal npx i command to used so that all the depandency will get installed
then with npx start ,start the website
after starting home page will be visible with navbar with view events , about us,registeration ,login option .
if admin login into the site two more option will be visible like to create event,edit events,and to edit user profile.
one registeration component is provided for user to register.
