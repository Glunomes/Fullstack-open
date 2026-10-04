const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })
  .then(console.log('connected to MongoDB'))
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type:String,
    minLength: 8,
    validate: function(v) {
      return /^\d{2,3}-\d+$/.test(v)
    },
    message: props => `${props.value} is not a valid number`
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)