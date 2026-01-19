import React from 'react';

type JsonLdProps = {
    type: 'Course' | 'Organization' | 'Person' | 'Article' | 'WebSite';
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
            type="Organization"
            data={{
                name: "SinapCode Global",
                url: "https://sinapcode.com",
                logo: "https://sinapcode.com/logo.png",
                sameAs: [
                    "https://twitter.com/sinapcode",
                    "https://linkedin.com/company/sinapcode",
                    "https://github.com/sinapcode"
                ],
                contactPoint: {
                    '@type': "ContactPoint",
                    telephone: "+57-300-123-4567",
                    contactType: "Customer Support",
                    areaServed: ["CO", "MX", "ES", "US"],
                    availableLanguage: ["Spanish", "English"]
                }
            }}
        />
    );
}
