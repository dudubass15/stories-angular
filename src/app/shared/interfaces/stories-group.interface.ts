import { StoriesItems } from './stories-items.interface';

export interface StoriesGroup {
    id: number;
    title: string;
    album: string;
    date: Date;
    items: StoriesItems[];
}
