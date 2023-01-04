import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoriesGroup } from 'src/app/shared/interfaces/stories-group.interface';

@Component({
    selector: 'app-stories-info',
    templateUrl: './stories-info.component.html',
    styleUrls: ['./stories-info.component.scss'],
})
export class StoriesInfoComponent {
    @Input()
    public storie: StoriesGroup;

    @Output()
    public changeClose: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public changeShared: EventEmitter<void> = new EventEmitter<void>();

    public share(): void {
        this.changeShared.emit();
    }

    public close(): void {
        this.changeClose.emit();
    }
}
