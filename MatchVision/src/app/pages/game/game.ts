import { Component, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ChangePlayersModalComponent } from "./changePlayersModal/changePlayersModal.component"
import { NewTouchModalComponent } from "./newTouchModal/newTouchModal.component"
import { NewEventModalComponent } from './newEventModal/newEventModal.component'
import { Player, Role } from '../../Models/Player'
import { Event, EventType } from '../../Models/Event'

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

export class GameComponent{

     @ViewChild(ChangePlayersModalComponent) changePlayersModal!: ChangePlayersModalComponent
     @ViewChild(NewTouchModalComponent) newTouchModal!: NewTouchModalComponent
     @ViewChild(NewEventModalComponent) newEventModal!: NewEventModalComponent

    // Coordinates [x%, y%]
    pos: [number, number][] = [
        [15, 80], // pos 1
        [42, 80], // pos 2
        [42, 50], // pos 3
        [42, 20], // pos 4
        [15, 20], // pos 5
        [15, 50], // pos 6
    ];

    libero_pos: [number, number] = [0, 99] // Libero

    score = {home: 0, guests: 0}

    // To insert a touch
    selectedPlayer!: Player
    selectedFundamental!: string
    selectedOutcome!: string

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
    
    increaseScore(team: 'home' | 'guests') {
        this.score[team]++;
    }

    decreaseScore(team: 'home' | 'guests') {
        if (this.score[team] > 0) this.score[team]--;
    }


    // Inserting a new touch for the player
    openNewTouchModal(p: Player) {
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

    registerNewEvent(): void {
        switch(this.eventOccurred.event_type) {
            case EventType.TECHNICAL_TIMEOUT:
                this.leftTimeOuts--
                break
            case EventType.YELLOW_CARD:
                 this.y_card_counter++
                break
            case EventType.RED_CARD:
                 this.r_card_counter++
                break
            case EventType.DOUBLE_FAULT:
                //cancelLastAction() annulla le ultime azioni 
                break
        }
        this.eventOccurred = {event_type: ''}
    }

    registerNewTouch(): void {
        // this.selectedPlayer
        // this.selectedFundamental
        // this.selectedOutcome
    }

    // cancelLastAction(){}

    // Rotation of players
    do_rotation(): void {
        const last = this.pos.pop();
        if (last) {
            this.pos.unshift(last);
        }
    }

    endSet() {
        // da implementare
    }
}

