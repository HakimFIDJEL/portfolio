// resources/js/pages/landing.terms.tsx

import { Head } from '@inertiajs/react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Components
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';

// Translation
import { useTrans } from '@/lib/translation';

// Context
import { useLandingContext } from '@/contexts/use-landing-context';
import { useEffect } from 'react';

export default function Terms() {
    const __ = useTrans();

    const { contentActive, fetchingData, setFetchingData } =
        useLandingContext();

    useEffect(() => {
        if (!fetchingData) setFetchingData(true);

        const timer = setTimeout(() => {
            setFetchingData(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const sections = [
        {
            title: __('landing.terms.sections.introduction.h2', 'Introduction'),
            content: [
                __(
                    'landing.terms.sections.introduction.p_1',
                    "Welcome to Hakim Fidjel's portfolio. By accessing this website, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, please do not use this website.",
                ),
                __(
                    'landing.terms.sections.introduction.p_2',
                    'This website is a showcase of my work and skills as a Fullstack Engineer.',
                ),
            ],
        },
        {
            title: __(
                'landing.terms.sections.intellectual_property.h2',
                'Intellectual Property',
            ),
            content: [
                __(
                    'landing.terms.sections.intellectual_property.p_1',
                    'All content on this portfolio (text, images, projects, visible source code, etc.) is the exclusive property of Hakim Fidjel, unless otherwise stated.',
                ),
                __(
                    'landing.terms.sections.intellectual_property.p_2',
                    'The use, reproduction, or distribution of any content without prior written permission is strictly prohibited.',
                ),
                __(
                    'landing.terms.sections.intellectual_property.p_3',
                    'The source code of the portfolio itself is available on GitHub for technical reference and example purposes. This does not grant the right to commercial use or re-publication without explicit authorization.',
                ),
            ],
        },
        {
            title: __(
                'landing.terms.sections.limitation_of_liability.h2',
                'Limitation of Liability',
            ),
            content: [
                __(
                    'landing.terms.sections.limitation_of_liability.p_1',
                    'This website is provided "as is," without any warranties of any kind. I shall not be liable for any direct, indirect, or consequential damages arising out of the use of this website or the information contained within.',
                ),
            ],
        },
        {
            title: __('landing.terms.sections.contact.h2', 'Contact'),
            content: [
                __(
                    'landing.terms.sections.contact.p_1',
                    'For any questions regarding these Terms, you may contact me via the methods listed on the Contact section of the Landing page.',
                ),
            ],
        },
    ];

    return (
        <>
            <Head title={__('landing.terms.h1', 'Terms of Use')} />
            <div className="min-h-screen bg-background">
                <FadeIn show={contentActive} className="w-full">
                    <Delimiter plusCorners={['all']}>
                        <div className="px-6 py-12 sm:px-8 md:px-10 lg:px-12.5 lg:py-24">
                            <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl">
                                {__('landing.terms.h1', 'Terms of Use')}
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                {__(
                                    'landing.terms.last_updated',
                                    'Last Updated: December 14, 2025',
                                )}
                            </p>

                            <div className="mt-12 space-y-12">
                                {sections.map((section, index) => (
                                    <section key={index} className="space-y-4">
                                        <h2 className="text-2xl font-semibold md:text-3xl">
                                            {section.title}
                                        </h2>
                                        <div className="space-y-4 text-muted-foreground">
                                            {section.content.map(
                                                (p, pIndex) => (
                                                    <p key={pIndex}>{p}</p>
                                                ),
                                            )}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </Delimiter>
                </FadeIn>
            </div>
        </>
    );
}

Terms.layout = (page: React.ReactNode) => <AppLanding>{page}</AppLanding>;
