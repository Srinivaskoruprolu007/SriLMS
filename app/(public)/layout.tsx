import { Navbar } from "./_components/Navbar";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Navbar />
			<main className="md:px-6 container px-4 mx-auto">{children}</main>
		</div>
	);
}
