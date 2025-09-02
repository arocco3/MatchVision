import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, OnInit, Output, QueryList, signal, TemplateRef, ViewChild, ViewChildren, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { TeamsService } from '../../../services/teamsService';
import { Team } from '../../../Models/Team';
import { Player } from '../../../Models/Player';

@Component({
	selector: 'app-new-team-modal',
    standalone: true,
    imports: [FormsModule],
	templateUrl: './newTeamModal.component.html',
    styleUrls: ['./newTeamModal.component.scss']
})

export class NewTeamModalComponent implements OnInit{
  
    private teamsService = inject(TeamsService);
    private modalService = inject(NgbModal);
    public closeResult: WritableSignal<string> = signal('');

    newTeam: Team = {
        id: 0,
        name: '',
        playersList: []
    }

    allPlayers!: Player[] // All inserted players in db

    @Output() teamCreated = new EventEmitter<void>();

    @ViewChild('content', { static: true }) content!: TemplateRef<any>

    constructor(private cdr: ChangeDetectorRef){}

    ngOnInit(): void {
        // get all players
        this.loadPlayers();
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
        console.log("i player della nuova squadra di nome", this.newTeam.name, "sono", this.newTeam.playersList)
        if (form.valid) {
            this.teamsService.createTeam(this.newTeam).subscribe({
            next: (res) => {
                this.teamCreated.emit();
                console.log('Squadra salvata:', res);
                modal.close('Save click');
            },
            error: (err) => console.error('Errore salvataggio nuovo team', err)
            });
            // Reset form
            this.newTeam = { id: 0, name: '', playersList: [] };
        }
    }

      // To delete a specific player
    deleteTeam(id: any){
        this.teamsService.deleteTeam(id).subscribe({
        next: () => {
            console.log('Team eliminato');
            // this.loadTeams();
        },
        error: (err) => console.error('Errore eliminazione team', err)
        })
    }

    loadPlayers() {
        this.teamsService.getPlayers().subscribe({
            next: (data) => {
                console.log(data);
                this.allPlayers = data;
                this.cdr.detectChanges(); // Forces data refresh
            },
            error: (err) => console.error('Errore caricamento players', err)
        });
    }

    onCheckboxChange(event: any, player: Player): void {
        if(event.target.checked)
            {this.newTeam.playersList.push(player.id);console.log(this.newTeam.playersList)
        }

        else
            this.newTeam.playersList = this.newTeam.playersList.filter(p => p !== player.id)
    }

}