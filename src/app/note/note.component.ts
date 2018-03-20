import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../models/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {


  @Input() public usednote: Note;

  @Input() public usedposition: number;
  
  @Output() public onDelete: EventEmitter<number> = new EventEmitter();
  @Output() public onEdit: EventEmitter<Note> = new EventEmitter();


  delete() {
    this.onDelete.emit( this.usedposition );

  }

  edit() {
    this.onEdit.emit (this.usednote);
  }
}
