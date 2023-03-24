import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoriesGroup } from '../../interfaces/stories-group.interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class StoriesService {
    /** Entrada dos dados de stories */
    public _stories: StoriesGroup[];

    /**
     * Responsável por guardar e enviar os stories
     * selecionados para o componente de visualização
     * */
    public _selectedStories: BehaviorSubject<StoriesGroup[]> = new BehaviorSubject<StoriesGroup[]>([]);

    /** Propriedade responsável por abrir componente de preview. */
    public isOpenedPreview: boolean = false;

    public constructor(private router: Router) {}

    /** @description */
    /** Método responsável por abrir o preview dos stories selecionado e setar contador na URL */
    public open(storieID: number, slideID?: number): void {
        this._selectedStories.next(this.getStoriesAll());
        if (this._selectedStories.getValue().length > 0) {
            this.isOpenedPreview = true;
            this.setNavigationStoriesUrl(storieID, slideID);
        }
    }

    /** @description */
    /** Método responsável por fechar o preview dos stories */
    public close(): void {
        if (!this.isOpenedPreview) {
            this.isOpenedPreview = false;
        }
    }

    /** @internal */
    /**
     * Retorna uma cópia de toda a lista de stories.
     */
    private getStoriesAll(): StoriesGroup[] {
        return Array.from(this._stories);
    }

    /** @internal */
    /**
     * Método responsável por inserir contador na URL do browser.
     */
    private setNavigationStoriesUrl(storieID: number, slideID?: number): void {
        this.router.navigate([this.router.url.split('?')[0]], {
            queryParams: {
                storie: storieID,
                slide: !!slideID ? slideID : 0,
            }
        });
    }
}
