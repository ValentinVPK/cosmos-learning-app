import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NextJSConceptsPage() {
  const concepts = [
    {
      title: "Routing and Navigation",
      description:
        "Next.js has a file-system based router built on the App Router that supports layouts, nested routing, loading states, and error handling.",
      details: [
        "page.tsx - Defines a unique route and UI for a specific path",
        "layout.tsx - Creates shared UI for a segment and its children, preserving state across navigations",
        "loading.tsx - Creates loading UI for a segment and its children with React Suspense (working only for server components)",
        "error.tsx - Creates error UI for a segment and its children with React Error Boundary",
        "not-found.tsx - UI displayed when a route can't be found or notFound() is thrown",
        "<Link> component - Enables client-side navigation between routes with prefetching",
        "useRouter() hook - Programmatic navigation and route manipulation",
        "Dynamic routes with [param] and [...catchAll] syntax for flexible path matching",
      ],
    },
    {
      title: "Metadata & SEO",
      description:
        "Next.js provides a metadata API that makes it simple to add SEO-relevant metadata to your application with both static and dynamic options.",
      details: [
        "Static metadata - Define metadata in a layout.js or page.js file using the metadata object export",
        "Dynamic metadata - Generate metadata based on dynamic information using the generateMetadata function",
        "File-based metadata - Add favicon.ico, opengraph-image.jpg, and other special files for automatic metadata",
        "Title and description - Easily set page titles and descriptions for SEO",
        "Robots and sitemap - Control crawler behavior with robots.txt and sitemap.xml",
        "Viewport - Configure responsive design settings",
        "Metadata inheritance - Metadata defined in parent layouts is inherited by default",
        "Image component - Automatically optimizes images by converting to WebP/AVIF formats, resizing, and lazy loading for better performance and SEO",
      ],
    },
    {
      title: "Client and Server Components",
      description:
        "Next.js introduces a hybrid model with React Server Components and Client Components, allowing developers to build applications that combine the best of server and client rendering.",
      details: [
        "Server Components - Render on the server and send HTML to the client, reducing client-side JavaScript",
        "Client Components - Interactive components that render on the client with full React functionality",
        "Direct data fetching - Fetch data directly inside Server Components without additional API layers",
        "Reduced bundle size - Large dependencies used in Server Components don't get sent to the client",
        "Progressive enhancement - Start with server rendering and add interactivity where needed",
        "Streaming - Server Components enable streaming of UI as it renders, improving perceived performance",
        "'use client' directive - Simple way to mark a component as a Client Component",
        "Interleaving - Server and Client Components can be nested within each other",
        "Access to server-only resources - Server Components can directly access databases and backend services",
      ],
    },
    {
      title: "Server Actions",
      description:
        "Next.js Server Actions allow you to run asynchronous code directly on the server, eliminating the need for API endpoints when handling form submissions and data mutations.",
      details: [
        "Form handling - Submit forms directly to server functions without creating API routes",
        "Progressive enhancement - Forms work even without JavaScript enabled on the client",
        "Server-side validation - Validate form data directly on the server for better security",
        "Direct database access - Perform database operations directly within the action",
        "useActionState hook - Manage form state and validation errors with built-in React hooks",
        "useFormStatus hook - Access pending states for improved loading UI",
        "Revalidation - Automatically revalidate and update cached data after mutations",
        "'use server' directive - Mark functions as server-only code",
        "Type safety - Full type safety between client and server with TypeScript",
      ],
    },
    {
      title: "Caching and Rendering",
      description:
        "Next.js provides flexible caching and rendering strategies that allow developers to optimize for performance, freshness, or a balance of both.",
      details: [
        "Static rendering - Pages are rendered at build time and cached for maximum performance (default on production)",
        "Dynamic rendering - Pages are rendered for each request for always-fresh content (default on development)",
        "Incremental Static Regeneration (ISR) - Static pages that revalidate after a specified interval",
        "Client-side cache - Browser caching for improved subsequent visits",
        "Server-side cache - Full-page and data caching on the server for faster responses",
        "dynamic = 'force-dynamic' - Force a route to be dynamically rendered on every request",
        "revalidatePath() Programmatically invalidate cache entries",
        "no-store option - Opt out of caching for specific fetch requests",
      ],
    },
    {
      title: "Middleware",
      description:
        "Next.js Middleware runs before a request is completed, allowing you to modify responses, redirect users, or rewrite URLs based on incoming requests.",
      details: [
        "middleware.ts - Special file that runs on the Edge runtime before matching routes",
        "Authentication - Check user sessions and redirect unauthenticated users to login",
        "Authorization - Verify user permissions before allowing access to protected routes",
        "Internationalization - Detect user language and redirect to localized content",
        "Matcher config - Specify which routes the middleware should run on",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Next.js Core Concepts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the fundamental concepts that make Next.js a powerful
            framework for building modern web applications.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concepts.map((concept, index) => (
            <Card
              key={index}
              className="h-full border-2 border-transparent transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-xl hover:-translate-y-2"
            >
              <CardHeader>
                <CardTitle>{concept.title}</CardTitle>
                <CardDescription>{concept.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {concept.details.map((detail, i) => (
                    <li key={i} className="text-sm">
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
