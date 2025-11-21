import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/assets/icons/logo.svg"
            alt="Signallist logo"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
            <blockquote className="autho-blockquote">
                Signalist turned my watchlist into a winning list. The alerts are spot-on, and I feel more confident making moves in the market
            </blockquote>
            <div className="flex-items-center justify-between">
          <div>      <cite className="auth-testimonial-author">- Ethan R.</cite>
                <p className="max-md:text-xs text-gray-500">Retail Investor</p></div>
            </div>
            
        </div>
      </section>
    </main>
  );
};

export default Layout;