import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stories-load',
    templateUrl: './stories-load.component.html',
    styleUrls: ['./stories-load.component.scss'],
})
export class StoriesLoadComponent {
    @Input()
    public load: boolean = true;
}
