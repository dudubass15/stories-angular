import { StoriesGroup } from '../interfaces/stories-group.interface';

export const StoriesMock: StoriesGroup[] = [
    {
        id: 0,
        title: 'Stories 01',
        background: 'assets/stories/1.jpg',
        date: new Date(),
        items: [
            {
                id: 0,
                name: 'Photo 01',
                url: 'assets/stories/2.jpg',
            },
            {
                id: 1,
                name: 'Photo 02',
                url: 'assets/stories/4.jpg',
            },
            {
                id: 2,
                name: 'Photo 03',
                url: 'assets/stories/5.jpg',
            },
            {
                id: 3,
                name: 'Photo 04',
                url: 'assets/stories/2.jpg',
            },
        ],
    },
    {
        id: 1,
        title: 'Stories 02',
        background: 'assets/stories/2.jpg',
        date: new Date(),
        items: [
            {
                id: 0,
                name: 'Photo 01',
                url: 'assets/stories/5.jpg',
            },
            {
                id: 1,
                name: 'Photo 02',
                url: 'assets/stories/4.jpg',
            },
        ],
    },
    {
        id: 2,
        title: 'Stories 03',
        background: 'assets/stories/1.jpg',
        date: new Date(),
        items: [
            {
                id: 0,
                name: 'Photo 01',
                url: 'assets/stories/2.jpg',
            },
            {
                id: 1,
                name: 'Photo 02',
                url: 'assets/stories/4.jpg',
            },
            {
                id: 2,
                name: 'Photo 03',
                url: 'assets/stories/5.jpg',
            },
            {
                id: 3,
                name: 'Photo 04',
                url: 'assets/stories/2.jpg',
            },
        ],
    },
    {
        id: 3,
        title: 'Stories 04',
        background: 'assets/stories/1.jpg',
        date: new Date(),
        items: [
            {
                id: 0,
                name: 'Photo 01',
                url: 'assets/stories/2.jpg',
            },
            {
                id: 1,
                name: 'Photo 02',
                url: 'assets/stories/4.jpg',
            },
            {
                id: 2,
                name: 'Photo 03',
                url: 'assets/stories/5.jpg',
            },
            {
                id: 3,
                name: 'Photo 04',
                url: 'assets/stories/2.jpg',
            },
        ],
    },
    // {
    //     title: 'Stories 03',
    //     background: 'assets/stories/3.jpg',
    //     date: new Date(),
    //     stories: [],
    // }
];
