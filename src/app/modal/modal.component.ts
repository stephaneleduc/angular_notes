import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  //Input est utilisé pour permettre la recupération du content dans app component
  private title: string = "Attention !";
  @Input() public content: string = "Etes-vous sûr ?";

  //Permet d'envoyer des evenements vers l'exterieur
  @Output() public onCancel: EventEmitter<boolean> = new EventEmitter();
  @Output() public onConfirm: EventEmitter<boolean> = new EventEmitter();

  cancel(): void {

    //On lance l'evenement onCancel
    this.onCancel.emit( true );

  }

  confirm(): void {

    //On lance l'evenement onConfirm
    this.onConfirm.emit( true );

  }

}
