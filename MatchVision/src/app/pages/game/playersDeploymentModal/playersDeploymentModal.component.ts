import { Component, EventEmitter, inject, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../../Models/Player';
import { GlobalService } from '../../../services/globalService';

@Component({
    selector: 'app-players-deployment-modal',
    standalone: true,
    imports: [
        FormsModule,
    ],
    templateUrl: './playersDeploymentModal.component.html',
    styleUrls: ['./playersDeploymentModal.component.scss']
})

export class PlayersDeploymentModal implements OnInit {
    
    constructor(private globalService: GlobalService) {}
   
    private modalService = inject(NgbModal)

    @ViewChild('content', { static: true }) content!: TemplateRef<any>
    
    @Output() startingPlayersChosen = new EventEmitter<any>()

    allPlayers: Player[] = []
    startingPlayers: Player[] = []
    libero: Player | null = null
    benchLibero: Player | null = null
    benchPlayers: Player[] = []

    ngOnInit(): void {
        this.allPlayers = this.globalService.currentPlayers()
    }

    open() {
        this.modalService.open(this.content, { ariaLabelledBy: 'modal-players-deployment', size: 'lg'})
    }

    get availablePlayersForLibero(): Player[] {
        return this.allPlayers.filter(p => 
            !this.isStartingPlayerSelected(p)
        )
    }

    get availablePlayersForBench(): Player[] {
        return this.allPlayers.filter(p => 
            !this.isStartingPlayerSelected(p) &&
            !this.isLiberoSelected(p)
        )
    }

    toggleStartingPlayer(player: Player): void {
        const index = this.startingPlayers.findIndex(p => p.id === player.id)
        if (index > -1) {
            this.startingPlayers.splice(index, 1)
        } else {
            if (this.startingPlayers.length < 6) {
                this.startingPlayers.push(player)
            }
        }
    }

    toggleLibero(player: Player): void {
        if (this.libero && this.libero.id === player.id) {
            this.libero = null
        } else {
            this.libero = player
        }
    }

    toggleBenchLibero(player: Player): void {
        if (this.benchLibero && this.benchLibero.id === player.id) {
            this.benchLibero = null
        } else {
            this.benchLibero = player
        }
    }

    isStartingPlayerSelected(player: Player): boolean {
        return this.startingPlayers.some(p => p.id === player.id)
    }
    
    isLiberoSelected(player: Player): boolean {
        return this.libero?.id === player.id
    }
    
    isBenchLiberoSelected(player: Player): boolean {
        return this.benchLibero?.id === player.id
    }
    
    confirm(): void {
        if (this.startingPlayers.length !== 6) {
            alert('Devi selezionare esattamente 6 giocatori titolari.')
            return
        }

        this.benchPlayers = this.allPlayers.filter(p =>
            !this.isStartingPlayerSelected(p) &&
            !this.isLiberoSelected(p) &&
            !this.isBenchLiberoSelected(p)
        )
        
        console.log('Titolari:', this.startingPlayers)
        console.log('Libero:', this.libero)
        console.log('Libero di riserva:', this.benchLibero)
        console.log('Panchinari:', this.benchPlayers)
        
        this.startingPlayersChosen.emit({ startingPlayers: this.startingPlayers, libero: this.libero, benchLibero: this.benchLibero, benchPlayers: this.benchPlayers })

        this.startingPlayers = []
        this.libero = null
        this.benchLibero = null
        this.benchPlayers = []
    }


}