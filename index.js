require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const axios = require("axios");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//

//Add a note

app.post("/submitnote", async (req, res) => {
  try {
    const { title, details, category } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO notes (note_title, note_details, note_category) VALUES($1, $2, $3) RETURNING *",
      [title, details, category]
    );

    res.send("Success");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

//Get all notes

app.get("/notes", async (req, res) => {
  try {
    const note = await pool.query("SELECT * FROM notes");
    // console.log(note.rows);
    res.send(note.rows);
  } catch (e) {
    console.log(e);
  }
});

//Delete a note

app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM notes WHERE id = $1", [
      id,
    ]);
    res.send("Note was deleted");
  } catch (error) {
    console.log(error);
  }
});

app.post("/meals", async (req, res) => {
  const appKey = "250d4df016b996a740ac2149695f4264";
  const appId = "7c88495a";

  const { stringText } = req.body;

  try {
    let response = await axios.get(
      `https://api.edamam.com/search?from=0&to=30&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}` +
        `${stringText}`
    );
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

// Register
app.post("/createUser", async (req, res) => {
  const { uid, fname, lname, email } = req.body;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (id, first_name, last_name, email) VALUES($1, $2, $3, $4) RETURNING *",
      [uid, fname, lname, email]
    );
    res.send("New user created");
  } catch (error) {
    console.log(error);
  }
});

// Get user info

app.post("/userinfo", async (req, res) => {
  const uid = req.body.uid;
  console.log(uid);
  try {
    const info = await pool.query(
      "SELECT first_name, last_name FROM users WHERE id = $1",
      [uid]
    );
    console.log(info.rows);
    res.send(info.rows);
  } catch (error) {
    console.log(error);
  }
});

// Save meal
app.post("/savemeal", async (req, res) => {
  const {
    id,
    mealImage,
    mealTitle,
    mealCalories,
    mealIngredients,
    mealNutrients,
    mealUrl,
  } = req.body;

  const obj1 = JSON.stringify(mealNutrients);
  const obj2 = JSON.stringify(mealIngredients);

  try {
    const response = await pool.query(
      "INSERT INTO meals (id, mealTitle, mealImage, mealCalories, mealUrl, mealNutrients, mealIngredients) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [id, mealTitle, mealImage, mealCalories, mealUrl, obj1, obj2]
    );

    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});

// get my meals
app.post("/getmeals", async (req, res) => {
  const { uid } = req.body;

  try {
    const response = await pool.query("SELECT * FROM meals WHERE id = $1", [
      uid,
    ]);

    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});

// Delete a meal

app.delete("/deletemeal", async (req, res) => {
  try {
    const { uid, mealTitle } = req.body;
    const deleteMeal = await pool.query(
      "DELETE FROM meals WHERE id = $1 and mealTitle = $2",
      [uid, mealTitle]
    );
    res.send("Meal was deleted");
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server has started on port 5000");
});