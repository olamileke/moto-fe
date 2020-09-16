### Moto-Fe

------------
Vehicle management platform front end written in Angular. Request vehicles, record maintenance issues and track request history. Users + admins. 

The backend is written in express and is available [here](https://github.com/olamileke/moto-be "here"). 

View the live application [here](https://motoapp.netlify.app "here").

To run this application locally, you must have node installed. Get that [here](https://nodejs.org "here"). You also need to have the Angular CLI installed. To do this, open up your terminal and run

```
npm install -g @angular/cli
```

This will install the latest version of the Angular CLI which will enable you to run Angular applications.

Next up, navigate into the directory of your choice on your system and clone this repository by running

```
git clone https://github.com/olamileke/moto-fe.git
```

When cloning is complete, navigate into the application directory by running

```
cd Moto-Fe
```

At this point, we need to install all the packages needed by the app to run. Do this by running

```
npm install
```

This will install all the packages defined in the package.json file in the application root.

Navigate to the src/environments directory and set the api_url option to http://localhost:4000 or whatever url the cloned backend is running on.

Still in the terminal, run

```
ng serve
```
When the application is done compiling, access it at localhost:4200. Alternatively, you can specify the port you want the app to run at by adding a  port parameter like

```
ng serve --port 5000
```
Here the app will be available at localhost:5000.




