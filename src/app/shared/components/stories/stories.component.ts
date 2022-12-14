import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

    public constructor(
        private router: Router,
        private activedRouter: ActivatedRoute,
        private cdRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        // TODO: Verifica possibilidade de pegar os stories pelo ID e abrir em determinado storie.
        // this.activedRouter.queryParams.subscribe((params: any) => {
        //     if (params.storie) {
        //         const id: number = parseInt(params.storie);
        //         this.open(id);
        //     }
        // });
    }

    public open(id: number): void {
        this.selectedStories = this.getStorieData(id);
        if (this.selectedStories.length > 0) {
            this.router.navigate(['/'], {
                queryParams: {
                    storie: id,
                    slide: 0,
                },
            });
        }
    }

    /** @internal */
    /**
     * Pega/recorta a lista de stories a partir do id passado.
     */
    private getStorieData(id: number): StoriesGroup[] {
        return this.stories.slice(id);
    }

    /** @internal */
    /**
     * Retorna toda a lista de stories.
     */
    private getStoriesAll(): StoriesGroup[] {
        return this.stories;
    }
}
