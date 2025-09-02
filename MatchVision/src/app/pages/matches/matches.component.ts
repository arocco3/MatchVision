import { Component, OnInit, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatchesService } from '../../services/matchesService'
import { NewMatchModalComponent } from './newMatchModal/newMatchModal.component';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [
    RouterModule,
    NewMatchModalComponent
],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})

export class MatchesComponent implements OnInit{

  @ViewChild(NewMatchModalComponent) newMatchModal!: NewMatchModalComponent

  constructor(matchesService: MatchesService) {}
  
  ngOnInit(): void {  }

  openNewMatchrModal(){
    this.newMatchModal.open();
  }

  closeNewMatchModal() {
    console.log(this.newMatchModal.closeResult);
  }


}
