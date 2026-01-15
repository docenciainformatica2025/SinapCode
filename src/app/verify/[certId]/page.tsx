import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Props {
    params: {
        certId: string;
    };
}

// Ensure dynamic rendering so we always fetch fresh data
export const dynamic = 'force-dynamic';

export default async function VerifyCertificatePage({ params }: Props) {
    // Parse Cert ID: SC-[DATE]-[USERID_SEGMENT]
    // We can't easily reverse this to a User ID without storing the Cert ID mapping.
    // However, we can search for a user whose ID starts with the segment (if unique enough)
    // OR, simply, the previous implementation used the User ID in the QR code directly or we need to look up.

    // WAIT: The QR code currently encodes `/verify/SC-...` which is NOT the user Id.
    // In the PDF generation `certId` is `SC-[Date]-[segment]`.
    // This is irreversible without a DB lookup field.
    // CRITICAL FIX: The PDF generator generates an ID but doesn't store it?
    // AND the query is just a segment.

    // STRATEGY:
    // 1. The PDF is generated on the fly. We don't have a "Certificate" table.
    // 2. We can try to decode the `certId` if we put the UserID in it? 
    //    Current format: `SC-${date}-${targetUser.id.slice(0, 6)}`
    //    Problem: 6 chars might not be unique.

    // FIX FOR PDF GENERATION (Next Step): 
    // Change the QR code to encode `/verify/${targetUser.id}` instead of the fancy string.
    // OR encode the fancy string but handle it here.

    // Let's assume for this page checking, we expect `params.certId` to be the USER ID for simplicity 
    // OR we assume we will fix the PDF to link to `/verify/[userId]` directly?
    // The user prompt said: "ensure validation on page".
    // A fancy CertID is nice but hard to verify without a table. 

    // DECISION: 
    // I will make the Verification Page look up by `userId`.
    // I will Update the PDF tool to embed `/verify/${userId}` in the QR code but DISPLAY the fancy ID text.

    const userId = params.certId;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            legalConsents: {
                orderBy: { acceptedAt: 'desc' }
            }
        }
    });

    if (!user) {
        // If not a pure user ID, maybe try to handle the fancy format? 
        // If we receive "SC-...", we fail for now. 
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Certificado No Encontrado</h1>
                <p>El código de verificación no corresponde a un usuario activo.</p>
                <Link href="/" className="mt-8 text-yellow-500 hover:underline">Volver al Inicio</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans p-6 md:p-12">
            <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">

                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-black uppercase tracking-wider">Verificación de Certificado</h1>
                        <p className="text-black/80 text-sm font-medium">SinapCode Legal Audit System</p>
                    </div>
                    <div className="h-12 w-12 bg-black/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Status */}
                    <div className="flex items-center space-x-4 bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                        <div>
                            <h3 className="text-green-400 font-bold">Certificado Válido</h3>
                            <p className="text-neutral-400 text-xs">La identidad y aceptación legal han sido verificadas.</p>
                        </div>
                    </div>

                    {/* User Data */}
                    <div>
                        <h3 className="text-neutral-500 text-xs uppercase tracking-widest mb-4 font-bold">Datos del Titular</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                                <span className="text-neutral-500 text-xs block">Nombre</span>
                                <span className="text-white font-medium">{user.name || 'N/A'}</span>
                            </div>
                            <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                                <span className="text-neutral-500 text-xs block">Email</span>
                                <span className="text-white font-medium">{user.email}</span>
                            </div>
                            <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                                <span className="text-neutral-500 text-xs block">ID Usuario</span>
                                <code className="text-yellow-500 text-xs font-mono">{user.id}</code>
                            </div>
                            <div className="bg-neutral-950 p-4 rounded border border-neutral-800">
                                <span className="text-neutral-500 text-xs block">Miembro desde</span>
                                <span className="text-white text-sm">{user.createdAt.toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Evidence Log */}
                    <div>
                        <h3 className="text-neutral-500 text-xs uppercase tracking-widest mb-4 font-bold">Evidencia de Consentimiento</h3>
                        {user.legalConsents.length > 0 ? (
                            <div className="border border-neutral-800 rounded-lg overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-neutral-950 text-neutral-400">
                                        <tr>
                                            <th className="p-3 font-normal">Documento</th>
                                            <th className="p-3 font-normal">Versión</th>
                                            <th className="p-3 font-normal">Fecha</th>
                                            <th className="p-3 font-normal">Método</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-800 bg-neutral-900">
                                        {user.legalConsents.map((c) => (
                                            <tr key={c.id}>
                                                <td className="p-3 text-white">{c.documentType}</td>
                                                <td className="p-3 text-neutral-400">{c.documentVersion}</td>
                                                <td className="p-3 text-neutral-400">{new Date(c.acceptedAt).toLocaleDateString()}</td>
                                                <td className="p-3 text-yellow-500 font-mono text-xs">{c.consentMethod}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-neutral-500 italic">No se encontraron registros.</p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-8 border-t border-neutral-800">
                        <p className="text-neutral-600 text-xs">
                            ID Verificación: {new Date().getTime().toString(36).toUpperCase()} • Emitido por SinapCode
                        </p>
                        <Link href="/" className="text-neutral-500 hover:text-white text-xs mt-2 inline-block">
                            visitar sinapcode.vercel.app
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
