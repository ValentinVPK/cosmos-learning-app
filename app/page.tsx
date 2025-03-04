import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SUPPORTED_CHAINS_DROPDOWN_ITEMS } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  // Define the libraries used in the project
  const libraries = [
    {
      name: "Next.js",
      version: "15.1.7",
      description: "The React framework for building web applications",
      link: "https://nextjs.org/",
      category: "Core",
      hasConceptsPage: true,
    },
    {
      name: "React",
      version: "19.0.0",
      description: "A JavaScript library for building user interfaces",
      link: "https://react.dev/",
      category: "Core",
    },
    {
      name: "@cosmjs/stargate",
      version: "0.33.0",
      description:
        "CosmJS Stargate client for connecting to Cosmos blockchains",
      link: "https://github.com/cosmos/cosmjs",
      category: "Blockchain",
    },
    {
      name: "@cosmos-kit/react",
      version: "2.21.7",
      description: "React components for Cosmos blockchain integration",
      link: "https://docs.cosmoskit.com/",
      category: "Blockchain",
    },
    {
      name: "@cosmos-kit/keplr",
      version: "2.14.7",
      description: "Keplr wallet integration for Cosmos Kit",
      link: "https://www.keplr.app/",
      category: "Blockchain",
    },
    {
      name: "@interchain-ui/react",
      version: "1.26.2",
      description: "UI components for Interchain applications",
      link: "https://interchain-ui.vercel.app/",
      category: "UI",
    },
    {
      name: "shadcn/ui",
      version: "Latest",
      description:
        "Beautifully designed components built with Radix UI and Tailwind CSS",
      link: "https://ui.shadcn.com/",
      category: "UI",
    },
    {
      name: "Tailwind CSS",
      version: "4.0.9",
      description: "A utility-first CSS framework for rapid UI development",
      link: "https://tailwindcss.com/",
      category: "UI",
    },
    {
      name: "chain-registry",
      version: "1.69.135",
      description: "A registry of Cosmos chains and assets",
      link: "https://github.com/cosmos/chain-registry",
      category: "Blockchain",
    },
    {
      name: "Zod",
      version: "3.24.2",
      description:
        "TypeScript-first schema validation with static type inference",
      link: "https://zod.dev/",
      category: "Utility",
    },
  ];

  // Group libraries by category
  const categories = [...new Set(libraries.map((lib) => lib.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Cosmos Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern application for exploring and interacting with Cosmos
            blockchains, built with cutting-edge technologies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Supported Chains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUPPORTED_CHAINS_DROPDOWN_ITEMS.map((chain) => (
              <Card key={chain.value} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>{chain.label}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Chain ID: {chain.value}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/connect">Connect</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-medium mb-4">{category} Libraries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {libraries
                  .filter((lib) => lib.category === category)
                  .map((library) => (
                    <Card key={library.name} className="h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex justify-between items-center">
                          <span>{library.name}</span>
                          <span className="text-sm font-normal text-muted-foreground">
                            v{library.version}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <CardDescription>{library.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={library.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn More
                          </a>
                        </Button>
                        {library.hasConceptsPage && (
                          <Button asChild variant="secondary" size="sm">
                            <Link href="/nextjs-concepts">
                              Next.js Concepts
                            </Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-muted-foreground mb-6">
            Connect your wallet and start exploring the Cosmos ecosystem
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/connect">Connect Wallet</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
