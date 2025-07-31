import express from "express";
import "dotenv/config";
import cors from "cors";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import foodModel from "./models/foodModel.js";
import userRouter from "./routes/userRoute.js";
import CartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import webRouter from "./routes/webHookRoute.js";
//app config

const app = express();
const port = process.env.PORT ;

// middleware

app.use(express.json());
app.use(
  cors({
    origin: [  process.env.CLIENT_URL || "https://food-delivery-app-77se.vercel.app/",   // Client React app
      process.env.ADMIN_URL || "https://food-delivery-app-admin-swart.vercel.app/"     // Admin React app
      ],
    credentials: true,
  })
);

//db connection

connectDB();

//api endpoint

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
//user api endpoints

app.use("/api/user", userRouter);

//cart api endpoints
app.use("/api/cart", CartRouter);

//place order api endpoint

app.use("/api/order", orderRouter);

//stripe endpoint
app.use("/api/stripe", webRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

