<p align="center">
  <img src="public/assets/images/chef.png" width="200" height="300" alt="Foodfy"/>
</p>

<h1 align="center">
  Foodfy
</h1>

<p align="center">
   <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/LeoGomes0919/foodfy">
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/LeoGomes0919/foodfy">
  
  <a href="https://github.com/LeoGomes0919/foodfy/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/LeoGomes0919/foodfy">
  </a>
  
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

## 🕶 Overview

Foodfy is a system developed during the Bootcamp Launchbase.
The project focuses on a website for registering recipes, chefs, users having an area for the Dashboard of the application, and another for data presentation, free for all unregistered users.

## ⛏️ Technologies

Main technologies of the project:

- [Node.js](https://nodejs.org/en/)
- [Nunjucks](https://mozilla.github.io/nunjucks)
- [Sequelize](https://sequelize.org/)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)

## 🚀 Getting started

### Clone repository

Select a local directory on your machine to clone the project, then clone the project by executing the command below:
```
git clone https://github.com/LeoGomes0919/foodfy.git
```

### Initialize the project

Then open the directory in vscode and run the following command to install the project's dependencies:
```
yarn install ou npm install
```
After installing the dependencies, go to the ```src/config``` folder and open the ```database.js``` file and change the credentials of the current database to
your database credentials.

Then run the following commands:

### Create database migration and seeders

Here we create the database:
```
npx sequelize db:create
```
Here we created the migrations that are in the ```database/migrations``` folder:
```
npx sequelize db:migrate
```
Here we create the seeds that are in the ```database/seeders``` folder:
```
npx sequelize db:seed:all
```

## 👨‍💻 Run the project

After completing the steps above, run the following command:
```
yarn start ou npm start
```
Access the URL:
```
http://localhost:3000/
```

To access the administrative area, click on ```login``` in the menu.
Enter the following credential to access, and have full control of the system as admin:
```
email: admin@foodfy.com.br
password: 1234
```

## 📝 License
This project is licensed under the MIT [LICENSE](LICENSE) - look at the LICENSE file for more details
