import { Component, Input, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../../services/players.service';

@Component({
  selector: 'app-change-players-modal',
  standalone: true,
  imports: [],
  templateUrl: './changePlayersModal.component.html',
  styleUrl: './changePlayersModal.component.scss'
})

export class ChangePlayersModalComponent implements OnInit {
  private modalService = inject(NgbModal);
   @ViewChild('content', { static: true }) content!: TemplateRef<any>

  @Input() starting_players: Player[] = [];


  ngOnInit(): void {
    console.log("i giocatori sono", this.starting_players)
    console.log("commento di prova")
  }
  

  open() {
		this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
	}

}
