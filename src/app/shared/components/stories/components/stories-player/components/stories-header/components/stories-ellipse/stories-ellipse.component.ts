import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
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
export class StoriesEllipseComponent implements OnChanges {
    @Input()
    public isActivated: boolean;

    @Input()
    public isPaused: boolean;

    @Input()
    public isFinished: boolean;

    public constructor(
        private elRef: ElementRef,
        private cdRef: ChangeDetectorRef,
        private render: Renderer2
    ) {}

    public ngOnInit(): void {}

    public ngOnChanges(changes: SimpleChanges): void {
        if ('isPaused' in changes) {
            if (changes['isPaused'].currentValue) {
                this.isPaused = true;
                this.cdRef.detectChanges();
                console.log('Pausou a animação...');
                console.log(changes['isPaused'].currentValue);
                return;
            }

            if (!changes['isPaused'].currentValue) {
                this.isPaused = false;
                this.cdRef.detectChanges();
                console.log('Running ...');
                console.log(changes['isPaused'].currentValue);
                return;
            }
        }
    }
}
