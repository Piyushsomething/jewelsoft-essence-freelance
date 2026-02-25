import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { PageTransition } from "@/components/ui/page-transition";
import { ScrollToTopButton } from "./ScrollToTopButton";
import WhatsAppButton from "@/components/common/WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
