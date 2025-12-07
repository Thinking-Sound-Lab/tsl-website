"use client";

import { useEffect } from "react";

interface InstallationStepsProps {
  platform: "mac" | "windows";
  onDownload?: () => void;
}

export function InstallationSteps({
  platform,
  onDownload,
}: InstallationStepsProps) {
  const os = platform;

  useEffect(() => {
    // Auto-download after 2 seconds
    const timer = setTimeout(() => {
      if (onDownload) {
        onDownload();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onDownload]);

  const macSteps = [
    {
      number: 1,
      title: "Open",
      description:
        "Open the downloaded .dmg file from your downloads list. It's in the top right corner of your browser.",
      visual: (
        <div className="mt-4 -ml-6 overflow-visible">
          <img
            src="/images/dmg_invook.png"
            alt="Invook.dmg download"
            className="w-auto h-auto max-w-sm rounded-lg"
          />
        </div>
      ),
    },
    {
      number: 2,
      title: "Install",
      description:
        "Drag and drop Invook to the Applications folder when asked to continue with the install.",
      visual: (
        <div className="mt-4 flex items-center justify-center">
          <img
            src="/images/install_mac.png"
            alt="Drag Invook to Applications folder"
            className="w-full h-auto max-w-xs"
          />
        </div>
      ),
    },
    {
      number: 3,
      title: "Launch",
      description: "Open Invook from the Dock and start using voice dictation.",
      visual: (
        <div className="mt-12 -ml-6 overflow-visible">
          <img
            src="/images/dock.png"
            alt="macOS Dock with Invook"
            className="w-full h-auto"
          />
        </div>
      ),
    },
  ];

  const windowsSteps = [
    {
      number: 1,
      title: "Open",
      description:
        "Open the invook.exe file from your downloads list at the top right corner of the window.",
      visual: (
        <div className="mt-4 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-md max-w-sm w-full">
            <div className="flex flex-col items-center gap-4">
              <img
                src="/svgs/black_monogram.svg"
                alt="Invook"
                className="w-16 h-16"
              />
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                <span className="text-gray-700 font-normal text-base">
                  invook.exe
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 2,
      title: "Install",
      description:
        "Run the installer and follow the installation wizard. If you see a Windows SmartScreen warning, click 'More info' then 'Run anyway'.",
      visual: (
        <div className="mt-4 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-md max-w-sm w-full">
            <div className="flex flex-col items-center gap-4">
              <img
                src="/svgs/black_monogram.svg"
                alt="Invook"
                className="w-16 h-16"
              />
              <div className="text-center">
                <p className="text-sm font-normal text-gray-700 mb-2">
                  Getting Invook ready
                </p>
                <p className="text-xs text-gray-500">
                  This may take a few moments
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full animate-pulse"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 3,
      title: "Launch",
      description:
        "Open the Invook from your Start menu or Desktop, to launch the app.",
      visual: (
        <div className="mt-4 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 shadow-md max-w-xs w-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer">
                <img
                  src="/svgs/black_monogram.svg"
                  alt="Invook"
                  className="w-10 h-10"
                />
                <span className="text-sm text-gray-700 font-normal">
                  Invook
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 space-y-1">
                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 cursor-pointer rounded">
                  <span className="text-sm">📌</span>
                  <span className="text-xs text-gray-700">Open</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 cursor-pointer rounded">
                  <span className="text-sm">📍</span>
                  <span className="text-xs text-gray-700">
                    Unpin from Start
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const steps = os === "mac" ? macSteps : windowsSteps;

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/svgs/black_logo.svg"
              alt="Invook"
              className="h-6 w-auto"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 tracking-tight">
            Thanks for downloading!
            <br />
            Just a few steps left.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-mono">
            Your download will begin automatically. If it didn&apos;t,{" "}
            <button
              onClick={onDownload}
              className="text-emerald-700 hover:text-emerald-800 underline font-medium cursor-pointer"
            >
              download Invook manually
            </button>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Installation Steps */}
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#0d5446" }}
            >
              <div className="p-6">
                {/* Step Number Badge - Inside border */}
                <div className="mb-4">
                  <div className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-medium text-lg">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Visual Illustration */}
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
