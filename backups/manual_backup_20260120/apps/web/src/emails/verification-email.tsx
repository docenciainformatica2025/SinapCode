import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
    confirmLink: string;
    email: string;
}

export default function VerificationEmail({
    confirmLink = 'http://localhost:3000/auth/new-verification?token=example',
    email = 'user@example.com',
}: VerificationEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Verifica tu correo electrónico en SinapCode</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>¡Bienvenido a SinapCode! 🚀</Heading>

                    <Text style={text}>
                        Hola,
                    </Text>

                    <Text style={text}>
                        Gracias por registrarte en <strong>SinapCode</strong>, la plataforma de aprendizaje del futuro.
                        Para completar tu registro y comenzar tu viaje de aprendizaje, por favor verifica tu correo
                        electrónico haciendo clic en el botón de abajo:
                    </Text>

                    <Section style={buttonContainer}>
                        <Button style={button} href={confirmLink}>
                            Verificar Email
                        </Button>
                    </Section>

                    <Text style={text}>
                        O copia y pega este enlace en tu navegador:
                    </Text>

                    <Link href={confirmLink} style={link}>
                        {confirmLink}
                    </Link>

                    <Text style={footer}>
                        <strong>Este enlace expirará en 1 hora.</strong>
                        <br />
                        Si no creaste esta cuenta, puedes ignorar este email de forma segura.
                    </Text>

                    <Text style={footer}>
                        ¿Tienes problemas? Contáctanos en{' '}
                        <Link href="mailto:sinapcodeia@gmail.com" style={link}>
                            sinapcodeia@gmail.com
                        </Link>
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

// Estilos inline para compatibilidad con clientes de email
const main = {
    backgroundColor: '#0a0e1a',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '560px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
};

const h1 = {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0 20px',
    padding: '0 40px',
    textAlign: 'center' as const,
};

const text = {
    color: '#404040',
    fontSize: '14px',
    lineHeight: '24px',
    padding: '0 40px',
    margin: '16px 0',
};

const button = {
    backgroundColor: '#3b82f6',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '14px 20px',
    margin: '0 auto',
    maxWidth: '200px',
};

const buttonContainer = {
    padding: '27px 40px',
};

const link = {
    color: '#3b82f6',
    fontSize: '12px',
    textDecoration: 'underline',
    wordBreak: 'break-all' as const,
    display: 'block',
    padding: '0 40px',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '20px',
    marginTop: '32px',
    padding: '0 40px',
    textAlign: 'center' as const,
};
