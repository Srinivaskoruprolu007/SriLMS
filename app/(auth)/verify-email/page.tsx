"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
	const router = useRouter();
	const [otp, setOtp] = useState("");
	const [otpPending, startOTPTransition] = useTransition();
	const params = useSearchParams();
	const email = params.get("email") as string;
	const isOTPCompleted = otp.length === 6;
	async function verifyOTP() {
		startOTPTransition(async () => {
			await authClient.signIn.emailOtp({
				email: email,
				otp: otp,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Successfully signed in");
						router.push("/");
					},
					onError: () => {
						toast.error("Error verifying email");
					},
				},
			});
		});
	}
	return (
		<Card className="w-full mx-auto">
			<CardHeader className="text-center">
				<CardTitle className="text-xl">
					<h1>Verify your email</h1>
				</CardTitle>
				<CardDescription>
					<p>
						Check your email for the verification link. Please paste the code in
						the form below
					</p>
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="flex flex-col justify-center items-center space-y-2">
					<InputOTP
						id="digits-only"
						maxLength={6}
						className="gap-2"
						onChange={(value) => setOtp(value)}
						value={otp}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
					<p className="text-sm text-muted-foreground">
						Enter 6 digit code sent to your email
					</p>
				</div>
				<Button
					onClick={verifyOTP}
					disabled={otpPending || !isOTPCompleted}
					className="w-full mt-4"
				>
					{otpPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Verifying...
						</>
					) : (
						"Verify"
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
