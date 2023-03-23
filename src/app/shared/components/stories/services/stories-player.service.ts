import { Injectable, Input } from '@angular/core';
import { StoriesGroup } from 'src/app/shared/interfaces/stories-group.interface';

@Injectable({
    providedIn: 'root',
})
export class StoriesPlayerService {
    @Input()
    public stories: StoriesGroup[];

    public constructor() {}
}
