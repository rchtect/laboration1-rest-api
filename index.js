import express from "express";
import bodyParser from "body-parser";
import birdRouter from "./routes/birds.js";
const app = express();
const PORT = 8080;

app.use(bodyParser.json())

app.use('/birds', birdRouter);

app.get('/', (req, res) => res.send("Welcome to the secret bird spy intelligence, visit '/birds' to find the registrated birds and '/birds/[id]' for a specific bird."));

app.all('*', (req, res) => {
    res.status(404).send('Error 404: The page specified cannot be found.');
  });

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))