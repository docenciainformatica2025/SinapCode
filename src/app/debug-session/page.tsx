'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DebugSessionPage() {
    const { data: session, status } = useSession();

    return (
        <div className="min-h-screen bg-black text-white p-8 font-mono">
            <h1 className="text-2xl font-bold mb-4">Session Debugger</h1>

            <div className="space-y-4">
                <div className="p-4 border border-gray-700 rounded">
                    <h2 className="text-xl mb-2">Status</h2>
                    <p className={`text-lg ${status === 'authenticated' ? 'text-green-500' : 'text-red-500'}`}>
                        {status}
                    </p>
                </div>

                <div className="p-4 border border-gray-700 rounded">
                    <h2 className="text-xl mb-2">Session Data</h2>
                    <pre className="bg-gray-900 p-4 rounded overflow-auto">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>

                <div className="p-4 border border-gray-700 rounded">
                    <h2 className="text-xl mb-2">Actions</h2>
                    <div className="flex gap-4">
                        <Link href="/auth/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                            Go to Login
                        </Link>
                        <Link href="/dashboard" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
