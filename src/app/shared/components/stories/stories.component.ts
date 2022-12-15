import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoriesGroup } from '../../interfaces/stories-group.interface';
import { StoriesMock } from '../../mock/stories.mock';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
    /** Entrada dos dados de stories */
    @Input()
    public stories: StoriesGroup[] = StoriesMock;

    /**
     * Responsável por guardar e enviar os stories
     * selecionados para o componente de visualização
     * */
    public selectedStories: StoriesGroup[] = [];

    /** Interface Angular responsável por se desinscrever de um observable */
    public subscription: Subscription;

    public constructor(
        private router: Router,
        private activedRouter: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.subscription = this.activedRouter.queryParams.subscribe((params: any) => {
            if (params.storie) {
                const storieID: number = parseInt(params.storie);
                const slideID: number = parseInt(params.slide);
                this.open(storieID, slideID);

                setTimeout(() => {
                    this.subscription.unsubscribe();
                }, 300);
            }
        });
    }

    public open(storieID: number, slideID?: number): void {
        this.selectedStories = this.getStoriesAll();
        if (this.selectedStories.length > 0) {
            this.router.navigate([this.router.url.split('?')[0]], {
                queryParams: {
                    storie: storieID,
                    slide: !!slideID ? slideID : 0,
                }
            });
        }
    }

    /** @internal */
    /**
     * Retorna uma cópia de toda a lista de stories.
     */
    private getStoriesAll(): StoriesGroup[] {
        return Array.from(this.stories);
    }
}
