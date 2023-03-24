import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoriesGroup } from '../../interfaces/stories-group.interface';
import { StoriesMock } from '../../mock/stories.mock';
import { StoriesService } from './stories.service';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
    /** Entrada dos dados de stories */
    @Input()
    public stories: StoriesGroup[] = StoriesMock;

    /** Interface Angular responsável por se desinscrever de um observable */
    public subscription: Subscription;

    /** Responsável por abrir o preview dos stories, quando houver stories selecionado */
    public isOpenedPreview: boolean = false;

    public constructor(
        public storieService: StoriesService,
        private activedRouter: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.storiesServicePopulated();
        this.subscription = this.activedRouter.queryParams.subscribe((params: any) => {
            if (params.storie) {
                const storieID = parseInt(params.storie);
                const slideID = parseInt(params.slide);
                this.storieService.open(storieID, slideID);

                setTimeout(() => {
                    this.subscription.unsubscribe();
                }, 300);
            }
        });

        // this.subscription = this.storieService._selectedStories.subscribe((stories: StoriesGroup[]) => {
        //     if (stories.length > 0) {
        //         this.isOpenedPreview = true;
        //     } else {
        //         this.isOpenedPreview = false;
        //     }
        // });
    }

    private storiesServicePopulated(): void {
        if (this.stories && this.stories.length > 0) {
            this.storieService._stories = this.stories;
        }
    }
}
