import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { videoUseCases, getYouTubeThumbnail } from "./data";

export const metadata: Metadata = {
  title: "Use Cases",
};

export default function UseCasesPage() {
  return (
    <main>
      <div className="textured-beige-bg min-h-screen">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            {/* Hero Section */}
            <section className="bg-white/50 py-28 px-4 sm:px-8 lg:px-12 text-center mt-28">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-emerald-700 tracking-tight text-pretty">
                USE CASES
              </h1>
            </section>

            {/* Video Grid Section */}
            <section className="py-12 px-4 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoUseCases.map((video) => (
                  <Link
                    key={video.id}
                    href={`/use-cases/${video.id}`}
                    className="flex flex-col bg-gray-100/50 border border-gray-300 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer relative"
                  >
                    {/* Corner squares */}
                    <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400 z-10"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400 z-10"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400 z-10"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400 z-10"></div>

                    {/* Video Container */}
                    <div className="relative aspect-video bg-gray-800 overflow-hidden">
                      {/* YouTube Thumbnail */}
                      <Image
                        src={getYouTubeThumbnail(video.videoUrl)}
                        alt={video.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                        <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 leading-tight text-gray-900">
                          {video.title}
                        </h3>

                        <p className="text-sm text-gray-600 font-mono mb-4">
                          By {video.author}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="w-full border-t border-gray-300 my-4"></div>

                      {/* App Icons */}
                      <div className="flex gap-2">
                        {video.appIcons.map((icon, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 bg-gray-200 flex items-center justify-center p-1"
                          >
                            <Image
                              src={icon}
                              alt={video.appNames[index]}
                              width={24}
                              height={24}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
