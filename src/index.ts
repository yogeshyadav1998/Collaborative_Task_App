import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials: true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () =>{
    console.log('APP Server is running on http://localhost:8080/');
});

const mongo_url = "mongodb+srv://yogeshbhakli:4f27NeSt02fIZUFl@cluster0.nsri0sp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongo_url).then(() =>{
    console.log('MongoDB is connected ...')
});
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());