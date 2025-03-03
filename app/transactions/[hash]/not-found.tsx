"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-amber-600 mb-2">
            Transaction Not Found
          </h2>
          <p className="text-gray-700 mb-6">
            The transaction you are looking for could not be found. It may not
            exist or has been removed.
          </p>
          <div className="flex space-x-4">
            <Button asChild variant="default">
              <Link href="/">Home</Link>
            </Button>
            <Button onClick={() => window.history.back()} variant="outline">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
