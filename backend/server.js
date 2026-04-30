const express=require("express");
const connectDb=require("./config/db");
const cors=require("cors");
const dotenv=require("dotenv");

dotenv.config();
connectDb();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/students", require("./routes/studentRoutes"));


app.get("/",(req,res)=>{
    res.send("Backend is running");
});

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
     console.log("Server is running on port",PORT);
});

