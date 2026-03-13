import { legalTokens as tokens } from "@/lib/constants/legal-tokens";
import { LegalFooter } from "@/components/legal/legal-footer";
import Link from "next/link";

export default function PrivacyDashboardPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow pb-24">
                {/* Header */}
                <section className="pt-24 pb-16 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900">
                    <div className={tokens.spacing.container}>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-2xl">
                                <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">
                                    <Link href="/legal" className="hover:text-indigo-600 transition">Legal Center</Link>
                                    <span>/</span>
                                    <span className="text-neutral-900 dark:text-neutral-100">Privacy Center</span>
                                </nav>
                                <h1 className={tokens.typography.heading + " mb-4"}>
                                    Your Privacy Dashboard
                                </h1>
                                <p className="text-neutral-500 text-lg">
                                    Manage your data, privacy preferences, and exercise your rights under GDPR.
                                    Transparency is our commitment to the SINAPCODE community.
                                </p>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-green-700 dark:text-green-400">GDPR Compliant System</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tools Section */}
                <section className="py-20 lg:py-24">
                    <div className={tokens.spacing.container}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                            {/* Data Rights Column */}
                            <div className="lg:col-span-2 space-y-8">
                                <h2 className="text-2xl font-bold tracking-tight mb-8">Data Subject Rights</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Right: Access & Export */}
                                    <div className="group p-8 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer">
                                        <div className="bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Request Data Export</h3>
                                        <p className="text-sm text-neutral-500 leading-relaxed">
                                            Download a machine-readable copy of your personal data stored within the SINAPCODE ecosystem.
                                        </p>
                                    </div>

                                    {/* Right: Deletion */}
                                    <div className="group p-8 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] hover:bg-red-50 dark:hover:bg-red-900/10 transition-all cursor-pointer">
                                        <div className="bg-red-50 dark:bg-red-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-red-700 transition-colors">Request Account Deletion</h3>
                                        <p className="text-sm text-neutral-500 leading-relaxed">
                                            Permanently delete your account and all associated personal data from our servers. This action is irreversible.
                                        </p>
                                    </div>

                                    {/* Right: Modification */}
                                    <div className="group p-8 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer">
                                        <div className="bg-amber-50 dark:bg-amber-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Rectify Personal Data</h3>
                                        <p className="text-sm text-neutral-500 leading-relaxed">
                                            Correct any inaccurate or incomplete information we have about your identity or account.
                                        </p>
                                    </div>

                                    {/* Right: Restrict Processing */}
                                    <div className="group p-8 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer">
                                        <div className="bg-purple-50 dark:bg-purple-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Restrict Processing</h3>
                                        <p className="text-sm text-neutral-500 leading-relaxed">
                                            Limit how we use your data for specific purposes while keeping your account active.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-8">
                                <div className="p-8 bg-neutral-900 dark:bg-neutral-100 rounded-[2rem] text-white dark:text-neutral-900">
                                    <h3 className="text-lg font-bold mb-4">Your Data is Protected</h3>
                                    <p className="text-neutral-400 dark:text-neutral-500 text-sm leading-relaxed mb-8">
                                        Under GDPR, you have the right to know what data we collect and how it's used.
                                        All requests are processed within 30 days.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "End-to-end encryption",
                                            "Zero unauthorized access",
                                            "Tallinn, Estonia servers",
                                            "Institutional grade security"
                                        ].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-sm font-medium">
                                                <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-8 border border-indigo-100 dark:border-indigo-900/30 rounded-[2rem] bg-indigo-50/50 dark:bg-indigo-900/10">
                                    <h3 className="text-lg font-bold mb-4 text-indigo-900 dark:text-indigo-300">Privacy Officer</h3>
                                    <p className="text-sm text-indigo-700/70 dark:text-indigo-400/70 mb-6 font-medium">
                                        Questions about your data or identity? Our DPO (Data Protection Officer) in Estonia is here to help.
                                    </p>
                                    <a href="mailto:privacy@sinapcode.com" className="text-indigo-600 font-bold hover:underline">
                                        privacy@sinapcode.com
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <LegalFooter />
        </div>
    );
}
