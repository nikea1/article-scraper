var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var noteSchema = new Schema({
	noteTitle:{
		type:String
	},

	noteBody:{
		type:String
	}
})

var Note = mongoose.model('Note', noteSchema)

module.exports = Note;