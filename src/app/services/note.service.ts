import { Injectable } from '@angular/core';
import { Note, NoteLiteral } from '../models/Note';

//Sert pour les requêtes xmlhttprequest (AJAX)
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//Déclaration du type Schema
interface NoteJson {
  success: boolean,
  notes: NoteLiteral[]
}

@Injectable()
export class NoteService {

  private service_url: string = "http://localhost/APIS/notes/";

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<NoteJson> {

    return this.http.get( this.service_url + "notes" ) as Observable<NoteJson>;
  }

  addNote (note: Note): Observable< { success: boolean, id: number, message: string }> {

    return this.http.post(this.service_url + "note", note ) as Observable< { success: boolean, id: number, message: string }>;

  }

  deleteNote (id: number) : Observable<{success: boolean, message: string}> {

    return this.http.delete (this.service_url + "note/" + id ) as Observable<{success: boolean, message: string}>;
  }

  
  editNote (note: Note) : Observable<{success: boolean, id: number, message: string}> {

    return this.http.put (this.service_url + "note/" + note.getId(), note) as Observable<{success: boolean, id: number, message: string}>;
  }


}
