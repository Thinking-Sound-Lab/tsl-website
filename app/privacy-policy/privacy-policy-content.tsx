"use client";

export default function PrivacyPolicyContent() {
	return (
		<main className="min-h-screen bg-background">
			<div className="container mx-auto px-6 max-w-[680px] py-16 md:py-24 tracking-tight">
				{/* Header */}
				<header className="mb-12 pt-16">
					<h1 className="text-3xl md:text-4xl font-normal  text-foreground mb-3">
						Privacy Policy
					</h1>
					<p className="text-sm text-muted-foreground">
						Last Updated: February 13, 2026
					</p>
				</header>

				{/* Content */}
				<article className="max-w-none">
					<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-6">
						Invook (&quot;Invook&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides a shared Canvas and Drive where users can generate, store, and collaborate on AI-generated assets (&quot;Services&quot;).
					</p>
					<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-6">
						We are committed to protecting your privacy and handling your data transparently and securely.
					</p>
					<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-4">
						This Privacy Policy explains how we collect, use, store, share, and protect personal data in compliance with:
					</p>
					<ul className="list-disc pl-6 mb-10 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5]">
						<li>India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong></li>
						<li>EU <strong>General Data Protection Regulation (GDPR)</strong></li>
						<li>UK GDPR</li>
						<li>California Consumer Privacy Act (CCPA/CPRA)</li>
						<li>Other applicable international data protection laws</li>
					</ul>

					<hr className="border-border/40 my-10" />

					{/* Section 1 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">1. Scope</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">This Privacy Policy applies to:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5]">
							<li>Visitors to our website</li>
							<li>Users of Invook (free and paid plans)</li>
							<li>Workspace members and collaborators</li>
							<li>Clients invited into shared spaces</li>
						</ul>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 2 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">2. Information We Collect</h2>

						<h3 className="text-base font-medium text-foreground mb-3">2.1 Information You Provide</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-6">
							<li>Name</li>
							<li>Email address</li>
							<li>Organization name</li>
							<li>Profile information</li>
							<li>Billing information (processed via third-party payment providers)</li>
							<li>Content uploaded to Invook:
								<ul className="list-disc pl-6 mt-1.5 space-y-1">
									<li>Files (documents, images, videos, links)</li>
									<li>Prompts</li>
									<li>AI-generated outputs</li>
									<li>Comments and collaboration data</li>
								</ul>
							</li>
						</ul>

						<h3 className="text-base font-medium text-foreground mb-3">2.2 Automatically Collected Information</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-6">
							<li>IP address</li>
							<li>Device type</li>
							<li>Browser information</li>
							<li>Usage analytics</li>
							<li>Log data</li>
							<li>Error diagnostics</li>
						</ul>

						<h3 className="text-base font-medium text-foreground mb-3">2.3 AI-Generated Data</h3>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">When you generate assets using Invook:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-3">
							<li>Prompts</li>
							<li>Input files</li>
							<li>Output files</li>
							<li>Metadata related to generation</li>
						</ul>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">These are stored within your workspace unless otherwise specified.</p>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 3 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">3. How We Use Your Information</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">We use your data to:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>Provide and maintain the Services</li>
							<li>Authenticate users</li>
							<li>Enable collaboration in shared workspaces</li>
							<li>Store and retrieve AI-generated assets</li>
							<li>Improve product performance</li>
							<li>Provide customer support</li>
							<li>Comply with legal obligations</li>
							<li>Prevent fraud or misuse</li>
						</ul>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] font-medium">We do not sell personal data.</p>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 4 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">4. AI Model Processing</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">Invook integrates third-party AI infrastructure providers.</p>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-4">Your inputs may be processed by the following subprocessors strictly to provide the Services:</p>

						<h3 className="text-base font-medium text-foreground mb-3">AI & Infrastructure Subprocessors</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li><strong>Amazon Web Services (AWS)</strong> – Core cloud infrastructure</li>
							<li><strong>AWS Bedrock</strong> – Claude model inference</li>
							<li><strong>Fal.ai</strong> – Image and video model processing</li>
							<li><strong>Groq</strong> – Speech-to-text processing</li>
							<li><strong>Supabase</strong> – Authentication and database services (standard and vector storage)</li>
							<li><strong>Microsoft Azure</strong> – Windows code signing</li>
							<li><strong>GitHub</strong> – Code repository and deployment infrastructure</li>
						</ul>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">These subprocessors process data only as necessary to provide functionality.</p>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">We require all subprocessors to maintain appropriate security and confidentiality standards.</p>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 5 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">5. Data Storage & Security</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">Invook implements technical and organizational safeguards, including:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>Encrypted data transmission (HTTPS/TLS)</li>
							<li>Encrypted cloud storage</li>
							<li>Access controls and role-based permissions</li>
							<li>Secure authentication systems</li>
							<li>Infrastructure hosted on reputable cloud providers</li>
						</ul>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">We take reasonable steps to protect your information, but no system is 100% secure.</p>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 6 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">6. Data Ownership</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">You retain ownership of:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>Files you upload</li>
							<li>Prompts you submit</li>
							<li>AI outputs generated within your workspace</li>
						</ul>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">Invook does not claim ownership over user content.</p>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-2">Unless explicitly stated:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5]">
							<li>We do not use your private workspace data to train third-party AI models.</li>
							<li>Your content is processed only to provide the Services.</li>
						</ul>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 7 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">7. Data Retention</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">We retain personal data:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>As long as your account remains active</li>
							<li>As necessary to provide Services</li>
							<li>As required by law</li>
							<li>For legitimate business purposes (e.g., security, fraud prevention)</li>
						</ul>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">You may request deletion of your account and associated data.</p>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 8 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">8. International Data Transfers</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">Invook operates globally.</p>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">Your data may be processed in:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>India</li>
							<li>United States</li>
							<li>Other countries where our subprocessors operate</li>
						</ul>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">Where required, we implement:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5]">
							<li>Standard Contractual Clauses (SCCs)</li>
							<li>Lawful transfer mechanisms under GDPR</li>
							<li>Safeguards under India&apos;s DPDP Act</li>
						</ul>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 9 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">9. Your Rights</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-4">Depending on your jurisdiction, you may have the right to:</p>

						<h3 className="text-base font-medium text-foreground mb-3">Under GDPR / UK GDPR:</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>Access your data</li>
							<li>Correct inaccurate data</li>
							<li>Delete your data</li>
							<li>Restrict processing</li>
							<li>Data portability</li>
							<li>Object to processing</li>
							<li>Withdraw consent</li>
						</ul>

						<h3 className="text-base font-medium text-foreground mb-3">Under India DPDP Act:</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>Right to access information about processing</li>
							<li>Right to correction and erasure</li>
							<li>Right to grievance redressal</li>
							<li>Right to nominate a representative</li>
						</ul>

						<h3 className="text-base font-medium text-foreground mb-3">Under CCPA/CPRA:</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>Know what personal data is collected</li>
							<li>Request deletion</li>
							<li>Opt out of sale/sharing</li>
							<li>Non-discrimination for exercising rights</li>
						</ul>

						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">
							To exercise rights, contact: <strong>support@thinkingsoundlab.com</strong>
						</p>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 10 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">10. Children&apos;s Privacy</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">Invook is not intended for individuals under 18.</p>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">We do not knowingly collect personal data from minors.</p>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 11 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">11. Cookies & Analytics</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">We may use cookies and similar technologies to:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>Maintain sessions</li>
							<li>Improve user experience</li>
							<li>Analyze usage patterns</li>
							<li>Secure the platform</li>
						</ul>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">You may control cookies through browser settings.</p>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 12 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">12. Changes to This Policy</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">We may update this Privacy Policy from time to time.</p>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">Material changes will be communicated via:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5]">
							<li>Email notification</li>
							<li>Website notice</li>
							<li>Platform notification</li>
						</ul>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 13 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">13. Contact Information</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">For privacy-related inquiries:</p>
						<div className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">
							<p className="font-medium">Invook</p>
							<p>Email: support@thinkingsoundlab.com</p>
							<p>Address: Ashok Vihar Colony, Bypass Road, Gaya, Bihar, 823001</p>
						</div>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 14 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">14. Data Protection Officer / Grievance Officer (India)</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">In compliance with India&apos;s DPDP Act:</p>
						<div className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">
							<p className="font-medium">Grievance Officer:</p>
							<p>Email: support@thinkingsoundlab.com</p>
							<p>Response Timeline: As required under applicable law</p>
						</div>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 15 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">15. Legal Basis for Processing (GDPR)</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-3">We process data under the following lawful bases:</p>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5]">
							<li>Contract performance</li>
							<li>Legitimate interest</li>
							<li>Consent</li>
							<li>Legal obligation</li>
						</ul>
					</section>

					<hr className="border-border/40 my-10" />

					{/* Section 16 */}
					<section className="mb-10">
						<h2 className="text-xl font-medium tracking-tight text-foreground mb-4">16. Technical Stack Disclosure (Transparency)</h2>
						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5] mb-4">Invook is built using:</p>

						<h3 className="text-base font-medium text-foreground mb-3">Frontend:</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>React 19</li>
							<li>React Flow</li>
							<li>ShadCN UI</li>
							<li>Electron</li>
							<li>Node.js 22</li>
							<li>Zustand</li>
						</ul>

						<h3 className="text-base font-medium text-foreground mb-3">Backend & Development:</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>Python 3.11 / 3.12</li>
							<li>Rust</li>
							<li>JavaScript</li>
							<li>HTML/CSS</li>
						</ul>

						<h3 className="text-base font-medium text-foreground mb-3">Infrastructure:</h3>
						<ul className="list-disc pl-6 space-y-1.5 text-[15px] md:text-base text-foreground/80 leading-[1.5] mb-4">
							<li>AWS</li>
							<li>Supabase</li>
							<li>Azure</li>
							<li>Fal.ai</li>
							<li>Groq</li>
							<li>AWS Bedrock</li>
						</ul>

						<p className="text-[15px] md:text-base text-foreground/90 leading-[1.5]">
							These technologies do not independently collect personal data beyond what is necessary to operate the Services.
						</p>
					</section>
				</article>
			</div>
		</main>
	);
}
