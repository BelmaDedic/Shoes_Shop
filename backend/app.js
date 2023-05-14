const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Shoes = require('./models/shoes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://name:password@cluster0.kn4cg.mongodb.net/shoesShop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to DB");
})
.catch(console.error);

app.get('/Shoes', async(req, res) => {
    const shoes = await Shoes.find();
    res.json(shoes);
})

app.post('/Shoes/add-new', async(req, res) => {
    const shoes = new Shoes({
        imageUrl: req.body.ImageUrl,
        name: req.body.Name,
        category: req.body.Category,
        description: req.body.Description,
        price: req.body.Price
    })
    shoes.save();
    res.json(shoes);
})

app.delete('/Shoes/delete/:id', async(req, res) => {
    const shoes = await Shoes.findByIdAndDelete(req.params.id);
    res.json(shoes);
})

app.get('/Shoes/edit/:id', async(req, res) => {
    const editShoes = await Shoes.findById(req.params.id);
    res.json(editShoes);
})

app.post('/Shoes/edit/:id', async(req, res) => {
    const update = await Shoes.findByIdAndUpdate({"_id": req.params.id},
    {"$set": {
        "imageUrl": req.body.ImageUrl,
        "name": req.body.Name,
        "category": req.body.Category,
        "description": req.body.Description,
        "price": req.body.Price
    }
    });
    update.save();
    res.json(update);
})

app.get('/Shoes/find/:category', async(req, res) => {
    const findShoes = await Shoes.find({category: req. params. category});
    res.json(findShoes);
})

app.listen(3000, () => {
    console.log("Server started!");
});
