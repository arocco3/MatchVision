import { PlayersService } from '../../../services/players.service'

import { Component, inject, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-new-player-modal',
  standalone: true,
	templateUrl: './newPlayerModal.component.html',
  styleUrls: ['./newPlayerModal.component.scss']
})

export class NewPlayerModalComponent {

  private modalService = inject(NgbModal);
  public closeResult: WritableSignal<string> = signal('');

  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

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
     
}