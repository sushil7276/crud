const connectToMongo = require("./db");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const userRoutes = require('./routers/user')


connectToMongo()
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/', userRoutes);
app.get('/', (req, res) => res.send("Hello from express"));
app.get('*', (req, res) => res.send("That route doesn't exist"))

app.listen(port, () => {
    console.log("server start: ", port)
})