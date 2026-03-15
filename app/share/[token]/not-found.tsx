import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Canvas not found</h1>
      <p className="text-gray-500">
        This share link may have been revoked or does not exist.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Go to Invook
      </Link>
    </div>
  );
}
