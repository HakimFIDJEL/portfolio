// resources/js/components/seo.tsx

import { Head, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface SeoProps {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article' | 'profile';
    jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
    canonicalUrl?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

export default function Seo({
    title,
    description,
    image,
    type = 'website',
    jsonLd,
    canonicalUrl,
    publishedTime,
    modifiedTime,
}: SeoProps) {
    const { props, url } = usePage<SharedData>();
    const siteName = props.name || 'Hakim Fidjel';
    const currentLocale = props.locale || 'fr';

    // Résolution de l'URL absolue de base
    const ziggyLocation =
        typeof props.ziggy === 'object' &&
        props.ziggy !== null &&
        'location' in props.ziggy
            ? String((props.ziggy as { location?: unknown }).location)
            : '';

    const origin =
        typeof window !== 'undefined'
            ? window.location.origin
            : ziggyLocation
              ? new URL(ziggyLocation).origin
              : '';
    const currentUrl = canonicalUrl || `${origin}${url.split('?')[0]}`;
    const defaultImage = `${origin}/apple-touch-icon.png`;
    const metaImage = image || defaultImage;

    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Ingénieur en génie informatique`;
    const metaDescription =
        description ||
        (currentLocale === 'fr'
            ? "Portfolio d'Hakim Fidjel, ingénieur apprenti chez TenderCrunch et développeur full-stack. Projets, compétences, expériences et réalisations informatiques."
            : "Hakim Fidjel's portfolio. Computer engineering apprentice at TenderCrunch and full-stack developer. Projects, skills, experience and achievements.");

    const ogLocale = currentLocale === 'fr' ? 'fr_FR' : 'en_US';
    const alternateOgLocale = currentLocale === 'fr' ? 'en_US' : 'fr_FR';

    // Construction des URLs alternatives pour hreflang
    const frUrl = currentUrl;
    const enUrl = currentUrl;

    return (
        <Head>
            {/* Titre et description de base */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="author" content="Hakim Fidjel" />
            <meta
                name="keywords"
                content="Hakim Fidjel, Portfolio, Développeur FullStack, Laravel, React, TypeScript, Inertia, TenderCrunch, Docker, Ingénieur Informatique"
            />

            {/* URL canonique */}
            <link rel="canonical" href={currentUrl} />

            {/* Balises multilingues hreflang */}
            <link rel="alternate" hrefLang="fr" href={frUrl} />
            <link rel="alternate" hrefLang="en" href={enUrl} />
            <link rel="alternate" hrefLang="x-default" href={frUrl} />

            {/* OpenGraph */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content={ogLocale} />
            <meta property="og:locale:alternate" content={alternateOgLocale} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:image:alt" content={fullTitle} />

            {/* Dates pour les articles/projets */}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
            <meta name="twitter:image:alt" content={fullTitle} />

            {/* Données structurées JSON-LD */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
                </script>
            )}
        </Head>
    );
}
