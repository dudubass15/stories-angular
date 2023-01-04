import { StoriesItems } from './stories-items.interface';

export interface StoriesGroup {
    id: number;
    title: string;
    thumbnail: string;
    date: Date;
    items: StoriesItems[];
}
