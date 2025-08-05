import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [
        RouterModule,
    ],
    templateUrl: './game.html',
    styleUrls: ['./game.scss']
})

export class GameComponent{

    // Coordinates [x%, y%]
    pos_1: [number, number] = [33, 75];
    pos_2: [number, number] = [80, 75];
    pos_3: [number, number] = [80, 50];
    pos_4: [number, number] = [80, 25];
    pos_5: [number, number] = [33, 25];
    pos_6: [number, number] = [33, 50];
    libero: [number, number] = [99, 99];

    score = {home: 0, guests: 0};
    selectedPlayer: any = null;
    selectedFundamental: string = '';
    selectedOutcome: string = '';
    players: any;
    
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

    insertTouch(arg0: any) {

    }

    endSet() {
        // da implementare
    }
}

