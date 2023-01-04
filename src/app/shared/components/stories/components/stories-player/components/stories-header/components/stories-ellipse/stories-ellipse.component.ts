import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
    selector: 'app-stories-ellipse',
    templateUrl: './stories-ellipse.component.html',
    styleUrls: ['./stories-ellipse.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animate', [
            state('initial', style({
                width: '0%',
                height: '100%',
                backgroundColor: 'white'
            })),
            state('finish', style({
                width: '100%',
                height: '100%',
                backgroundColor: 'white'
            })),
            transition('initial => finish', animate('5800ms linear', keyframes([
                style({ width: '0%', backgroundColor: 'white' }),
                style({ width: '100%', backgroundColor: 'white' })
            ]))),
            transition('finish => initial', animate('5800ms linear', keyframes([
                style({ width: '100%', backgroundColor: 'white' }),
                style({ width: '0%', backgroundColor: 'white' })
            ]))),
        ])
    ]
})
export class StoriesEllipseComponent {
    @Input()
    public isActivated: boolean;

    @Input()
    public isFinished: boolean;

    public constructor() {}

    public ngOnInit(): void {}
}
