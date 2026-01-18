import { JsonLd } from './json-ld';

interface LegalDocumentSchemaProps {
    title: string;
    version: string;
    datePublished: string;
    url: string;
    jurisdiction?: string;
}

export function LegalDocumentSchema({
    title,
    version,
    datePublished,
    url,
    jurisdiction = "CO"
}: LegalDocumentSchemaProps) {
    return (
        <JsonLd
            type="DigitalDocument" // Using generic type as DigitalDocument is widely supported
            data={{
                "@type": "DigitalDocument",
                "name": title,
                "hasVersion": version,
                "datePublished": datePublished,
                "dateModified": datePublished,
                "publisher": {
                    "@type": "Organization",
                    "name": "SinapCode",
                    "url": "https://sinapcode.com"
                },
                "fileFormat": "application/markdown",
                "url": url,
                "license": "https://sinapcode.com/legal/terms",
                "audience": {
                    "@type": "Audience",
                    "audienceType": "Users"
                },
                "contentLocation": {
                    "@type": "Place",
                    "name": jurisdiction
                }
            }}
        />
    );
}
