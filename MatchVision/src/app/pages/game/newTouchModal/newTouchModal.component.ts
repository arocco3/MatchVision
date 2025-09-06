import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../../Models/Player';

@Component({
    selector: 'app-new-touch-modal',
    standalone: true,
    imports: [
        FormsModule,
    ],
    templateUrl: './newTouchModal.component.html',
    styleUrls: ['./newTouchModal.component.scss']
})

export class NewTouchModalComponent{
    
    private modalService = inject(NgbModal)
    @ViewChild('content', { static: true }) content!: TemplateRef<any>
    
    @Output() newTouchCreated = new EventEmitter<{fundamental: string; outcome: string}>()
    @Input() player!: Player

    fundamental = ''
    outcome = ''

    open() {
        this.modalService.open(this.content, { ariaLabelledBy: 'modal-new-touch' })
	}

    notifyNewTouch(): void {
        this.newTouchCreated.emit({
            fundamental: this.fundamental,
            outcome: this.outcome
        })
        this.fundamental = ''
        this.outcome = ''
    }
}