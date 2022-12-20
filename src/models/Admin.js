const { Schema, model } = require('mongoose');
const { schemaOptions } = require('./schemaOptions')

const adminSchema = new Schema({
   fullName: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin'
   },
   areas: [{
      type: Schema.Types.ObjectId,
      ref: 'Land'
   }]
}, schemaOptions)

module.exports = model('Admin', adminSchema)