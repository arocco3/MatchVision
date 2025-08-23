import { Player, PlayersService } from '../../../services/players.service'

import { Component, inject, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'

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
  name: '',
  surname: '',
  number: 0,
  role: ''
};

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
          console.log('Giocatore salvato:', res);
          modal.close('Save click');
          // Reset form
          this.newPlayer = { name: '', surname: '', number: 0, role: '' };
        },
        error: (err) => console.error('Errore salvataggio nuovo player', err)
      });
    }
  }
     
}