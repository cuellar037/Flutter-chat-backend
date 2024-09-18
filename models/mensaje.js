const {Schema, model} = require("mongoose");

const MensajeSchema = Schema({
  de: {
    type: Schema.Types.ObjectId, 
    ref: 'Usuario',
    require: true, 
  },
  para: {
    type: Schema.Types.ObjectId, 
    ref: 'Usuario',
    require: true, 
  }, 
  fecha: {
    type: Date, 
    default: new Date() 
  }, 
  mensaje: {
    type: String, 
    required: true
  }
}, {
  timestamps: true
});

MensajeSchema.method('toJSON', function(){
  const {__v, _id, password, ...object} = this.toObject();
  return object;
});

module.exports = model('Mensaje', MensajeSchema);