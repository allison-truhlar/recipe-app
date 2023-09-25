const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}) 

//static signup method
userSchema.statics.signup = async function(username, password){

    //validation
    if(!username || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password must be at least 8 characters long and must contain at least one uppercase and lowercase letter, a number, and a symbol")
    }
    
    const exists = await this.findOne({username})
    
    if(exists){
        throw Error("Username already taken")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, password: hash})

    return user
}

// compare password static helper method
userSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      callback(err, isMatch)
    })
  }

module.exports = mongoose.model("User", userSchema)