import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesGroup } from 'src/app/shared/interfaces/stories-group.interface';

@Component({
    selector: 'app-stories-preview',
    templateUrl: './stories-preview.component.html',
    styleUrls: ['./stories-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class StoriesPreviewComponent implements OnChanges {
    @Input()
    public stories: StoriesGroup[] = [];

    @Input()
    public duration: number = 5800;

    /** Habilita o loading antes de carregar o conteúdo do stories */
    public loading: boolean = true;

    /** Contabiliza a quantidade de slides */
    public amoutOfSlide: number = 0;

    /** Contabiliza a quantidade de stories */
    public amoutOfStories: number = 0;

    /** Informa o slides que está rodando atualmente */
    public currentSlide: number = 0;

    /** Informa o grupo de slides apresentado atualmente */
    public currentStorie: number = 0;

    /** Guarda os ids gerados pelo setinterval */
    public timerSetIntervalId: any;

    public constructor(
        private render: Renderer2,
        private elRef: ElementRef,
        private router: Router,
        private activeteRoute: ActivatedRoute
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if ('stories' in changes) {
            if (changes['stories'].currentValue.length > 0) {
                this.open();
            }
        }
    }

    public open(): void {
        const previewEl = this.elRef.nativeElement as HTMLElement;
        const mainEl = previewEl.querySelector('main');
        this.render.addClass(mainEl, 'open');

        this.getAmountOfStories();
        this.getAmountOfSlide();
        this.observableIdStorie();
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
            if (this.currentStorie <= this.amoutOfStories) {
                this.next();
            } else {
                clearInterval(this.timerSetIntervalId);
                this.close();
            }
        }, this.duration);
    }

    public observableIdStorie(): void {
        let i = 0;
        this.activeteRoute.queryParams.subscribe((param: any) => {
            if (param.storie !== i) {
                i = param.storie;
                // this.scrollItemPreview(param.storie);
            }
        });
    }

    public reboot(timerout: any): void {
        clearInterval(timerout);
        this.autoplayer();
    }

    public stop(timerout: any): void {
        clearInterval(timerout);
    }

    public next(): void {
        if (this.currentStorie < this.amoutOfStories) {
            if (
                this.currentSlide <
                this.stories[this.currentStorie].items.length - 1
            ) {
                this.currentSlide++;
                this.setCurrentSlideNumberUrl(this.currentSlide);
                this.reboot(this.timerSetIntervalId);
            } else if (
                this.currentSlide >=
                this.stories[this.currentStorie].items.length - 1
            ) {
                this.currentSlide = 0;
                this.currentStorie++;
                this.setCurrentStoreNumberUrl(this.currentStorie);
                this.setCurrentSlideNumberUrl(this.currentSlide);
                this.reboot(this.timerSetIntervalId);
            } else {
                this.close();
            }
        } else {
            this.close();
        }
    }

    public previous(): void {
        if (this.currentStorie > 0 || this.currentSlide > 0) {
            if (this.currentSlide > 0) {
                this.currentSlide--;
                this.setCurrentSlideNumberUrl(this.currentSlide);
                this.reboot(this.timerSetIntervalId);
            } else if (this.currentSlide == 0 && this.currentStorie > 0) {
                this.currentSlide = this.stories[this.currentStorie - 1].items.length - 1;
                this.currentStorie--;
                this.setCurrentStoreNumberUrl(this.currentStorie);
                this.setCurrentSlideNumberUrl(this.currentSlide);
                this.reboot(this.timerSetIntervalId);
            }
        } else {
            this.close();
        }
    }

    /** @internal */
    /** Pega todos os slides de cada stories */
    private getAmountOfSlide(): void {
        this.stories.forEach((storie: StoriesGroup) => {
            this.amoutOfSlide = this.amoutOfSlide + storie.items.length - 1;
        });
    }

    /** @internal */
    /** Pega todos os stories */
    private getAmountOfStories(): void {
        this.amoutOfStories = this.amoutOfStories + this.stories.length;
    }

    /** @internal */
    /** Reseta todas as props ao fechar */
    private resetAllProps(): void {
        this.amoutOfStories = 0;
        this.amoutOfSlide = 0;
        this.currentSlide = 0;
        this.currentStorie = 0;
        this.stories = [];
        this.loading = false;
    }

    /** Seta o número do storie que está sendo exibido no momento na URL */
    private setCurrentSlideNumberUrl(currentSlide: number): void {
        this.router.navigate([this.router.url.split('?')[0]], {
            queryParams: {
                storie: this.currentStorie,
                slide: currentSlide,
            },
        });
    }

    /** Seta o número do storie que está sendo exibido no momento na URL */
    private setCurrentStoreNumberUrl(currentStore: number): void {
        this.router.navigate([this.router.url.split('?')[0]], {
            queryParams: {
                storie: currentStore,
                slide: this.currentSlide,
            },
        });
    }

    /** Reseta o número do storie que está sendo exibido no momento na URL */
    private resetCurrentStoryNumberUrl(): void {
        this.router.navigate([this.router.url.split('?')[0]], {
            queryParams: {},
        });
    }
}
