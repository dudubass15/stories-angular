import { StoriesItems } from './stories-items.interface';

export interface StoriesGroup {
    id: number;
    title: string;
    background: string;
    date: Date;
    items: StoriesItems[];
}
