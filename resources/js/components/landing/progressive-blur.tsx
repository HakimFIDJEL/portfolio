import { cn } from '@/lib/utils';

type ProgressiveBlurProps = {
    className?: string;
    backgroundColor?: string; // Utilisez la couleur de fond de votre section (ex: 'background')
    position?: 'top' | 'bottom';
    height?: string;
    blurAmount?: string;
};

const ProgressiveBlur = ({
    className = '',
    backgroundColor = 'hsl(var(--background))', // Utilisation d'une variable CSS par défaut
    position = 'top',
    height = '100px', // Réduit la hauteur pour l'intégration
    blurAmount = '4px',
}: ProgressiveBlurProps) => {
    const isTop = position === 'top'; // Attention: backdrop-filter ne fonctionne que si la couleur de fond a une opacité (alpha)

    const bgWithOpacity = `rgba(${backgroundColor.includes('hsl') ? 'var(--background-rgb)' : '245, 244, 243'}, 0.9)`;
    return (
        <div
            className={cn(
                'pointer-events-none sticky left-0 z-10 w-full select-none',
                className,
            )}
            style={{
                [isTop ? 'top' : 'bottom']: 0,
                height, // Utilisation d'un gradient transparent vers la couleur de fond, avec une opacité
                background: isTop
                    ? `linear-gradient(to top, transparent, ${backgroundColor})`
                    : `linear-gradient(to bottom, transparent, ${backgroundColor})`, // Masking (crucial pour l'effet progressif)
                maskImage: isTop
                    ? `linear-gradient(to bottom, ${bgWithOpacity} 50%, transparent)`
                    : `linear-gradient(to top, ${bgWithOpacity} 50%, transparent)`, // Blur (crucial pour l'effet iOS)
                WebkitBackdropFilter: `blur(${blurAmount})`,
                backdropFilter: `blur(${blurAmount})`,
                WebkitUserSelect: 'none',
                userSelect: 'none',
            }}
        />
    );
};

export default ProgressiveBlur;
