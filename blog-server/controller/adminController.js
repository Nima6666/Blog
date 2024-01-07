const { reset } = require("nodemon")
const admin = require("../model/admin")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.adminCreate = async (req,res) => {
    try {

        await admin.find({}).then((adminFound) => {
            if (adminFound.length > 0) {
                res.status(400).json({
                    message: "the admin has already been registered for this server"
                })
            } else {
            bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
                const theAdmin = new admin({
                    username: req.body.username,
                    password: hashedPassword
                })
        
                await theAdmin.save()
                
                res.json({
                    message: "admin created successfully",
                    theAdmin
                })
            }) 
        }
        })
        

        
    } catch(err) {
        res.status(500).json({
            message: err
        })
    }
}

module.exports.adminLogin = async(req,res) => {
    try {

        const adminfound = await admin.findOne({username: req.body.username})
        if (adminfound) {
            console.log(req.body.password, adminfound.password)
            const isValidPassword = bcryptjs.compare(req.body.password, adminfound.password)
            if (isValidPassword) {

                const infoObject = {
                    id: adminfound._id
                }
                const expiryInfo = {
                    expiresIn: "10d"
                }

                const token = jwt.sign(infoObject, process.env.SECRET, expiryInfo)
            } else {
                res.sendStatus(403)
            }
        }
        
    } catch(err) {
        res.json({
            message: err
        })
    }
}

module.exports.read = (req,res) => {
    res.send("hellow")
}