const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')


//Simple Get
router.get('/', async (req, res) =>{
    try{
        const user = await User.find()
        res.json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Add User
router.post('/add', async (req, res) => {
    try{
        const { username, eMail, password} = req.body

        const existingUser = await User.findOne({ "username": username })

        if(existingUser){
            res.status(409).send('User already exists')
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            eMail,
            password: hashedPassword
        })

        const newUser = user.save();
        
        res.status(201).json(username)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//login User
router.post('/login', async (req, res) =>{
    const { username, password } = req.body
    try{
        
        const user = await User.findOne({ username })

        if(!user){
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).send(username)

    }catch(error){
        res.status(400).json({message: error.message})
    }
})



module.exports = router