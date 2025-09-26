    import { Component, signal } from '@angular/core'
    import { RouterOutlet, RouterModule } from '@angular/router'
    import { FormsModule } from '@angular/forms'

    import { HeaderComponent } from './pages/header/header.component'
    import { FooterComponent } from './pages/footer/footer.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterModule,
        FormsModule,
        FooterComponent,
        HeaderComponent,
],
    templateUrl: './app.html',
    styleUrls: ['./app.scss', './pages/login/login.component.scss', './pages/dashboard/dashboard.component.scss']
})

export class App {
    protected readonly title = signal('MatchVision');
}
