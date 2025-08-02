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
    pos_1: [number, number] = [75, 66];
    pos_2: [number, number] = [75, 20];
    pos_3: [number, number] = [50, 20];
    pos_4: [number, number] = [25, 20];
    pos_5: [number, number] = [25, 66];
    pos_6: [number, number] = [50, 66];
    libero: [number, number] = [99, 99];
}

