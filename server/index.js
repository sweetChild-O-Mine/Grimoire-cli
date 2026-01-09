require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express()
app.use(express.json())
app.use(cors())


// DB connection here we goooo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!!"))
    .catch((error) => console.log("DC connection error:", error))

// defingin the schmea 
const SnippetSchema = new mongoose.Schema({
    title:  {type: String, required: true},
    code: { type: String, required: true},
    createdAt: { type: Date, default: Date.now}
})

// make model out of this schema ig 
const Snippet = mongoose.model('Snippet', SnippetSchema)

app.get('/read', async (req, res) => {
    try {

        const snippets = await Snippet.find()

        res.send(snippets)

    } catch (error) {
        res.status(404).json({error: "Sorry!!! Couldn't find the data."})
    }
})

app.post('/add', async (req, res) => {
    try {
        // request ki body me title and code hai toh we gotta extract both of these things 
        const {title, code} = req.body

        if(!title || !code) {
            return res.status(400).json({error: "Request isn't valid!!!"})
        }

        const newSnippet = new Snippet({title: title, code: code})

        // save thid inot db ig 
        await newSnippet.save()

        // everythin's doene so finally bhej do respnse user kok 
        res.status(201).send("Yayy!!!...Snippet Uploaded Successfully!!!")

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Sorry!!!....Internal Server Error!!!"})
    }
})


app.listen(3000, () => {
    console.log("We are listening you at 3000!!!");
})