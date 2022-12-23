import { StoriesLink } from './stories-link.interface';

export interface StoriesItems {
    id: number;
    name: string;
    url: string;
    link?: StoriesLink;
}
