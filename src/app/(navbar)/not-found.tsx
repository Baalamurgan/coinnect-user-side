"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold mt-10">404 - Page Not Found</h1>
      <p className="mt-5 text-lg text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <p className="mt-2 text-gray-500">
        You may have mistyped the address or the page has been moved.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
