export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Maps a pixel width to a breakpoint identifier (max-width logic).
 * 
 * @param width - The viewport or container width in pixels.
 * @return Corresponding size key ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
 */
export const getWidthSize = (width: number): ScreenSize => {
    if (width <= 480) return 'xs';
    if (width <= 640) return 'sm';
    if (width <= 768) return 'md';
    if (width <= 1024) return 'lg';
    if (width <= 1280) return 'xl';

    return '2xl';
};

export const MAX_WIDTH = 500;
export const MAX_HEIGHT = 660;