import express from "express"
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors());

// ROUTES: app.get, app.post, app.put, etc.

app.listen(8800, () => {
    console.log("Connected to backend!")
})