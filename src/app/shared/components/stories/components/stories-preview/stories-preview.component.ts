import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    InjectionToken,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoriesGroup } from 'src/app/shared/interfaces/stories-group.interface';
import { StoriesLink } from 'src/app/shared/interfaces/stories-link.interface';

export const NAVIGATOR = new InjectionToken<Navigator>(
  'An abstraction over window.navigator object',
  {
    factory: () => inject(Window).navigator,
  },
);

@Component({
    selector: 'app-stories-preview',
    templateUrl: './stories-preview.component.html',
    styleUrls: ['./stories-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class StoriesPreviewComponent implements OnChanges {
    /** Array contendo os dados dos stories */
    @Input()
    public stories: StoriesGroup[] = [];

    /** Duração do loading de cada stories */
    @Input()
    public duration: number = 5800;

    /** Habilita ou desabilita o autoplay dos stories */
    @Input()
    public autoplay: boolean = true;

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

    /** Interface Angular responsável por se desinscrever de um observable */
    public subscription: Subscription;

    /** Verifica se item possui link, caso possua, retorna o mesmo */
    public get getLinkFooter(): StoriesLink | undefined {
        return this.stories[this.currentStorie]?.items[this.currentSlide].link;
    }

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

        if (this.autoplay) {
            this.autoplayer();
        }
    }

    public close(): void {
        const previewEl = this.elRef.nativeElement as HTMLElement;
        const mainEl = previewEl.querySelector('main');
        this.render.removeClass(mainEl, 'open');

        this.stop(this.timerSetIntervalId);
        this.resetAllProps();
        this.resetCurrentStoryNumberUrl();
    }

    public async share(): Promise<any> {
        const navigator = window.navigator as any;
        const url = window.location.protocol + '//' + window.location.host + this.router.url;
        const data = {
            title: 'Compartilhamento do Storie',
            text: 'Envie o link para alguém que você queira que visualize.',
            url: url
        };

        try {
            await navigator.share(data);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    public goToKnowMore(url: string): void {
        if (url) {
            window.open(url, '_blank');
        }
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
    /** Método responsável por acionar o player automático do Storie */
    private autoplayer(): void {
        this.timerSetIntervalId = setInterval(() => {
            if (this.currentStorie <= this.amoutOfStories) {
                this.next();
            } else {
                clearInterval(this.timerSetIntervalId);
                this.close();
            }
        }, this.duration);
    }

    /** @internal */
    /** Método responsável por ouvir os parâmetros passados via URL e
     * seta seus valores recebidos para serem utilizados pela execução dos Stories.
     * */
    private observableIdStorie(): void {
        this.subscription = this.activeteRoute.queryParams.subscribe((params: any) => {
            if (params.storie && params.slide) {
                this.currentStorie = parseInt(params.storie);
                this.currentSlide = parseInt(params.slide);
                setTimeout(() => {
                    this.subscription.unsubscribe();
                }, 300);
            }
        });
    }

    /** @internal */
    /** Método responsável por reiniciar o autoplayer, iniciando o mesmo em outra instância */
    private reboot(timerout: any): void {
        clearInterval(timerout);

        if (this.autoplay) {
            this.autoplayer();
        }
    }

    /** @internal */
    /** Método responsável por parar o autoplayer */
    private stop(timerout: any): void {
        clearInterval(timerout);
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
