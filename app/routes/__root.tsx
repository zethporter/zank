// app/routes/__root.tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import {
  SignedIn,
  UserButton,
  SignOutButton,
  SignedOut,
  SignInButton,
  SignUpButton,
  ClerkProvider,
} from "@clerk/tanstack-start";
import "../styles/index.css";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider>
      <html data-theme="dracula">
        <head>
          <Meta />
        </head>
        <body className="bg-base-100">
          <div className=" bg-radial-[at_50%_75%] from-primary/20 via-secondary/20 to-accent/20 to-90% h-[100dvh]">
            <SignedIn>
              <div className="navbar bg-base-100/20 hidden sm:flex">
                <h1 className="flex-1">Bank By Zeth</h1>
                <div className="flex-none">
                  <UserButton />
                </div>
              </div>
              <main className="p-4">{children}</main>
              <Toaster
                toastOptions={{
                  unstyled: true,
                  classNames: {
                    toast: "alert alert-soft",
                    success: "alert-success",
                    error: "alert-error",
                    loading: "alert-info",
                    info: "alert-info",
                    default: "alert-info",
                    warning: "alert-warning",
                  },
                }}
              />
              <div className="dock dock-sm bg-base-100/20 sm:hidden flex justify-between content-center">
                <h1 className="flex-1">Bank By Zeth</h1>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <main className="flex flex-col items-center justify-center gap-4 p-4">
                <SignInButton />
                <SignUpButton />
              </main>
            </SignedOut>
            <Scripts />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
