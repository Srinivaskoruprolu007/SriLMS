"use client";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggler } from "@/components/ui/theme-toggler";
import { navigationItems } from "@/constants/constants";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
	const { data: session, isPending } = authClient.useSession();
	return (
		<header className="bg-background/90 backdrop-blur-[backdrop-filter]:bg-background/65 sticky top-0 z-50 w-full border-b">
			<div className="mx-autoflex min-h-16 container flex items-center">
				<Link href="/" className="flex items-center gap-2 px-4 py-3">
					<Image src="/logo.png" alt="LMS Logo" width={48} height={48} />
					<span className="font-bold">SriLMS</span>
				</Link>
				{/* desktop menu */}
				<nav className="md:flex md:flex-1 md:items-center md:justify-between hidden">
					<div className="flex items-center space-x-2">
						{navigationItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="flex items-center gap-2 px-4 py-3"
							>
								<span>{item.label}</span>
							</Link>
						))}
					</div>
					<div className="flex items-center space-x-4">
						<ThemeToggler />
						{isPending ? null : session ? (
							<p>Signed in as {session.user.name}</p>
						) : (
							<Link
								href="/login"
								className={
									buttonVariants({ variant: "secondary" }) +
									"flex items-center gap-2 px-4 py-3"
								}
							>
								<span>Sign in</span>
							</Link>
						)}
					</div>
				</nav>
			</div>
		</header>
	);
}
