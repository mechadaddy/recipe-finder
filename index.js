import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = 'https://api.spoonacular.com/recipes/';
const API_KEY = `apiKey=2f351cf46f684b21ac10265f6be11aae`;
let data;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/filter", async (req, res) => {

    //define query
    const base = req.body.dish_base;
    const type = req.body.dish_type;
    const allergen = req.body.allergens;

    //define request url
    const reqURL = API_URL + `complexSearch?includeIngredients=${base}&` + `type=${type}&` + `intolerances=${allergen}&` + `sort=random&number=1&` + API_KEY;

    try {
      //get your recipe id
      const idReq = await axios.get(reqURL);
      const ID = idReq.data.results[0].id;
      console.log(`Your Recipe's ID: ${ID}`);
      console.log(`Your ID Request URL: ${reqURL}`);

      //get the recipe from that id
      const infoReq = API_URL + `${ID}/information?` + API_KEY;
      console.log(`Your Recipe URL: ${infoReq}`);
      const infoRes = await axios.get(infoReq);
      console.log(`Your Recipe is: ${infoRes.data.title}`)

      //get equpment from that id
      const equipReq = API_URL + `${ID}/equipmentWidget.json?${API_KEY}`;
      console.log(`Your Equipment URL: ${equipReq}`);
      const equipRes = await axios.get(equipReq);

      //get nurtitional information from that id
      const nutReq = API_URL + `${ID}/nutritionWidget.json?${API_KEY}`;
      console.log(`Your Nurtition URL: ${nutReq}`);
      const nutRes = await axios.get(nutReq);

      //render index.js
      res.render('index.ejs', {
        recipe: infoRes.data, //the recipe information
        equipment: equipRes.data, //the equipment information
        nutrition: nutRes.data
    })

  } catch (error) {
      // Log the HTTP status code (if available)
      if (error.response) {
        console.log(`Error Code: ${error.response.status}`);  // HTTP status code
        console.log(`Error Message: ${JSON.stringify(error.response.data.message)}`);  // The actual error message from the API
      } else if (error.request) {
        console.log('No response received from the server:', error.request);  // No response was received
      } else {
        console.log('Error setting up request:', error.message);  // Error in setting up the request
      }
    }
});




app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}`);
  });