"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
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
  const HandleLogin = async () => {
    try {
      const response = await authClient.signIn.email({
        email,
        password,
      });
      console.log("this is the response :", response);
      if (response.error) {
        setError(response.error?.message);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err);
      throw new Error(err);
    }
  };

  const HandleSignUp = async () => {
    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
      });
      console.log("this res at signup", res);
      if (res.error) {
        setError(error?.message);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err);
      throw new Error(err);
    }
  };
  // async function signInWithEmail() {
  // 	startEmailTransition(async () => {
  // 		await authClient.emailOtp.sendVerificationOtp({
  // 			email: email,
  // 			type: "sign-in",
  // 			fetchOptions: {
  // 				onSuccess: () => {
  // 					toast.success("Email sent");
  // 					router.push(`/verify-email?email=${email}`);
  // 				},
  // 				onError: () => {
  // 					toast.error("Error sending email");
  // 				},
  // 			},
  // 		});
  // 	});
  // }
  return (
    <Tabs defaultValue={"signin"}>
      <TabsList className={"w-full "}>
        <TabsTrigger value={"signin"}> SignIn</TabsTrigger>
        <TabsTrigger value={"signup"}> SignUp</TabsTrigger>
      </TabsList>
      <TabsContent value={"signin"}>
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          {error && <p>{error}</p>}
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
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="*******"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className={"w-full"}
              variant={"default"}
              onClick={HandleLogin}
            >
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value={"signup"}>
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>sign up your account</CardDescription>
          </CardHeader>
          {error && <p>{error}</p>}
          <CardContent>
            <div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type=""
                  placeholder="jhondoe"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full"
                />
              </div>
              <div className="grid gap-2 mt-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="s@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="w-full"
                />
              </div>
              <div className="grid gap-2 mt-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="*******"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <Button
                  variant={"default"}
                  className={"w-full"}
                  onClick={HandleSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
