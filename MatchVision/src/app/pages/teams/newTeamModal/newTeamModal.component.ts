import { Component, EventEmitter, inject, OnInit, Output, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { TeamsService } from '../../../services/teamsService';
import { Team } from '../../../Models/Team';
import { Player } from '../../../Models/Player';
import { GlobalService } from '../../../services/globalService';

@Component({
	selector: 'app-new-team-modal',
    standalone: true,
    imports: [FormsModule],
	templateUrl: './newTeamModal.component.html',
    styleUrls: ['./newTeamModal.component.scss']
})

export class NewTeamModalComponent implements OnInit{
    
    constructor(public globalService: GlobalService) {}
  
    private teamsService = inject(TeamsService);
    private modalService = inject(NgbModal);
    public closeResult: WritableSignal<string> = signal('');

    newTeam: Team = {
        id: 0,
        name: '',
        playersList: []
    }

    @Output() teamCreated = new EventEmitter<void>();

    @ViewChild('content', { static: true }) content!: TemplateRef<any>


    ngOnInit(): void {
        // get all players
        this.globalService.loadPlayers();
    }

    // To open the modal
    public open() {
        this.modalService.open(this.content, { ariaLabelledBy: 'new-team-modal' }).result.then(
            (result) => {
                this.closeResult.set(`Closed with: ${result}`);
            },
            (reason) => {
            // this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
            },
        );
    }

    // To save the team
    public saveTeam(form: any, modal: any) {
        if (form.valid) {
            this.teamsService.createTeam(this.newTeam).subscribe({
            next: (res) => {
                this.teamCreated.emit()
                console.log('Squadra salvata:', res)
                modal.close('Save click')
            },
            error: (err) => console.error('Errore salvataggio nuovo team', err)
            });
            // Reset form
            this.newTeam = { id: 0, name: '', playersList: [] }
        }
    }

    onCheckboxChange(event: any, player: Player): void {
        if(event.target.checked) {
            this.newTeam.playersList.push(player.id);console.log(this.newTeam.playersList)
        }
        else{
            this.newTeam.playersList = this.newTeam.playersList.filter(p => p !== player.id)
        }
    }

}