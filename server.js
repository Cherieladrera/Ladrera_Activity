const express = require("express");
const app = express();
const PORT = process.env.PORT;
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const mockData = [
    { id: 1, name: "Supra", price: 1000000 },
    { id: 2, name: "Tesla", price: 200000 },
    { id: 3, name: "Civic", price: 300000 },

  ];
  let cars = [
    { id: 1, name: "Supra", price: 1000000 },
    { id: 2, name: "Tesla", price: 200000 },
    { id: 2, name: "Civic", price: 200000 },
  ];
 
  //to get all cars
  app.post("/cars", (req, res) => {
    const { name, price } = req.body; // to get the title and author from the request body
    const newcars = { id: cars.length + 1, name, price }; // to create a new book object
    cars.push(newcars); // to add the new book to the books array
    res.status(201).json(newcars); // to send the new book as a response
  });

  //to get a cars by id
  app.get("/cars/:id", (req, res) => {
    const cars = cars.find((b) => b.id === parseInt(req.params.id)); // to find the car by id
    if (!cars) return res.status(404).json({ message: "Car not found" }); // to send a 404 status code and a message if the car is not found
    res.json(cars); // to send the car as a response
  });

  //to update car
  app.put("/cars/:id", (req, res) => {
    const car = cars.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
    if (!car) return res.status(404).json({ message: "Car not found" }); // to send a 404 status code and a message if the book is not found
  
    const { name, price } = req.body; // to get the title and author from the request body
    book.name = name; // to update the title of the book
    book.owner = owner; // to update the author of the book
    res.json(car); // to send the updated book as a response
  });

  // to delete a book
app.delete("/cars/:id", (req, res) => {
  const index = cars.findIndex((b) => b.id === parseInt(req.params.id)); // to find the index of the book by id
  if (index === -1) return res.status(404).json({ message: "Car not found" }); // to send a 404 status code and a message if the book is not found

  cars.splice(index, 1); // to delete the book from the books array
  res.status(204).send(); // to send a 204 status code
});
