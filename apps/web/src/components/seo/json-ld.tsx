import React from 'react';

type JsonLdProps = {
    type: 'Course' | 'Organization' | 'Person' | 'Article' | 'WebSite' | 'EducationalOrganization';
    data: Record<string, any>;
};

export function JsonLd({ type, data }: JsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Preset for the WebSite (Search Box)
export function WebSiteSchema() {
    return (
        <JsonLd
            type="WebSite"
            data={{
                name: "SinapCode",
                url: "https://sinapcode.com",
                description: "Plataforma educativa con tutor de IA personal. Aprende Python, JavaScript, Hacking Ético y más. 100% gratis.",
                potentialAction: {
                    '@type': "SearchAction",
                    target: "https://sinapcode.com/courses?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            }}
        />
    );
}

// Preset for the Organization (Global Config)
export function GlobalOrganizationSchema() {
    return (
        <JsonLd
            type="EducationalOrganization"
            data={{
                name: "SinapCode",
                alternateName: "SinapCode - Aprende a Programar con IA",
                url: "https://sinapcode.com",
                logo: "https://sinapcode.com/logo.png",
                description: "Plataforma educativa revolucionaria que combina programación de alta calidad con inteligencia artificial. Cursos 100% gratuitos con certificados verificados en blockchain.",
                sameAs: [
                    "https://twitter.com/sinapcode",
                    "https://linkedin.com/company/sinapcode",
                    "https://github.com/sinapcode"
                ],
                contactPoint: {
                    '@type': "ContactPoint",
                    telephone: "+57-300-123-4567",
                    contactType: "Customer Support",
                    email: "sinapcodeia@gmail.com",
                    areaServed: ["CO", "MX", "ES", "US", "LATAM"],
                    availableLanguage: ["Spanish", "English"]
                },
                address: {
                    '@type': "PostalAddress",
                    addressCountry: "CO",
                    addressRegion: "Bogotá"
                }
            }}
        />
    );
}

// Course Schema for individual course pages
export function CourseSchema({ course }: { course: any }) {
    return (
        <JsonLd
            type="Course"
            data={{
                name: course.title,
                description: course.description,
                provider: {
                    '@type': "EducationalOrganization",
                    name: "SinapCode",
                    url: "https://sinapcode.com"
                },
                offers: {
                    '@type': "Offer",
                    category: "Free",
                    price: "0",
                    priceCurrency: "USD"
                },
                hasCourseInstance: {
                    '@type': "CourseInstance",
                    courseMode: "online",
                    courseWorkload: course.duration || "PT10H"
                },
                educationalLevel: course.level || "Beginner",
                inLanguage: "es",
                availableLanguage: ["es", "en"]
            }}
        />
    );
}

