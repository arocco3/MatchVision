import { Component, Input, OnInit, inject, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Player } from '../../../Models/Player'

@Component({
    selector: 'app-change-players-modal',
    standalone: true,
    imports: [],
    templateUrl: './changePlayersModal.component.html',
    styleUrl: './changePlayersModal.component.scss',
})

export class ChangePlayersModalComponent {
    private modalService = inject(NgbModal)
    @ViewChild('content', { static: true }) content!: TemplateRef<any>

    @Input() starting_players!: Player[]
    @Input() bench_players!: Player[]
    @Input() libero!: Player | null
    @Input() bench_libero!: Player | null
    // @Input() changeCounter!: number
    // @Input() doubleChangeCounter!: number
    
    @Output() changeOccurred = new EventEmitter<void>()
    @Output() doubleChangeOccurred = new EventEmitter<void>()
    @Output() swapLiberosClicked = new EventEmitter<void>()

    enteringPlayers: Player[] = []
    exitingPlayers: Player[] = []
    changePlayersOccurring: boolean = false

    // Dopo la conferma del cambio
    changePlayers(): void {
        if(this.exitingPlayers.length <= 2 && this.enteringPlayers.length <= 2){
            if ((this.exitingPlayers[0] != this.exitingPlayers[1]) && (this.enteringPlayers[0] != this.enteringPlayers[1])){
                if(this.exitingPlayers.length === this.enteringPlayers.length){
                    this.exitingPlayers.forEach((p, index) => {
                        let pos = this.starting_players.indexOf(p) // To maintain the rotation
                        this.starting_players[pos] = this.enteringPlayers[index]
                        this.bench_players.splice(this.bench_players.indexOf(this.enteringPlayers[index]), 1)
                        this.bench_players.push(p)
                    })
                    if (this.exitingPlayers.length === 2 && this.enteringPlayers.length === 2)
                        this.doubleChangeOccurred.emit()
                    else if (this.exitingPlayers.length === 1 && this.enteringPlayers.length === 1)
                        this.changeOccurred.emit()
                }
                else{}
            }
            else{}
        }
        else{}
        this.changePlayersOccurring = false
    }

    changeLiberos(): void {
        this.swapLiberosClicked.emit()
    }

    open() {
        this.modalService.open(this.content, { ariaLabelledBy: 'modal-change-players', size: 'lg' });
        this.exitingPlayers = []
        this.enteringPlayers = []
    }
}
