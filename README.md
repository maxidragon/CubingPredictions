## Cubing Predictions

Cubing predictions is a website for predicting results of speedcubing competitions. Here you can find all the source code of this app. 

## Design

Cubing predictions is a web app with WCA API integration. Frontend is built with React and MUI, backend with Nest.js. It also uses MySQL database for storing user predictions.

## Development

In the future, I plan to add the ability to launch via docker

## Requirements
- NodeJS (version 19.0.0 or later)
- MySQL

Clone this repo and navigate into it
  ```
  git clone https://github.com/maxidragon/CubingPredictions
  cd CubingPredictions
  ```

## Setup database
- Create new database CubingPredictions and set root password to root
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
CREATE DATABASE CubingPredictions;
```

## Setup backend

- Navigate into backend directory
```
cd backend
```
- Create .env file and enter database URL and JWT secret (and if you want, SMTP details)
```
PORT=5000
DATABASE_URL=mysql://root:root@127.0.0.1:3306/CubingPredictions
SECRET=secret123
SMTP_HOST=smtp.gmail.com
SMTP_USER=youremail@gmail.com
SMTP_PASS=password
```

- Install dependencies
```
npm install
```

- Run backend in development mode
```
npm run start:dev
```

The server will be accessible at localhost:5000

## Setup frontend
- Navigate into frontend directory
```
cd frontend
```

- Install dependencies
```
npm install
```

- Run frontend server
```
npm start
```
The server will be accessible at localhost:3000

## Tests

- Backend tests (you must be in backend directory)
```
npm test
```
