import express from "express";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
const router = express.Router();

let birds = [];

router.get("/", (req, res) => {
  if (birds === undefined || birds.length == 0) {
    res.send(
      "There are no birds here yet... Make a POST request to add some! Add a name attribute, age and weight!"
    );
  } else {
    res.send(birds);
  }
});

router.post("/", (req, res) => {
  const inbird = req.body;
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required(),
            age: Joi.number().required(),
            weight: Joi.number().required(),
          }
  )
    const result = schema.validate(req.body);
    console.log(result)
  if (result.error) {
    res
      .status(400)
      .send(`Error 400: attribute ${result.error.details[0].message}`);
  } else {
    birds.push({
      ...inbird,
      price: `${Math.floor(Math.random() * 5000)} SEK`,
      id: uuidv4(),
    });
    res.send(
      `Bird with the name ${inbird.name}, age ${inbird.age}, weight ${inbird.weight} has been added!`
    );
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundBird = birds.find((inbird) => inbird.id === id);
  if (!foundBird)
    res.status(404).send("Error 404: Specified bird spy agent cannot be found");
  res.send(foundBird);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  birds = birds.filter((inbird) => inbird.id !== id);

  res.send(`Bird with id ${id} has been deleted!`);
});

export default router;
