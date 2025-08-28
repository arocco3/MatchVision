import { Component, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Player } from '../../services/players.service';
import { ChangePlayersModalComponent } from "./changePlayersModal/changePlayersModal.component";

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [
    RouterModule,
    ChangePlayersModalComponent,
],
    templateUrl: './game.html',
    styleUrls: ['./game.scss']
})

export class GameComponent{

     @ViewChild(ChangePlayersModalComponent) changePlayersModal!: ChangePlayersModalComponent;

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

    score = {home: 0, guests: 0};

    // To insert a touch
    selectedPlayer: any = null;
    selectedFundamental: string = '';
    selectedOutcome: string = '';

    //players: Player[] = [];

    // players di prova sarbbero i titolari
    players: Player[] = [
        { id: 1, name: "Luca",   surname: "Rossi",   number: 1, role: "Setter"},
        { id: 2, name: "Marco",  surname: "Bianchi", number: 2, role: "Opposto" },
        { id: 3, name: "Gianni", surname: "Verdi",   number: 3, role: "Centrale"},
        { id: 4, name: "Paolo",  surname: "Neri",    number: 4, role: "Schiacciatore"},
        { id: 5, name: "Andrea", surname: "Russo",   number: 5, role: "Centrale"},
        { id: 6, name: "Matteo", surname: "Ferrari", number: 6, role: "Schiacciatore"}
    ];

    libero: Player = { id: 7, name: "Simone", surname: "Galli",  number: 7, role: "Libero"};

    // panchinari
    players_in_panchina: Player[] = [
        { id: 8, name: "1luca1",   surname: "Rossi",   number: 8, role: "Setter"},
        { id: 9, name: "Marco2",  surname: "Bianchi", number: 9, role: "Opposto" },
        { id: 10, name: "Gianni3r4", surname: "Verdi",   number: 10, role: "Centrale"},
        { id: 11, name: "Paolo34",  surname: "Neri",  number: 11, role: "Schiacciatore"},
        { id: 12, name: "Andrea34t3", surname: "Russo",   number: 12, role: "Centrale"},
        { id: 13, name: "Matteo3t3", surname: "Ferrari", number: 13, role: "Schiacciatore"}
    ];

    bench_libero: Player = { id: 14, name: "Simoneee", surname: "Galliiii",  number: 14, role: "Libero"};

    // To change players
    changeCounter: number = 3
    doubleChangeCounter: number = 2
    
    increaseScore(team: 'home' | 'guests') {
        this.score[team]++;
    }

    decreaseScore(team: 'home' | 'guests') {
        if (this.score[team] > 0) this.score[team]--;
    }

    // cancelLastAction(){}

    toggleEventMenu() {
        throw new Error('Method not implemented.');
    }

    insertTouch(p: Player) {
        console.log("Premuto su insertouch di", p.id, p.name );
    }

    // Rotation of players
    do_rotation(): void {
        const last = this.pos.pop();
        if (last) {
            this.pos.unshift(last);
        }
    }

    //change player
    openModalChangePlayers(): void {
        this.changePlayersModal.open();
    }

    swapLiberos(): void {
        let temp = this.libero
        this.libero = this.bench_libero
        this.bench_libero = temp
    }

    endSet() {
        // da implementare
    }
}

