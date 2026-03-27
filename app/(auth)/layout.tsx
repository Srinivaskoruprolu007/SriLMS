import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.png";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex flex-col items-center justify-center min-h-svh">
			<Button variant="default" className="absolute top-4 left-4">
				<Link href=".." className="flex">
					<ArrowLeft size={16} />
					<span className="mr-2">Go Back</span>
				</Link>
			</Button>
			<Link href="/" className="flex items-center mb-4 self-center font-medium">
				<Image src={Logo} alt="LMS Logo" width={48} height={48} />
				SriLMS
			</Link>

			<div className="flex flex-col w-full max-w-sm gap-6">
				{children}
				<div className="text-balance text-center text-sm text-muted-foreground">
					By Clicking Continue you agree to our{" "}
					<span className="hover:text-primary hover:underline">
						Terms of Service
					</span>
					and
					<span className="hover:text-primary hover:underline">
						Privacy Policy
					</span>
				</div>
			</div>
		</div>
	);
}
