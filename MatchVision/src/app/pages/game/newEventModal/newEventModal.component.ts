import { Component, Input, inject, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Event, EventType } from '../../../Models/Event'

@Component({
    selector: 'app-new-event-modal',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './newEventModal.component.html',
    styleUrl: './newEventModal.component.scss',
})
export class NewEventModalComponent {

    private modalService = inject(NgbModal)
    @ViewChild('content', { static: true }) content!: TemplateRef<any>
    @Output() newEventCreated = new EventEmitter<void>()

    @Input() eventOccurred!: Event
    
    open() {
        this.modalService.open(this.content, { ariaLabelledBy: 'modal-new-event'});
    }

    notifyNewEvent(): void {
        this.newEventCreated.emit()
    }

}
