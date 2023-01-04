import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
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

    public constructor() {}

    public pauseStorie(): void {
        console.log(this.storie);
    }
}
