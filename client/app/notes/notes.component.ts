import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NoteService } from '../notes/note.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  myNote: any = {};
  noteList = [];
  isLoading = true;
  isEditing = false;

  addNoteForm: FormGroup;
  note = new FormControl('', Validators.required);

  constructor(private noteService: NoteService,
    private formBuilder: FormBuilder,
    private http: Http,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getNotes();
    this.addNoteForm = this.formBuilder.group({
      note: this.note
    });

  }

  // getNotes
  getNotes() {
    this.noteService.getNotes().subscribe(
      data => this.noteList = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  // addNote
  addNote() {
    this.noteService.addNote(this.addNoteForm.value).subscribe(
      res => {
        const newCat = res.json();
        this.noteList.push(newCat);
        this.addNoteForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  editNote() {
    const note = { note: this.addNoteForm.value.note, _id: this.myNote._id }
    this.noteService.editNote(note).subscribe(
      res => {
        if (res.status === 200)
          this.noteList = this.noteList.map(it => {
            if (it._id === this.myNote._id)
              return Object.assign({}, it, { note: this.addNoteForm.value.note });
            else
              return it;
          });
        this.addNoteForm.reset();
        this.isEditing = false;
        this.toast.setMessage('item updated successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  // enableEditing
  enableEditing(cat) {
    this.addNoteForm.controls['note'].setValue(cat.note);
    this.isEditing = true;
    this.myNote = cat;
  }

  // cancelEditing
  cancelEditing() {
    this.isEditing = false;
    this.myNote = {};
    this.addNoteForm.controls['note'].setValue('');
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getNotes();
  }

  // getNote
  getNote(notes) {
    this.noteService.getNote(notes).subscribe(
      res => {
        this.isEditing = false;
        this.myNote = notes;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  // deleteNote
  deleteNote(notes) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.noteService.deleteNote(notes).subscribe(
        res => {
          const pos = this.noteList.map(elem => elem._id).indexOf(notes._id);
          this.noteList.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
