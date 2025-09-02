import { PlayersService } from '../../../services/playersService'

import { Component, EventEmitter, inject, Output, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { Player } from '../../../Models/Player';

@Component({
	selector: 'app-new-player-modal',
  standalone: true,
  imports: [FormsModule],
	templateUrl: './newPlayerModal.component.html',
  styleUrls: ['./newPlayerModal.component.scss']
})

export class NewPlayerModalComponent {
  
  private playersService = inject(PlayersService);
  private modalService = inject(NgbModal);
  public closeResult: WritableSignal<string> = signal('');

  newPlayer: Player = {
    id: 0,
    name: '',
    surname: '',
    number: null,
    role: ''
  };


  @Output() playerCreated = new EventEmitter<void>();

  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

  // To open the modal
  public open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        // this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  // To save the player
  public savePlayer(form: any, modal: any) {
    if (form.valid) {
      this.playersService.createPlayer(this.newPlayer).subscribe({
        next: (res) => {
          this.playerCreated.emit();
          console.log('Giocatore salvato:', res);
          modal.close('Save click');
        },
        error: (err) => console.error('Errore salvataggio nuovo player', err)
      });
      // Reset form
      this.newPlayer = { id: 0, name: '', surname: '', number: null, role: '' };
    }
  }
     
}