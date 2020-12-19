# PNW Whale Watch

## Table of Contents
* [About the Project](#about-the-project)
    * [Our Deployed Page](#our-deployed-page)
* [Benefits of This Project](#benefits-of-this-project)
* [Accessing the Project](#accessing-the-project)
    * [Project File Structure](#project-file-structure)
* [Acknowledgments](#acknowledgments)
  
## About the Project
This was the second group project for the UW Coding Bootcamp. For this project we were simply given a set of requirements that our application needed to meet, but we were given creative control over the design and functionality of the application. Among the criteria were: full-stack web application with hosting through Heroku.
Our group chose to make an application named PNW Whale Watch. This application was created to help people view whales that tavel through the pacific northwest. Users can post whale sighting and subscribers can be notified via SMS so that they can quickly get to a boat or the beach to see whales in the area.
### Our Deployed Page
<img src="assets/deployed.gif" alt="gif of deployed app in use">

## Benefits of This Project
This project taught us a lot about working with a team. From the start, we were able to work well together to develop a concept. We bounced ideas off of one another, developed on favorite themes, and were honest about the challenges that certain ideas would present.

Using a Github Organization repository was not as difficult as we originally thought. One challenge was setting up our DNS service to forward traffic to all the url varients. 

This project also gave us a lot more experience in working across the stack. We had come up with our concept, and needed to find the necessary infrastructure to make our vision work. This took a lot of Googling, trial and error, and hours of reading through documentation.

## Accessing the Project
You can access the deployed webpage at: https://www.pnwwhalewatch.com/ 

The full project files are included in this repository for review. 

### Project File structure:
* config/
    * middleware/
        * checkIfLoggedIn.js
    * config.js.
    * passport.js
* controller/
    * api-controller.js
    * app-controller.js
* models/
    * index.js
    * sighting.js
    * user.js
* public/
* views/
* package.json
* README.md
* schema.sql
* seed.sql
* server.js

## Acknowledgments
Foundation UI Framework used for styling: https://get.foundation/

Handlebars used for html templating: https://handlebarsjs.com/

Express for web server application: https://www.expressjs.com/

MySQL for backend storage: https://www.mysql.com/

Passport for user authentication: https://www.passportjs.org/

Amazon Web Service (AWS) for SNS service: https://www.aws.com/

Heroku used to host application: https://www.heroku.com/ 

godaddy used for DNS hosting: https://www.godaddy.com/
