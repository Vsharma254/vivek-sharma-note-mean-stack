import * as mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  note: String,
  createUserID: Number
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
