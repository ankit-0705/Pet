const express = require('express');
const router = express.Router();
const Pet = require('../models/petsInfo');

// Route 1: Pet Creation
router.post('/createpet',async (req, res)=>{
    try {
        let pet = await Pet.findOne({name:req.body.name});
        if(pet){
            res.status(400).json({error:"Pet already present in the database."});
        }
        pet = await Pet.create({
            name:req.body.name
        });
        res.json(pet);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"Internal Server Error."})
    }
});

// Route 2: Update Pet's Attribute
router.put('/updatepet', async (req,res)=>{
    const {name, hunger, happiness, energy} = req.body;
    const newPet={};

    if(name){newPet.name=name};
    if(hunger){newPet.hunger=hunger};
    if(happiness){newPet.happiness=happiness};
    if(energy){newPet.energy=energy};

    try {
        let pet = await Pet.findOne();
        if(!pet){
            res.status(404).json({error:"This pet is not present in the database."});
        }
        pet = await Pet.findOneAndUpdate({},{$set: newPet},{new:true});
        res.json({Success:"Updated Successfully",updatedPet:pet});
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"Internal Server Error."})
    }
});

// Route 3: Fetch Pet's Info
router.get('/fetchpet',async (req,res)=>{
    try {
        const pet = await Pet.findOne();
        if(!pet){
            res.status(404).json({error:"No pet found in the database."});
        }
        const petInfo={
            name:pet.name,
            hunger:pet.hunger,
            happiness:pet.happiness,
            energy:pet.energy
        }
        res.json({petInfo});
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"Internal Server Error."})
    }
});

module.exports = router;