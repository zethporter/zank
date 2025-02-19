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
        <body>
          <SignedIn>
            <div className="navbar bg-base-100 shadow-sm">
              <div className="flex-1">
                <a className="btn btn-ghost text-xl">Bank By Zeth</a>
              </div>
              <div className="flex-none">
                <UserButton />
              </div>
            </div>
            <main className="p-4">{children}</main>
          </SignedIn>
          <SignedOut>
            <main className="flex flex-col items-center justify-center gap-4 p-4">
              <SignInButton />
              <SignUpButton />
            </main>
          </SignedOut>
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  );
}
