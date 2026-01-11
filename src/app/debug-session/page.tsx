import { auth } from "@/auth";
import { cookies, headers } from "next/headers";
import Link from "next/link";

export default async function DebugSessionPage() {
    const session = await auth();
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const headerList = headers();
    const host = headerList.get("host");
    const proto = headerList.get("x-forwarded-proto");

    return (
        <div className="min-h-screen bg-black text-white p-8 font-mono break-all">
            <h1 className="text-2xl font-bold mb-4">Server-Side Session Debugger (v2)</h1>

            <div className="space-y-4">
                <div className="p-4 border border-gray-700 rounded">
                    <h2 className="text-xl mb-2">Session Status</h2>
                    <p className={`text-lg ${session ? 'text-green-500' : 'text-red-500'}`}>
                        {session ? 'Authenticated' : 'Unauthenticated'}
                    </p>
                </div>

                <div className="p-4 border border-gray-700 rounded">
                    <h2 className="text-xl mb-2">Session Object</h2>
                    <pre className="bg-gray-900 p-4 rounded overflow-auto text-xs">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>

                <div className="p-4 border border-gray-700 rounded">
                    <h2 className="text-xl mb-2">Raw Cookies (Server)</h2>
                    <div className="bg-gray-900 p-4 rounded overflow-auto text-xs">
                        {allCookies.length === 0 ? (
                            <p className="text-yellow-500">No cookies found on request.</p>
                        ) : (
                            <ul className="list-disc pl-4 space-y-2">
                                {allCookies.map((c) => (
                                    <li key={c.name}>
                                        <span className="text-blue-400 font-bold">{c.name}</span>: {c.value}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="p-4 border border-gray-700 rounded">
                    <h2 className="text-xl mb-2">Actions</h2>
                    <div className="flex gap-4">
                        <Link href="/auth/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
