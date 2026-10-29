// resources/js/components/seo.tsx

import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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

    const resolvedTitle = title
        ? title.includes(siteName)
            ? title
            : `${title} — ${siteName}`
        : currentLocale === 'fr'
          ? `${siteName} — Ingénieur Logiciel`
          : `${siteName} — Software Engineer`;
    const metaDescription =
        description ||
        (currentLocale === 'fr'
            ? "Portfolio de Hakim Fidjel, ingénieur logiciel et développeur full-stack indépendant. Conception d'architectures applicatives robustes, systèmes agentiques et solutions web modernes."
            : 'Portfolio of Hakim Fidjel, Software Engineer and independent full-stack developer. Designing robust software architectures, agentic systems, and modern web applications.');

    const ogLocale = currentLocale === 'fr' ? 'fr_FR' : 'en_US';
    const alternateOgLocale = currentLocale === 'fr' ? 'en_US' : 'fr_FR';

    // Construction des URLs alternatives pour hreflang
    const frUrl = currentUrl;
    const enUrl = currentUrl;

    return (
        <Head>
            {/* Titre et description de base */}
            <title>{resolvedTitle}</title>
            <meta
                name="description"
                content={metaDescription}
                head-key="description"
            />
            <meta name="author" content="Hakim Fidjel" head-key="author" />
            <meta
                name="keywords"
                content="Hakim Fidjel, Portfolio, Ingénieur Logiciel, Software Engineer, Développeur Freelance, Laravel 12, React 19, TypeScript, Inertia.js, Tailwind CSS, Docker, Architecture Logicielle"
                head-key="keywords"
            />

            {/* URL canonique */}
            <link rel="canonical" href={currentUrl} head-key="canonical" />

            {/* Balises multilingues hreflang */}
            <link
                rel="alternate"
                hrefLang="fr"
                href={frUrl}
                head-key="hreflang-fr"
            />
            <link
                rel="alternate"
                hrefLang="en"
                href={enUrl}
                head-key="hreflang-en"
            />
            <link
                rel="alternate"
                hrefLang="x-default"
                href={frUrl}
                head-key="hreflang-default"
            />

            {/* OpenGraph */}
            <meta
                property="og:site_name"
                content={siteName}
                head-key="og:site_name"
            />
            <meta
                property="og:title"
                content={resolvedTitle}
                head-key="og:title"
            />
            <meta
                property="og:description"
                content={metaDescription}
                head-key="og:description"
            />
            <meta property="og:url" content={currentUrl} head-key="og:url" />
            <meta property="og:type" content={type} head-key="og:type" />
            <meta
                property="og:locale"
                content={ogLocale}
                head-key="og:locale"
            />
            <meta
                property="og:locale:alternate"
                content={alternateOgLocale}
                head-key="og:locale:alternate"
            />
            <meta property="og:image" content={metaImage} head-key="og:image" />
            <meta
                property="og:image:alt"
                content={resolvedTitle}
                head-key="og:image:alt"
            />

            {/* Dates pour les articles/projets */}
            {publishedTime && (
                <meta
                    property="article:published_time"
                    content={publishedTime}
                    head-key="article:published_time"
                />
            )}
            {modifiedTime && (
                <meta
                    property="article:modified_time"
                    content={modifiedTime}
                    head-key="article:modified_time"
                />
            )}

            {/* Twitter Cards */}
            <meta
                name="twitter:card"
                content="summary_large_image"
                head-key="twitter:card"
            />
            <meta
                name="twitter:title"
                content={resolvedTitle}
                head-key="twitter:title"
            />
            <meta
                name="twitter:description"
                content={metaDescription}
                head-key="twitter:description"
            />
            <meta
                name="twitter:image"
                content={metaImage}
                head-key="twitter:image"
            />
            <meta
                name="twitter:image:alt"
                content={resolvedTitle}
                head-key="twitter:image:alt"
            />

            {/* Données structurées JSON-LD */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
                </script>
            )}
        </Head>
    );
}
