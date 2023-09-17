const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'customer','seller'],
        message: `user role is only one of this value:- 'admin', 'customer','seller'`
      },
      required: [true, 'Please provide your role'],
    
    },
    is_active: {
      type: Boolean,
      default: 'true'   //when we require delete user then update this field:- is_active=false 
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    }
  },
  {timestamps: true});

//encrypt password  
userSchema.pre('save' , async function(next){
  //only run this function if password was actully modified
  if( !this.isModified('password')) return next();

  // hash the password with cost 12
  this.password = await bcrypt.hash(this.password , 12);

  next();
})

userSchema.methods.ValidatePassword = async function (
  candidatePassword,
  userPassword
){
  return await bcrypt.compare( candidatePassword , userPassword)
};

const Users = mongoose.model('User', userSchema);

module.exports = {Users};