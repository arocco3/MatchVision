import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../../services/players.service';

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

    @Input() touchType!: string
    @Input() touchQuality!: string
    @Input() player!: Player
    @Output() newTouchCreated = new EventEmitter<void>()

    notifyNewTouch(): void{
        this.newTouchCreated.emit()
    }

    open() {
		this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })
	}

}