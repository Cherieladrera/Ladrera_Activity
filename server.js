const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;  // Add a fallback for PORT

app.use(express.json());

const cars = [
  { id: 1, name: "Supra", price: 1000000 },
  { id: 2, name: "Tesla", price: 200000 },
  { id: 3, name: "Civic", price: 300000 },
];

// Get all cars
app.get("/cars", (req, res) => {
  res.json(cars);
});

// Get car by ID
app.get("/cars/:id", (req, res) => {
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
});

// Add a new car
app.post("/cars", (req, res) => {
  const { name, price } = req.body;
  const newCar = { id: cars.length + 1, name, price };
  cars.push(newCar);
  res.status(201).json(newCar);
});

// Update car by ID
app.put("/cars/:id", (req, res) => {
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });

  const { name, price } = req.body;
  car.name = name;  // Update the car's name
  car.price = price;  // Update the car's price
  res.json(car);
});

// Delete car by ID
app.delete("/cars/:id", (req, res) => {
  const index = cars.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Car not found" });

  cars.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
