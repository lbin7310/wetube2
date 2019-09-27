import "./db";
import app from './app';
import dotenv from "dotenv";
dotenv.config()
import "./models/Video";
import "./models/Comment";

const PROT = process.env.PORT || 4000;

const handleListening = () => 
  console.log(`✅ Listening on: http://localhost:${PROT}`);


app.listen(PROT, handleListening);