import { Component, Input, OnInit, inject, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Player } from '../../../services/players.service'

@Component({
  selector: 'app-change-players-modal',
  standalone: true,
  imports: [],
  templateUrl: './changePlayersModal.component.html',
  styleUrl: './changePlayersModal.component.scss',
})
export class ChangePlayersModalComponent implements OnInit {
  private modalService = inject(NgbModal)
  @ViewChild('content', { static: true }) content!: TemplateRef<any>

  @Input() starting_players!: Player[]
  @Input() bench_players!: Player[]
  @Input() libero!: Player
  @Input() bench_libero!: Player
  @Input() changeCounter!: number
  @Input() doubleChangeCounter!: number

  @Output() swapLiberosClicked = new EventEmitter<void>()
  change_confirmed: boolean = false

  enteringPlayer!: Player
  exitingPlayer!: Player

  ngOnInit(): void {
    console.log('i giocatori sono', this.starting_players)
    console.log('commento di prova')
  }

  // Dopo la conferma del cambio
  changePlayers(): void {
    if (this.changeCounter > 0) {
      let index = this.starting_players.indexOf(this.exitingPlayer)
      this.starting_players[index] = this.enteringPlayer
      this.bench_players.splice( this.bench_players.indexOf(this.enteringPlayer), 1)
      this.bench_players.push(this.exitingPlayer)
    }
  }

  changeLiberos(): void {
    if (this.change_confirmed) 
      this.swapLiberosClicked.emit();
    this.change_confirmed = false;
  }

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-change-players', size: 'lg' });
  }
}
