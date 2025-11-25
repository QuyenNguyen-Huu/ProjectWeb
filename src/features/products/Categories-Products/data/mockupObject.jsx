export const categoriesMockup = [
    {
        id: 'men',
        nameKey: 'categories.men',
        link: { vi: '/do-nam', en: '/men' },
        children: [
            { id: 'men-shirt', nameKey: 'header.menu.menShirt', link: { vi: '/ao-chay-bo-nam', en: '/men/shirt' } },
            { id: 'men-pants', nameKey: 'header.menu.menPants', link: { vi: '/quan-chay-bo-nam', en: '/men/pants' } },
            { id: 'men-run-shoes', nameKey: 'header.menu.menRunShoes', link: { vi: '/giay-chay-bo-nam', en: '/men/run-shoes' } },
            { id: 'men-trail-shoes', nameKey: 'header.menu.menTrailShoes', link: { vi: '/giay-chay-dia-hinh-nam', en: '/men/trail-shoes' } },
        ],
    },
    {
        id: 'women',
        nameKey: 'categories.women',
        link: { vi: '/do-nu', en: '/women' },
        children: [
            { id: 'women-shirt', nameKey: 'header.menu.womenShirt', link: { vi: '/ao-chay-bo-nu', en: '/women/shirt' } },
            { id: 'women-pants', nameKey: 'header.menu.womenPants', link: { vi: '/quan-chay-bo-nu', en: '/women/pants' } },
            { id: 'women-run-shoes', nameKey: 'header.menu.womenRunShoes', link: { vi: '/giay-chay-bo-nu', en: '/women/run-shoes' } },
            { id: 'women-trail-shoes', nameKey: 'header.menu.womenTrailShoes', link: { vi: '/giay-chay-dia-hinh-nu', en: '/women/trail-shoes' } },
        ],
    },
    {
        id: 'gps-watch',
        nameKey: 'categories.gpsWatch',
        link: { vi: '/dong-ho', en: '/watch' },
        children: [
            { id: 'watch-suunto', nameKey: 'header.menu.suunto', link: { vi: '/dong-ho-suunto', en: '/watch/suunto' } },
            { id: 'watch-garmin', nameKey: 'header.menu.garmin', link: { vi: '/dong-ho-garmin', en: '/watch/garmin' } },
            { id: 'watch-coros', nameKey: 'header.menu.coros', link: { vi: '/dong-ho-coros', en: '/watch/coros' } },
        ],
    },
];