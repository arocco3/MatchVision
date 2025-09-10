import { ChangeDetectorRef, Component, EventEmitter, inject, Output, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { MatchesService } from '../../../services/matchesService';
import { Match } from '../../../Models/Match';
import { GlobalService } from '../../../services/globalService';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-new-match-modal',
    standalone: true,
    imports: [
        FormsModule,
        RouterModule
    ],
	templateUrl: './newMatchModal.component.html',
    styleUrls: ['./newMatchModal.component.scss']
})

export class NewMatchModalComponent {

    constructor(public globalService: GlobalService, private cdr: ChangeDetectorRef) {}
  
    @Output() matchCreated = new EventEmitter<void>();

    @ViewChild('content', { static: true }) content!: TemplateRef<any>;

    private matchesService = inject(MatchesService);
    private modalService = inject(NgbModal);
    public closeResult: WritableSignal<string> = signal('');

    newMatch: Match = {
        id: 0,
        name: '',
        team_id: 0,
        date: Date(),
        result: null
    }

    matchInfoSaved: boolean = false

    ngOnInit(): void {
        this.globalService.loadTeams();
    }

    // To open the modal
    public open() {
        this.modalService.open(this.content, { ariaLabelledBy: 'new-match-modal' }).result.then(
            (result) => {
            this.closeResult.set(`Closed with: ${result}`);
            },
            (reason) => {
            // this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
            },
        );
    }

    // To save the match
    public saveMatch(form: any, modal: any) {
        if (form.valid) {
            this.matchesService.createMatch(this.newMatch).subscribe({
                next: (res) => {
                    this.globalService.currentMatch.set(res) //set general current match
                    console.log("Dati partita salvata", this.globalService.currentMatch()) //
                    console.log("info", res)
                    this.globalService.getPlayersByTeamId(res.team_id).subscribe({
                        next: (playersRes) => {
                            this.globalService.currentPlayers.set(playersRes)
                            console.log("Player appena creat", this.globalService.currentPlayers())
                            this.matchCreated.emit()
                            this.cdr.detectChanges()
                        },
                        error: (playersErr) => console.error('Errore caricamento giocatori', playersErr)
                    })
                    // modal.close('Save click');
                },
                error: (err) => console.error('Errore salvataggio nuovo match', err)
            });
        // Reset form
        this.newMatch = { id: 0, name: '', team_id: 0, date: Date(), result: null };
        }
    }    
 
    
}