"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Amplify } from "aws-amplify";
import "./app.css";
import AuthenticatorWrapper from "./AuthenticatorWrapper";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";

const inter = Inter({ subsets: ["latin"] });

Amplify.configure(outputs);


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>      
        <AuthenticatorWrapper>
          {children}
        </AuthenticatorWrapper>
      </body>
    </html>
  );
}
