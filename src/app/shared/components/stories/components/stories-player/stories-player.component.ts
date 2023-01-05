import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { StoriesGroup } from 'src/app/shared/interfaces/stories-group.interface';

@Component({
    selector: 'app-stories-player',
    templateUrl: './stories-player.component.html',
    styleUrls: ['./stories-player.component.scss'],
})
export class StoriesPlayerComponent {
    @Input()
    public storie: StoriesGroup;

    @Input()
    public isActived: boolean = false;

    @Input()
    public wasSeen: boolean = false;

    @Input()
    public activateLoading: boolean = true;

    @Input()
    public currentSlide: number;

    @Output()
    public closeChanges: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public changeShared: EventEmitter<void> = new EventEmitter<void>();

    public constructor() {}

    public pauseStorie(): void {
        console.log(this.storie);
    }
}
