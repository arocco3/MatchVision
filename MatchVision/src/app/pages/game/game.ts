import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ChangePlayersModalComponent } from "./changePlayersModal/changePlayersModal.component"
import { NewTouchModalComponent } from "./newTouchModal/newTouchModal.component"
import { NewEventModalComponent } from './newEventModal/newEventModal.component'
import { Player, Role } from '../../Models/Player'
import { Event, EventType } from '../../Models/Event'
import { Touch } from '../../Models/Touch'
import { GlobalService } from '../../services/globalService'
import { TouchesService } from '../../services/touchesService'
import { Set } from '../../Models/Set'
import { SetsService } from '../../services/setsService'

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [
    RouterModule,
    ChangePlayersModalComponent,
    NewTouchModalComponent,
    NewEventModalComponent
],
    templateUrl: './game.html',
    styleUrls: ['./game.scss']
})

export class GameComponent implements OnInit{

    constructor(private touchesService: TouchesService,
        private setsService: SetsService,
                private cdr: ChangeDetectorRef, 
                public globalService: GlobalService) {}

    ngOnInit(): void {
        this.createSet()
    }

    @ViewChild(ChangePlayersModalComponent) changePlayersModal!: ChangePlayersModalComponent
    @ViewChild(NewTouchModalComponent) newTouchModal!: NewTouchModalComponent
    @ViewChild(NewEventModalComponent) newEventModal!: NewEventModalComponent

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

    libero_pos_left: [number, number] = [0, 99] // Libero
    libero_pos_right: [number, number] = [99, 99] // Libero
    libero_pos: [number, number][] = [this.libero_pos_left, this.libero_pos_right]

    score = {home: 0, guests: 0}

    // To insert a touch
    selectedPlayer!: Player
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

    // players di prova sarebbero i titolari
    players: Player[] = [
        { id: 1, name: "Luca",   surname: "Rossi",   number: 1, role: Role.SETTER },
        { id: 2, name: "Marco",  surname: "Bianchi", number: 2, role: Role.OPPOSITE_HITTER },
        { id: 3, name: "Gianni", surname: "Verdi",   number: 3, role: Role.MIDDLE_BLOCKER },
        { id: 4, name: "Paolo",  surname: "Neri",    number: 4, role: Role.OUTSIDE_HITTER },
        { id: 5, name: "Andrea", surname: "Russo",   number: 5, role: Role.MIDDLE_BLOCKER },
        { id: 6, name: "Matteo", surname: "Ferrari", number: 6, role: Role.OUTSIDE_HITTER }
    ]

    libero: Player = { id: 7, name: "Simone", surname: "Galli",  number: 7, role: Role.LIBERO};

    // panchinari
    players_in_panchina: Player[] = [
        { id: 8, name: "1luca1",   surname: "Rossi",   number: 8, role: Role.SETTER },
        { id: 9, name: "Marco2",  surname: "Bianchi", number: 9, role: Role.OPPOSITE_HITTER },
        { id: 10, name: "Gianni3r4", surname: "Verdi",   number: 10, role: Role.MIDDLE_BLOCKER },
        { id: 11, name: "Paolo34",  surname: "Neri",  number: 11, role: Role.OUTSIDE_HITTER },
        { id: 12, name: "Andrea34t3", surname: "Russo",   number: 12, role: Role.MIDDLE_BLOCKER },
        { id: 13, name: "Matteo3t3", surname: "Ferrari", number: 13, role: Role.OUTSIDE_HITTER }
    ]

    bench_libero: Player = { id: 14, name: "Simoneee", surname: "Galliiii",  number: 14, role: Role.LIBERO}

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
    newSet: Set = {
        id: 0,
        match: 0,
        number: 0,
        home_score: 0,
        guest_score: 0,
        players: [],
        player_ids: []
    }
    setNumber: number = 1
    
    increaseScore(team: 'home' | 'guests') {
        this.score[team]++;
    }

    decreaseScore(team: 'home' | 'guests') {
        if (this.score[team] > 0) this.score[team]--;
    }


    // Inserting a new touch for the player
    openNewTouchModal() {
        this.newTouchModal.open();
    }

    // Change players
    openChangePlayersModal(): void {
        this.changePlayersModal.open();
    }

    openNewEventModal(): void {
        this.newEventModal.open();
    }

    swapLiberos(): void {
        let temp = this.libero
        this.libero = this.bench_libero
        this.bench_libero = temp
    }
    
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
        console.log(this.touches.at(-1))
        this.touchesService.deleteTouch(id).subscribe({
            next: () => {
                console.log('Ultimo tocco eliminato')
                if(this.touches.length > 0){
                    this.touches.pop()
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
        if (currentSet.id){
            this.newTouch.set = currentSet.id}
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
    do_rotation(): void {
        const last = this.pos[this.index].pop();
        if (last) {
            this.pos[this.index].unshift(last);
        }
    }

    createSet(){
        const currentMatch = this.globalService.currentMatch();
        console.log(currentMatch)
        if (currentMatch) {
            this.newSet.match = currentMatch.id;
        }
        this.newSet.number = this.setNumber

        this.players.forEach((p => 
            this.newSet.player_ids.push(p.id)
        ))
        
        this.setsService.createSet(this.newSet).subscribe({
            next: (res) => {
                console.log("pree")
                this.globalService.currentSet.set(res);
                this.cdr.detectChanges()
                console.log(res)
            },
            error: (err) => console.error('Errore salvataggio nuovo set', err)
        }); 
        
        this.resetVariables()
    }

    resetVariables() {
        this.touches = []
        this.score.guests = 0
        this.score.home = 0

        this.changeCounter = 6
        this.doubleChangeCounter = 2
        this.leftTimeOuts = 3
        this.y_card_counter = 0
        this.r_card_counter = 0
    }

    endSet() {

        if (this.setNumber != 5) {
            this.setNumber = this.setNumber + 1
        } else {this.endMatch()}

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
        this.cdr.detectChanges()

        this.setsService.updateSet(currentSet.id, updatedScores).subscribe({
            next: (res) => {
                this.globalService.setCurrentSet(res)
                console.log("Set aggiornato con i punteggi:", res)
            },
            error: (err) => console.error("Errore aggiornamento set", err)
            });

    }

    endMatch() {
        this.globalService.resetAll()
    }
}