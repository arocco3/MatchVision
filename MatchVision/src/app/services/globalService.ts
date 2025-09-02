
import { Injectable } from "@angular/core"
import { Player } from "../Models/Player"

@Injectable({
  providedIn: 'root' 
})

export class GlobalService {

    playersList: Player[] = []
    
}

