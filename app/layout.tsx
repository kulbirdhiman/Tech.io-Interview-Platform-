import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "My App",
  description: "Using Clerk Auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Navbar />
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
