import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"


import connectDB from "./config/connectDB.js"
import userRoutes from "./routes/user.route.js"
import promtRoutes from "./routes/promt.route.js"


 
dotenv.config();
connectDB();
const app=express();

//middelware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}));

const PORT =process.env.PORT || 4002;

// routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/deepseekai",promtRoutes)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
}); 