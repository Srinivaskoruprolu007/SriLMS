"use client";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/constants/constants";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Successfully signed out");
        },
      },
    });
  };
  return (
    <>
      <section className="relative py-20">
        <div className=" flex flex-col items-center space-y-8 text-center">
          <Badge variant={"outline"}>The future of Online Learning</Badge>
          <h1 className="md:text-6xl text-4xl font-bold tracking-tight">
            Elevate your learning experience
          </h1>
          <p className="text-muted-foreground md:text-xl max-w-2xl text-sm">
            Discover a world of interactive content, personalized learning
            paths, and a vibrant learning community. Join us on this exciting
            journey of self-improvement and knowledge growth.
          </p>
          <div className="md:flex-row flex flex-col gap-4">
            <Link className={buttonVariants({ size: "lg" })} href="/courses">
              Explore courses
            </Link>
            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href="/login"
              onClick={handleSignOut}
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </section>
      <section className="md:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-4">
        {features.map((feature, key) => (
          <Card key={key} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
