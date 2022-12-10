import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { StoriesGroup } from 'src/app/shared/interfaces/stories-group.interface';

@Component({
    selector: 'app-stories-preview',
    templateUrl: './stories-preview.component.html',
    styleUrls: ['./stories-preview.component.scss'],
})
export class StoriesPreviewComponent
    implements OnInit, OnChanges, AfterViewInit
{
    @Input()
    public stories: StoriesGroup[] = [];

    @Input()
    public duration: number = 5800;

    /** Habilita o loading antes de carregar o conteúdo do stories */
    public loading: boolean = true;

    /** Contabiliza a quantidade de slides */
    public amoutOfSlide: number = 0;

    /** Informa o slides que está rodando atualmente */
    public currentSlide: number = 0;

    /** Guarda os ids gerados pelo setinterval */
    public timerSetIntervalId: any;

    public constructor(
        private render: Renderer2,
        private elRef: ElementRef,
        private router: Router
    ) {}

    public ngOnInit(): void {}

    public ngOnChanges(changes: SimpleChanges): void {
        if ('stories' in changes) {
            if (changes['stories'].currentValue.length > 0) {
                this.loading = false;
                this.open();
            }
        }
    }

    public ngAfterViewInit(): void {}

    public open(): void {
        const previewEl = this.elRef.nativeElement as HTMLElement;
        const mainEl = previewEl.querySelector('main');
        this.render.addClass(mainEl, 'open');

        this.getAmountOfSlide();
        this.autoplayer();
    }

    public close(): void {
        const previewEl = this.elRef.nativeElement as HTMLElement;
        const mainEl = previewEl.querySelector('main');
        this.render.removeClass(mainEl, 'open');

        this.stop(this.timerSetIntervalId);
        this.resetAllProps();
        this.resetCurrentStoryNumberUrl();
    }

    public autoplayer(): void {
        this.timerSetIntervalId = setInterval(() => {
            if (this.currentSlide < this.amoutOfSlide) {
                this.next();
            } else {
                clearInterval(this.timerSetIntervalId);
                this.close();
            }
        }, this.duration);
    }

    public reboot(timerout: any): void {
        clearInterval(timerout);
        this.autoplayer();
    }

    public stop(timerout: any): void {
        clearInterval(timerout);
    }

    public next(): void {
        if (this.currentSlide < this.amoutOfSlide) {
            this.currentSlide++;
            this.setCurrentStoryNumberUrl(this.currentSlide);
            this.reboot(this.timerSetIntervalId);
        } else {
            this.close();
        }
    }

    public previous(): void {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.setCurrentStoryNumberUrl(this.currentSlide);
            this.reboot(this.timerSetIntervalId);
        }
    }

    /** @internal */
    private getAmountOfSlide(): void {
        this.amoutOfSlide = this.stories[0].items.length - 1;
    }

    /** @internal */
    /** Reseta todas as props ao fechar */
    private resetAllProps(): void {
        this.amoutOfSlide = 0;
        this.currentSlide = 0;
    }

    /** Seta o número do storie que está sendo exibido no momento na URL */
    private setCurrentStoryNumberUrl(currentStorie: number): void {
        this.router.navigate(['/'], {
            queryParams: {
                storie: currentStorie,
            },
        });
    }

    /** Reseta o número do storie que está sendo exibido no momento na URL */
    private resetCurrentStoryNumberUrl(): void {
        this.router.navigate(['/'], {
            queryParams: {},
        });
    }
}
