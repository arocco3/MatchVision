import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-thanks',
    standalone: true,
    templateUrl: './thanks.html',
    styleUrls: ['./thanks.scss'],
    imports: [RouterModule]
})

export class ThanksComponent {
    title = 'Thanks';
}
