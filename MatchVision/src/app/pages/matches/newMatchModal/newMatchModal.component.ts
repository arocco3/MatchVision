import { Component, EventEmitter, inject, Output, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { MatchesService } from '../../../services/matchesService';
import { Match } from '../../../Models/Match';

@Component({
	selector: 'app-new-match-modal',
    standalone: true,
    imports: [FormsModule],
	templateUrl: './newMatchModal.component.html',
    styleUrls: ['./newMatchModal.component.scss']
})

export class NewMatchModalComponent {
  
    private matchesService = inject(MatchesService);
    private modalService = inject(NgbModal);
    public closeResult: WritableSignal<string> = signal('');

    newMatch: Match = {
        id: 0,
        name: '',
        team1: '',
        team2: '',
        date: '',
        result: ''
    }

    @Output() matchCreated = new EventEmitter<void>();

    @ViewChild('content', { static: true }) content!: TemplateRef<any>;

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

    // To save the team
    public saveMatch(form: any, modal: any) {
        if (form.valid) {
            this.matchesService.createMatch(this.newMatch).subscribe({
            next: (res) => {
                this.matchCreated.emit();
                console.log('Giocatore salvato:', res);
                modal.close('Save click');
            },
            error: (err) => console.error('Errore salvataggio nuovo match', err)
            });
            // Reset form
            this.newMatch = { id: 0, name: '', team1: null, team2: null, date: Date(), result: null };
        }
    }
        
}