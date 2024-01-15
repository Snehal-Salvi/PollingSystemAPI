import "./env.js"
import express from 'express';
import bodyParser from 'body-parser';
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert {type:'json'};
import { connectToDb } from "./config/mongoose.js";
import questionRouter from "./src/routes/questions.routes.js";
import optionRouter from "./src/routes/options.routes.js";

const server = express();

server.use(bodyParser.json());

server.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs));


server.use("/api/questions", questionRouter);
server.use("/api/options", optionRouter);


server.get("/",(req,res) => {
    res.send("Welcome to polling system API. Please look documentaion of how to use API at https://pollingsystemapi-wur1.onrender.com/api-docs");
});

server.use((req,res) => {
    res.status(404).send("API Not Found. Please look documentaion of how to use API at https://pollingsystemapi-wur1.onrender.com/api-docs");
  })



server.listen(8000, ()=>{
    console.log('Server is listening on port 8000');
    connectToDb();
});
