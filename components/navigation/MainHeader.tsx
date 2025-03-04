import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-950 to-indigo-900 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold text-2xl text-white sm:inline-block">
                Cosmos Explorer
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <ul className="flex items-center space-x-6">
              <NavItem href="/">Overview</NavItem>
              <NavItem href="/connect">Connect</NavItem>
              <NavItem href="/transfer">Transfer Tokens</NavItem>
              <NavItem href="/transactions">Transactions</NavItem>
              <NavItem href="/nextjs-concepts">Next.js Concepts</NavItem>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "relative flex items-center text-amber-50 hover:text-white transition-colors",
          "text-lg font-medium",
          "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
          "after:bg-amber-300 after:transition-all after:duration-300",
          "hover:after:w-full"
        )}
      >
        {children}
      </Link>
    </li>
  );
}
