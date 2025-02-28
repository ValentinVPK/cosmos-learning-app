import Link from "next/link";

export default function MainHeader() {
  return (
    <header>
      <nav>
        <ul className="flex gap-6 p-5 bg-blue-950">
          <li>
            <Link href="/" className="text-2xl text-amber-50">
              Home
            </Link>
          </li>
          <li>
            <Link href="/connect" className="text-2xl text-amber-50">
              Connect
            </Link>
          </li>
          <li>
            <Link href="/transfer" className="text-2xl text-amber-50">
              Transfer Tokens
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
