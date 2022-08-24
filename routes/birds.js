import express from "express";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
const router = express.Router();

let birds = [];

function validateBird(bird) {
    // Validates the bird using Joi extension
    // needs name, age, weight and sex to be successful
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        age: Joi.number().required(),
          weight: Joi.number().required(),
          sex: Joi.string().required(),
    });
    return schema.validate(bird)
}

router.get("/", (req, res) => {
  // Makes sure array is not empty first
  if (birds === undefined || birds.length == 0) {
    res.send(
      "There are no birds here yet... Make a POST request to add some! Add a name attribute, age and weight!"
    );
  } else {
    res.send(birds);
  }
});

router.post("/", (req, res) => {
  // Validates the POST request
  // Throws error 400 if not formatted correctly
  const inbird = req.body;
  const { error } = validateBird(req.body)
  if (error) {
      res
        .status(400)
          .send(`Error 400: attribute ${error.details[0].message}`);
      return;
  }
    birds.push({
        ...inbird,
        price: `${Math.floor(Math.random() * 5000)} SEK`,
        id: uuidv4(),
      });
      res.send(
        `Bird with the name ${inbird.name}, age ${inbird.age}, weight ${inbird.weight} has been added!`
      );
});

router.get("/:id", (req, res) => {
  // Makes sure you can find info about specific bird if id is entered
  // If it doesn't exist it returns 404
  const { id } = req.params;

  const foundBird = birds.find((inbird) => inbird.id === id);
  if (!foundBird) {
    res.status(404).send("Error 404: Specified bird spy agent cannot be found");
  } else {
    res.send(foundBird);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const foundBird = birds.find((inbird) => inbird.id === id);
  if (!foundBird) {
    res.status(404).send("Error 404: Specified bird spy agent with the ID cannot be found");
  }
  birds = birds.filter((inbird) => inbird.id !== id);
  res.send(`Bird with id ${id} has been deleted!`);
});

router.put("/:id", (req, res) => {
  // Looks up the bird
  // If it doesn't exist returns 404
  // Validates the update
  // Updates if successful
  const { id } = req.params;
  const foundBird = birds.find((inbird) => inbird.id === id);
  if (!foundBird) {
    res.status(404).send("Error 404: Specified bird spy agent with the ID cannot be found");
  }
    const { error } = validateBird(req.body)
    if (error) {
        res
          .status(400)
            .send(`Error 400: attribute ${error.details[0].message}`);
        return;
    }

    foundBird.name = req.body.name;
    foundBird.age = req.body.age;
    foundBird.weight = req.body.weight;
    foundBird.sex = req.body.sex;
    res.send(foundBird)
});

export default router;
