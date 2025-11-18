"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { videoUseCases, getYouTubeThumbnail } from "../data";

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.id as string;

  const video = videoUseCases.find((v) => v.id === videoId);
  const relatedVideos = videoUseCases
    .filter((v) => v.id !== videoId)
    .slice(0, 3);

  if (!video) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Video not found</p>
      </main>
    );
  }

  return (
    <main>
      <div className="textured-beige-bg min-h-screen">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            {/* Hero Section with centered heading and muted background */}
            <section className="bg-white/50 py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 text-center mt-28">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-700 tracking-tight mb-6 leading-tight">
                  {video.title}
                </h1>

                {/* App Icons */}
                <div className="flex justify-center gap-3 mb-4">
                  {video.appIcons.map((icon, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 bg-emerald-700/10 flex items-center justify-center p-2"
                    >
                      <Image
                        src={icon}
                        alt={video.appNames[index]}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* App Names */}
                <p className="text-sm font-mono text-gray-600 mb-3">
                  {video.appNames.join(" • ")}
                </p>

                {/* Author */}
                <p className="text-base font-mono text-gray-700">
                  By {video.author}
                </p>
              </div>
            </section>

            {/* Video Player Section */}
            <section className="px-4 sm:px-8 lg:px-12 py-12">
              <div className="max-w-5xl mx-auto">
                <div className="relative aspect-video bg-gray-900 border border-gray-300 overflow-hidden">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </section>

            {/* Related Use Cases Section */}
            {relatedVideos.length > 0 && (
              <section className="bg-emerald-700/10 py-16 px-4 sm:px-8 lg:px-12">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-8 text-center tracking-tight">
                    Related Use Cases
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedVideos.map((relatedVideo) => (
                      <Link
                        key={relatedVideo.id}
                        href={`/use-cases/${relatedVideo.id}`}
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
                            src={getYouTubeThumbnail(relatedVideo.videoUrl)}
                            alt={relatedVideo.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg
                                className="w-6 h-6 text-white ml-0.5"
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
                            <h3 className="text-base font-semibold mb-2 leading-tight text-gray-900">
                              {relatedVideo.title}
                            </h3>

                            <p className="text-sm text-gray-600 font-mono mb-4">
                              By {relatedVideo.author}
                            </p>
                          </div>

                          {/* Divider */}
                          <div className="w-full border-t border-gray-300 my-4"></div>

                          {/* App Icons */}
                          <div className="flex gap-2">
                            {relatedVideo.appIcons.map((icon, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 bg-gray-200 flex items-center justify-center p-1"
                              >
                                <Image
                                  src={icon}
                                  alt={relatedVideo.appNames[index]}
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
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
