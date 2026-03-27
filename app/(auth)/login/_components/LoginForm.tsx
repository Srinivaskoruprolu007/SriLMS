"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Github, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const LoginForm = () => {
	const [githubPending, startGithubTransition] = useTransition();
	const [emailPending, startEmailTransition] = useTransition();
	const [email, setEmail] = useState("");
	const router = useRouter();
	async function signInWithGithub() {
		startGithubTransition(async () => {
			await authClient.signIn.social({
				provider: "github",
				callbackURL: "/",
				fetchOptions: {
					onSuccess: () => {
						toast.success("Successfully signed in with Github");
					},
				},
			});
		});
	}
	async function signInWithEmail() {
		startEmailTransition(async () => {
			await authClient.emailOtp.sendVerificationOtp({
				email: email,
				type: "sign-in",
				fetchOptions: {
					onSuccess: () => {
						toast.success("Email sent");
						router.push(`/verify-email?email=${email}`);
					},
					onError: () => {
						toast.error("Error sending email");
					},
				},
			});
		});
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Welcome Back</CardTitle>
				<CardDescription>Sign in to your account</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Button
					onClick={signInWithGithub}
					className={"w-full"}
					variant="outline"
					disabled={githubPending}
				>
					<Github className="mr-2 size-4" />
					{githubPending ? (
						<>
							<Loader2 className="mr-2 animate-spin" />
							Signing in...
						</>
					) : (
						<>
							<p>Sign in with Github</p>
						</>
					)}
				</Button>
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-card px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
				<div className="grid gap-3">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							placeholder="s@example.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
					</div>
					<Button onClick={signInWithEmail} disabled={emailPending}>
						{emailPending ? (
							<>
								<Loader2 className="mr-2 animate-spin" />
								Signing in...
							</>
						) : (
							<>
								<Send className="mr-2 size-4" />
								<span>Sign in with Email</span>
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default LoginForm;
