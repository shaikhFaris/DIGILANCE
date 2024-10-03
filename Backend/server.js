import express from "express"
import cors from "cors";
import {cordinates} from "./dataProcessing/getRouteCoordinates.js";
const app=express();
const PORT = 4331;


app.use(cors())
// format to write in browser http://localhost:4331/api/navigation

app.get("/api/navigation",(req,res)=>{
    // console.log(req.query);
    res.json(cordinates)
})
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})
