const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.SECRET_JWT

const generateToken = (id)=>{
    return jwt.sign({id},jwtSecret,{expiresIn:'7d'})
}

const register = async (req,res)=>{
    const {username,email,password} = req.body
    // validate username
    const findUsername = await User.findOne({username:username})
    if(findUsername){
        res.status(422).json({errors:"This username is already in use!"})
        return
    }
    if(!username){
        res.status(422).json({errors:"Username is required!"})
        return
    }
    if(!username.length >= 3){
        res.status(422).json({errors:"The username must be longer than three characters!"})
        return
    }

    //validate email
    const findEmail = await User.findOne({email:email})
    if(findEmail){
        res.status(422).json({errors:"This email is already in use!"})
        return
    }
    if(!email){
        res.status(422).json({errors:"Email is required!"})
        return
    }
    if(email.includes('@')){
        const emailArrayValidate = email.split('@')
        if(emailArrayValidate[0].length>=3){
            if(emailArrayValidate[1].includes('.')){
                const domainArrayValidate = emailArrayValidate[1].split('.')
                if(domainArrayValidate[0].length > 0){
                    if(!domainArrayValidate[1].length > 0){
                        res.status(422).json({errors:"Invalid email!"})
                        return
                    }
                }else{
                    res.status(422).json({errors:"Invalid email!"})
                    return
                }
            }else{
                res.status(422).json({errors:"Invalid email!"})
                return
            }
        }else{
            res.status(422).json({errors:"Invalid email!"})
            return
        }
    }else{
        res.status(422).json({errors:"Invalid email!"})
        return
    }

    //validate password
    if(!password){
        res.status(422).json({errors:"Invalid email!"})
        return
    }

    if(password.length < 5){
        res.status(422).json({errors:"Password must be greater than or equal to 5 characters."})
        return
    }

    //password hash
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password,salt)

    const user = new User({
        username,
        email,
        password:passwordHash
    })

    const newUser = await user.save()

    res.status(201).json({_id: newUser._id,token:generateToken(newUser._id)})
}
const login = async(req,res)=>{
    const {email,password} = req.body
    
    const user = await User.findOne({email})

    if(!user){
        res.status(422).json({errors:['This email is not registered in our system, you must have typed something wrong.']})
        return
    }

    if(!bcrypt.compare(password,user.password)){
        res.status(422).json({errors:['Incorrect password.']})
        return
    }

    res.status(201).json({_id:user._id,profileImage: user.profileImage, token: generateToken(user._id)})
    
}
module.exports = {
    register,
    login
}