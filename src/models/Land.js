const { Schema, model } = require('mongoose');
const { schemaOptions } = require('./schemaOptions')

const landSchema = new Schema({
   area: {
      type: Number,
      required: true
   },
   resultProducts: {
      type: Number,
      required: true
   },
   numberPlan: {
      type: Number,
      enum: [1, 2],
      default: 1
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
   }
}, schemaOptions);

module.exports = model('Land', landSchema);