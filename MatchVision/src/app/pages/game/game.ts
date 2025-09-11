import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ChangePlayersModalComponent } from "./changePlayersModal/changePlayersModal.component"
import { NewTouchModalComponent } from "./newTouchModal/newTouchModal.component"
import { NewEventModalComponent } from './newEventModal/newEventModal.component'
import { PlayersDeploymentModal } from './playersDeploymentModal/playersDeploymentModal.component'

import { Player } from '../../Models/Player'
import { Event, EventType } from '../../Models/Event'
import { Touch } from '../../Models/Touch'
import { Set } from '../../Models/Set'

import { TouchesService } from '../../services/touchesService'
import { SetsService } from '../../services/setsService'
import { GlobalService } from '../../services/globalService'
import { MatchesService } from '../../services/matchesService'

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [
        RouterModule,
        ChangePlayersModalComponent,
        NewTouchModalComponent,
        NewEventModalComponent,
        PlayersDeploymentModal
    ],
    templateUrl: './game.html',
    styleUrls: ['./game.scss']
})

export class GameComponent implements OnInit{

    constructor(private touchesService: TouchesService,
        private setsService: SetsService,
        private matchesService: MatchesService,
        public globalService: GlobalService,
        private cdr: ChangeDetectorRef) {}

    @ViewChild(ChangePlayersModalComponent) changePlayersModal!: ChangePlayersModalComponent
    @ViewChild(NewTouchModalComponent) newTouchModal!: NewTouchModalComponent
    @ViewChild(NewEventModalComponent) newEventModal!: NewEventModalComponent
    @ViewChild(PlayersDeploymentModal) playersDeploymentModal!: PlayersDeploymentModal
                
        // Coordinates [x%, y%]
    left_pos: [number, number][] = [
        [15, 80], // pos 1
        [42, 80], // pos 2
        [42, 50], // pos 3
        [42, 20], // pos 4
        [15, 20], // pos 5
        [15, 50], // pos 6
    ];
    right_pos: [number, number][] = [
        [85, 20], // pos 1
        [58, 20], // pos 2
        [58, 50], // pos 3
        [58, 80], // pos 4
        [85, 80], // pos 5
        [85, 50], // pos 6
    ];
    index: number = 0
    pos: [number, number][][] = [this.left_pos, this.right_pos]

    libero_pos_left: [number, number] = [0, 95] // Libero
    libero_pos_right: [number, number] = [99, 95] // Libero
    libero_pos: [number, number][] = [this.libero_pos_left, this.libero_pos_right]

    score = {home: 0, guests: 0}

    // To insert a touch
    selectedPlayer!: Player | null
    newTouch: Touch = {
        id: -1,
        set: -1, 
        player: -1,
        fundamental: "",
        outcome: "" 
    }
    touches: Touch[] = []
    last_touch_fundamental: string | undefined = ''
    last_touch_id: number | undefined = -1

    // all players
    players: Player[] = []

    starting_players: Player[] = []
    libero: Player | null = null

    // in panchina
    bench_players: Player[] = []
    bench_libero: Player | null = null
    
    // Counters
    // To change players
    changeCounter: number = 6
    doubleChangeCounter: number = 2
    // To register events
    leftTimeOuts: number = 3
    y_card_counter: number = 0
    r_card_counter: number = 0
    
    eventOccurred: Event = {event_type: ''}
    
    // To save sets
    newSet!: Set
    setNumber: number = 1
    endSetClicked: boolean = false
    
    // To save match
    results: { home_score: number; guest_score: number }[] = []
    isEndOfMatch: boolean = false
    
    ngOnInit(): void {
        this.players = this.globalService.currentPlayers()
        const currentMatch = this.globalService.currentMatch()
        console.log("dati partita corrente", currentMatch)
        this.startNewSet()
    }

    increaseScore(team: 'home' | 'guests') { this.score[team]++ }

    decreaseScore(team: 'home' | 'guests') { if (this.score[team] > 0) this.score[team]-- }


    // Inserting a new touch for the player
    openNewTouchModal() { this.newTouchModal.open() }

    // Change players
    openChangePlayersModal(): void { this.changePlayersModal.open() }

    openNewEventModal(): void { this.newEventModal.open() }

    openPlayersDeploymentModal() { this.playersDeploymentModal.open() }

    swapLiberos(): void {
        let temp = this.libero
        this.libero = this.bench_libero
        this.bench_libero = temp }
    
    togglePos(): void {
        this.index = this.index === 0 ? 1 : 0
        this.cdr.detectChanges()
    }

    
    registerNewEvent(): void {
        switch(this.eventOccurred.event_type) {
            case EventType.TECHNICAL_TIMEOUT:
                if(this.leftTimeOuts > 0)
                    this.leftTimeOuts--
                break
            case EventType.YELLOW_CARD:
                this.y_card_counter++
                break
            case EventType.RED_CARD:
                this.r_card_counter++
                break
            case EventType.DOUBLE_FAULT:
                this.cancelLastAction()
                break
        }
        this.eventOccurred = {event_type: ''}
    }
    
    cancelLastAction(): void {
        for (let i = this.touches.length - 1; i >= 0; i--) {
            if (this.touches[i].fundamental === 'Battuta'){
                this.cancelLastTouch(this.touches[i].id)
                break
            }
            this.cancelLastTouch(this.touches[i].id)
        }
    }

    // Delete last touch
    cancelLastTouch(id: number | undefined): void {
        this.touchesService.deleteTouch(id).subscribe({
            next: () => {
                if(this.touches.length > 0){
                    this.touches.pop()
                    console.log('Ultimo tocco eliminato')
                    this.cdr.detectChanges()
                    if(this.touches.length > 0){
                        this.last_touch_fundamental = this.touches.at(-1)?.fundamental
                        this.last_touch_id = this.touches.at(-1)?.id
                        this.cdr.detectChanges()
                    }
                }
            },
            error: (err) => console.error('Errore eliminazione ultimo tocco', err)
        })
    }

    // Create new touch
    registerNewTouch(event: {fundamental: string; outcome: string}): void {
        const currentSet = this.globalService.currentSet()
        if(!currentSet) {
            console.log("Nessun set iniziato")
            return
        } 
        if (currentSet.id)
            this.newTouch.set = currentSet.id
        if(this.selectedPlayer)
            this.newTouch.player = this.selectedPlayer.id
        this.newTouch.fundamental = event.fundamental
        this.newTouch.outcome = event.outcome
        // if form is valid
        if((this.newTouch.fundamental != "") && (this.newTouch.outcome != "")) {
            this.touchesService.createTouch(this.newTouch).subscribe({
                next: (res) => {
                    console.log(res)
                    this.last_touch_fundamental = res.fundamental
                    this.last_touch_id = res.id
                    this.touches.push(res)
                    this.cdr.detectChanges()
                },
                error: (err) => console.error('Errore salvataggio nuovo tocco', err)
            });
            this.newTouch = {id: -1, set: -1, player: -1, fundamental: '', outcome: ''}
        }
    }

    // Rotation of players
    doRotation(): void {
        const last = this.pos[this.index].pop();
        if (last) {
            this.pos[this.index].unshift(last);
        }
    }

    assignPlayers(event: any) {
        this.starting_players = event.startingPlayers
        this.libero = event.libero
        this.bench_players = event.benchPlayers
        this.bench_libero = event.benchLibero
    }

    startNewSet(){
        const currentMatch = this.globalService.currentMatch()
        if (!currentMatch) {
            console.log("Errore: nessun match trovato con questo id")
            return
        }

        const teamPlayers: number[] = []
        this.players.forEach((p, index) => teamPlayers.push(p.id))
        this.bench_players.forEach((p, index) => teamPlayers.push(p.id))
        if (this.libero) {
            teamPlayers.push(this.libero.id)
            if(this.bench_libero){
                teamPlayers.push(this.bench_libero.id)
        }}

        this.newSet = {
            id: null,
            match: currentMatch.id,
            number: this.setNumber,
            home_score: 0,
            guest_score: 0,
            players: [],
            player_ids: teamPlayers
        }
        
        this.createSet(this.newSet)
        
    }
    
    createSet(set: Set) {
        
        if((this.score.home === 0 && this.score.guests === 0) && this.setNumber != 1){  
            return
        }else{  
            this.setsService.createSet(this.newSet).subscribe({
                next: (res) => {
                    this.globalService.currentSet.set(res);
                    this.cdr.detectChanges()
                    console.log(res)
                    this.resetVariables()
                },
                error: (err) => console.error('Errore salvataggio nuovo set', err)
            }); 
        }
    }

    resetVariables() {

        this.starting_players = []
        this.libero = null
        this.bench_libero = null
        this.bench_players  = []

        this.touches = []
        this.score.guests = 0
        this.score.home = 0

        this.changeCounter = 6
        this.doubleChangeCounter = 2
        this.leftTimeOuts = 3
        this.y_card_counter = 0
        this.r_card_counter = 0

        this.isEndOfMatch = false
        this.endSetClicked = false

        this.cdr.detectChanges()
    }

    handleNextSet() {
        if (this.setNumber < 5) {
            this.setNumber = this.setNumber + 1
        } else {return}
    }

    endSet() {
        // Update set
        const currentSet = this.globalService.currentSet()
        if(!currentSet || !currentSet.id){
            console.log("Errore assegnazione set, update")
            return
        }
    
        const updatedScores = {
            home_score: this.score.home,
            guest_score: this.score.guests
        }
        if (!this.isEndOfMatch){
            this.results = [...this.results, updatedScores]
        }
        this.cdr.detectChanges()

        this.setsService.updateSet(currentSet.id, updatedScores).subscribe({
            next: (res) => {
                console.log("Set aggiornato con i punteggi:", res)
                    if(!this.isEndOfMatch)
                        this.handleNextSet()
            },
            error: (err) => console.error("Errore aggiornamento set", err)
        });
    }

    updateMatchResults(results: { home_score: number; guest_score: number }[]) {
        const match = this.globalService.currentMatch()
        if(!match || !match.id)
            console.log("Errore: nessun match a cui aggiornare i risultati", match?.id)
        else
        this.matchesService.updateMatch(match.id, { results: results }).subscribe({
            next: (res) => {
                this.globalService.currentMatch.set(res)
                this.cdr.detectChanges()
                console.log("Risultati aggiornati:", res.result)
                this.globalService.resetAll()
            },
            error: (err) => console.error("Errore update match results", err)
    })
    }

    endMatch() {
        this.isEndOfMatch = !this.isEndOfMatch
        this.endSet()
        this.updateMatchResults(this.results)
    }
}