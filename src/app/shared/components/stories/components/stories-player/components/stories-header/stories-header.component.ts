import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoriesGroup } from 'src/app/shared/interfaces/stories-group.interface';
import { StoriesItems } from 'src/app/shared/interfaces/stories-items.interface';

@Component({
    selector: 'app-stories-header',
    templateUrl: './stories-header.component.html',
    styleUrls: ['./stories-header.component.scss'],
})
export class StoriesHeaderComponent {
    @Input()
    public storie: StoriesGroup;

    @Input()
    public amountOfStorieSlides: StoriesItems[] = [];

    @Input()
    public currentSlide: number;

    @Output()
    public closeChanges: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public changeShared: EventEmitter<void> = new EventEmitter<void>();
}
