const http = require("http");
const express = require("express");

const cors = require("cors");
// mongo connection

const config = require("./config/mongo.js");

//routes
const indexRouter = require("./routes/index");


const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "5000";
app.set("port", port);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1", indexRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

/** Create HTTP server. */
const server = http.createServer(app);

server.listen(port);




server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
});