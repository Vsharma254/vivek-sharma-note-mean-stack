import Note from '../models/note';
import BaseCtrl from './base';

export default class NotesCtrl extends BaseCtrl {
  model = Note;
}
