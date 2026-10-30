export const NAVIGATION_SECTIONS = [
    { anchor: 'top', key: 'home', label: 'Home' },
    { anchor: 'about', key: 'about', label: 'About' },
    { anchor: 'services', key: 'services', label: 'Services' },
    { anchor: 'projects', key: 'projects', label: 'Projects' },
    { anchor: 'sandbox', key: 'sandbox', label: 'Sandbox' },
    { anchor: 'contact', key: 'contact', label: 'Contact' },
] as const;

export const NAVIGATION_ITEM_CLOSE_DURATION = 1000;
export const NAVIGATION_ITEM_CLOSE_DELAY = 100;
// Le rideau masque le texte avant la fin de sa transition CSS.
export const NAVIGATION_CLOSE_OVERLAP = 600;
export const NAVIGATION_CLOSE_DURATION =
    NAVIGATION_ITEM_CLOSE_DURATION +
    (NAVIGATION_SECTIONS.length - 1) * NAVIGATION_ITEM_CLOSE_DELAY -
    NAVIGATION_CLOSE_OVERLAP;
