import React from 'react';
import Link from "next/link";
import Layout from '../layout/RootLayout';



export default function All() {
    return (
      <Layout>
      <div
        className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
        data-testid="layout"
      >
        <nav className="mt-6 mb-12 flex justify-between">
          <h1 className="text-lg font-bold uppercase" data-testid="logo">
            <Link href="/">Mikro LMS</Link>{/*  Hovedside main */}
          </h1> 
          <ul className="flex gap-8" data-testid="nav">
            <li className="text-base font-semibold" data-testid="nav_courses">
            <Link href="/courses">Kurs</Link>{/*  Side kurs */}
            </li>
            <li className="text-base font-semibold" data-testid="nav_new">
            <Link href="/course">Nytt kurs</Link>{/*  nytt kurs */}
            </li>
          </ul>
        </nav>
        <main className="h-full">
          <p>Siden er tom</p>
        </main>
        <footer className="flex justify-between" data-testid="footer">
          <p>Mikro LMS AS, 2024</p>
          <p>99 00 00 00, mail@lms.no</p>
        </footer>
      </div>
      </Layout>
    );
  }
  