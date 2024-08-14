import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

let data;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
      recipe: "No Recipe Chosen Yet"
    });
  });

  app.post("/filter", (req, res) => {
     // Accessing selected checkboxes from req.body
     const selectedBases = req.body.dish_base; // For "Dish Base"
     const selectedTypes = req.body.dish_type; // For "Dish Type"
     const selectedAllergens = req.body.allergens; // For "Allergens"
 
     console.log('Selected Dish Bases:', selectedBases);
     console.log('Selected Dish Types:', selectedTypes);
     console.log('Selected Allergens:', selectedAllergens);
    res.redirect('/')
  });




app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}`);
  });