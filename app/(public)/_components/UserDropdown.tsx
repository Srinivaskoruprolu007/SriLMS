"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { getUserInitials } from "@/lib/utils";
import { ChevronDown, Home, Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { toast } from "sonner";

type UserDropdownProps = {
	user: {
		name?: string | null;
		email: string;
		image?: string | null;
	};
};

function UserAvatar({
	src,
	initials,
	displayName,
	size,
}: {
	src: string | null;
	initials: string;
	displayName: string;
	size?: "lg";
}) {
	return (
		<Avatar size={size}>
			{src && <AvatarImage src={src} alt={displayName} />}
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
}

export default function UserDropdown({ user }: UserDropdownProps) {
	const router = useRouter();
	const [isSigningOut, startSignOutTransition] = useTransition();

	const displayName = useMemo(
		() => user.name?.trim() || user.email.split("@")[0],
		[user.name, user.email],
	);

	const initials = useMemo(
		() => getUserInitials(user.name, user.email),
		[user.name, user.email],
	);

	const avatarSrc = user.image?.trim() || null;

	const handleSignOut = useCallback(() => {
		startSignOutTransition(async () => {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.push("/login");
						toast.success("Successfully signed out");
					},
					onError: () => {
						toast.error("Failed to sign out");
					},
				},
			});
		});
	}, [router]);

	const sharedAvatarProps = { src: avatarSrc, initials, displayName };

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				disabled={isSigningOut}
				className="flex items-center gap-1.5 outline-none"
			>
				<UserAvatar {...sharedAvatarProps} />
				<ChevronDown className="size-3.5 text-muted-foreground" />
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" sideOffset={8} className="min-w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel className="py-2.5">
						<div className="flex items-center gap-2.5">
							<UserAvatar {...sharedAvatarProps} size="lg" />
							<div className="min-w-0">
								<p className="truncate text-sm font-medium text-foreground">
									{displayName}
								</p>
								<p className="truncate text-xs text-muted-foreground">
									{user.email}
								</p>
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push("/")}>
						<Home className="size-4" />
						Go to home
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={handleSignOut}
					disabled={isSigningOut}
					variant="destructive"
				>
					{isSigningOut ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						<LogOut className="size-4" />
					)}
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
