import express from 'express';
import helmet from 'helmet';
import path from 'path';
import mongoose from 'mongoose';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Promise from 'bluebird';

// graphql server
import graphqlServer from './graphql';

// Route
import auth from './routes/auth';

dotenv.config();
mongoose.promise = Promise;
mongoose.connect(process.env.MONGODB_DATABASE,{ useNewUrlParser: true })
.then(() => {
        console.log('Successfuly connect to database');
  }).catch(err => {
        console.log(`Could not connect to the database. ${err} Exiting now...`);
        process.exit();
});

const app = express();
const port = 8080;
const graphqlPath = '/api/v1/bechat/server/admin/graphql';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// app.use(express.static(path.join(__dirname, './../../build')));

app.use(auth);

graphqlServer.applyMiddleware({ app, path: graphqlPath });

const ws = createServer(app);
graphqlServer.installSubscriptionHandlers(ws);

// app.get('/*', (req, res)=>{
//   res.sendFile(path.resolve(__dirname, './../../build', 'index.html'));
// });


ws.listen({ port }, () => {
    console.log(`GraphQL API Server up and running at localhost:${port} PORT`);
});