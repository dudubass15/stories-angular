import { StoriesGroup } from '../interfaces/stories-group.interface';

export const StoriesMock: StoriesGroup[] = [
    {
        id: 0,
        title: 'Família',
        album: 'assets/stories/familia/capa.jpg',
        date: new Date(),
        items: [
            {
                id: 0,
                name: 'Photo 01',
                url: 'assets/stories/familia/1.jpg'
            },
            {
                id: 1,
                name: 'Photo 02',
                url: 'assets/stories/familia/2.jpg',
                link: {
                    text: 'Saiba mais',
                    url: 'https://stories.carloseduardo.dev'
                }
            }
        ],
    },
    {
        id: 1,
        title: 'Trabalho',
        album: 'assets/stories/trabalho/capa.jpg',
        date: new Date(),
        items: [
            {
                id: 0,
                name: 'Photo 01',
                url: 'assets/stories/trabalho/1.jpg',
                link: {
                    text: 'Ir para o Google',
                    url: 'https://google.com.br'
                }
            },
            {
                id: 1,
                name: 'Photo 02',
                url: 'assets/stories/trabalho/2.jpg',
            },
            {
                id: 2,
                name: 'Photo 03',
                url: 'assets/stories/trabalho/3.jpg',
                link: {
                    text: 'Ir para a Amazon',
                    url: 'https://www.amazon.com.br/'
                }
            },
        ],
    },
    {
        id: 2,
        title: 'Viagens',
        album: 'assets/stories/viagens/1.jpg',
        date: new Date(),
        items: [
            {
                id: 0,
                name: 'Photo 01',
                url: 'assets/stories/viagens/1.jpg',
            },
            {
                id: 1,
                name: 'Photo 02',
                url: 'assets/stories/viagens/2.jpg',
            }
        ],
    },
];
