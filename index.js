const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsOption = {
    orgin: "http://localhost:8081"
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models/index.js");

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
    res.json({message: "Welcome to nodesql"});
});

require("./routes/tutorial.routes")(app);

const port = process.env.port||8080;

app.listen(port, ()=>{
    console.log(`listening to ${port}`);
});