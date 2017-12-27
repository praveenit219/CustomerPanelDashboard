# CustomerPanelDashboard

This is my second project on angular4, bootstrap basics, nodejs, mongo. this contains following details

1) components <br>
a)	add client : <br>
    to add a customer in to mongo db using node and express.  <br>
b)	Client details:<br>
This is to fetch the customer details which are added from mongo <br>
c)	Clients : <br>
This is the to fetch all the customer simple details <br>
d)	Dashboard: <br>
This is to show the complete dashboard of a customer <br>
e)	Edit client: <br>
This is to update the customer details especially price and other details using 2 way data binding<br>
f)	Navigation:<br>
This is especially helps in navigating the application from one route to another and also it have a menus which will show or hide based on login and visitor status <br>
g)	Register:<br>
This application to register or onboard  admin to have special settings/ controls over the customers<br>
h)	Settings :<br>
This component will help to set some of the edit or update balance fields with respect to admin status. Also the link of settings and registration will be updated according to this<br>
i)	Side bar:<br>
This is to add some more controls from navigation like adding client and other details<br>
j)	PageNotFound:<br>
This is generic page not found if customer use any other urls or routes to access pages.<br>
2) guards<br>
A guard is a security control over the routes configured this will help to authenticate or do some processing before executing an actual routes. To say a dashboard route or url will be processed and render after login is successfully checked. This login guards helps us to do this job.<br>
3) models <br>
customer, clients, authstatus, customerResonses, Identifier, settings all these are interface to act as model to have the data flow between view controllers<br>
4) services<br>
heart of the business logic to use models to fetch update or check authentication and other details<br>

This application is small mini project which helps in utilizing all the basic features of angular4 to build a standalone bootstrap web application. Also this application internally uses api built using node.js and express to help on CRUD operations
	

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server
1)	npm install <br>

2)	Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

disclaimer : this is to learn features of angular4 and also to build development experience on angular4. it internally use node.js with express and mongo. this involves multiple books and reference from other google links.