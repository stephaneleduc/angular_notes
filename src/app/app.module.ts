import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { ModalComponent } from './modal/modal.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // import du module http ici
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
