import { Component, OnInit } from '@angular/core';
import { Note, NoteLiteral } from './models/Note';
import { NoteService } from './services/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  //On a besoin d'un service en particulier
  providers: [ NoteService ]
})
export class AppComponent implements OnInit {
  
  public notes: Note[] = [];

  public button: string = "";

  public modal_message: string= "";

  public current_note: Note = Note.empty();

  public confirmation: { status : boolean, position: number} = {

    status : false,
    position : null

  };

  //Injection de dépendances : créer une propriété qui
  //est une instance de NoteService
  constructor( private noteService: NoteService) {}
  

  //Le component est complètement initialisé
  ngOnInit(): void {
    
    this.noteService.getAllNotes().subscribe(
      (data) => {
        
        if (data.success ) {

          this.populateNotes ( data.notes );
        }

      },
      (error) => {
        console.log(error);
      }
    );

  }

  populateNotes( notes_json: NoteLiteral[] ) {

    for (let note_json of notes_json ) {

      const note = new Note (note_json.title, note_json.content, new Date(note_json.date));
      note.setId(note_json.id);

      this.notes.push (note);
    }

  }

  addNote(): void {


    const note = new Note(
      this.current_note.getTitle(),
      this.current_note.getContent(),
      new Date

    )

    this.noteService.addNote( note ).subscribe(
      (datas) => {
        if ( datas.success ) {

          note.setId(datas.id);
          this.notes.push ( note );
          
          //Reset du formulaire
          this.current_note.setTitle("");
          this.current_note.setContent("");

        }
      },
      (error) => {
        console.log(error);
      }
    )

  }

  deleteNote( position : number ): void {

    //Open modal
    this.confirmation.status = true;
    this.confirmation.position = position;

    //Changement d message de confirmation
    this.modal_message = "Voulez-vous supprimer la note " + this.notes[position].getId() + " ?";
    
  }

  editNote (note: Note ) : void {
    this.current_note = note;
  }

  mode(): string {

    return this.current_note.getId() ? "Editer" : "Ajouter";
  }

  actionNote() :void {

    if (this.current_note.getId() ) {

      this.updateNote();
    }
    else {

      this.addNote ();

    }

  }

  updateNote() {

    this.noteService.editNote( this.current_note ).subscribe(

      (datas) => {

        if (datas.success) {

          this.current_note = Note.empty();


        }
      },
      (error) => {
        console.log (error);
      }
    )



  }

  submit (event: KeyboardEvent ) {

    if (event.keyCode == 13 ) {
      this.actionNote();
    }
  }

  cancel(event : MouseEvent) {

    const target: HTMLElement = event.target as HTMLElement;
    if (target.className == "container") {

      this.current_note = Note.empty();

    }

  }

  modalCancel(): void {

    this.confirmation.status = false;
  }

  modalConfirm(): void {

    const position = this.confirmation.position;
    const id = this.notes[position].getId();

    this.noteService.deleteNote(id).subscribe(
      (datas) => {
        if ( datas.success ) {
          
          this.notes.splice(position, 1);
          this.confirmation.status = false;

        }
      },
      (error) => {
        console.log(error);
      },

      //Complete : executer quand c'est fini, success ou error
      () => {

        this.confirmation.status = false;
      }
    )
  }
  
}
