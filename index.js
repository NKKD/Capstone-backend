import express from 'express';
import cors from "cors";
import router from './routes/robot-route.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};
const redis = require('redis');
const client = redis.createClient();
const verifyToken = require('./middlewares/verifyTokenMiddleware');

const app = express();
app.use(cors());
app.use('/', express.static('public'))

//this applies verifyToken to /api only
app.use("/api",verifyToken, router);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

client.on("error", function(error) {
    console.error("Redis Error: ", error);
});


app.listen(3000, function () {
    console.log("I'm actively listening at PORT 3000.............");
})


