"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function SpeedComparison() {
  const fullText =
    "Make a new React component called TaskDashboard. Add a useState hook for selectedTaskId initialized to null, and another for isSidebarOpen set to true.";

  // Left side - fast and accurate
  const [leftText, setLeftText] = useState("");
  const [leftWpm, setLeftWpm] = useState(0);

  // Right side - slow with corrections
  const [rightText, setRightText] = useState("");
  const [rightWpm, setRightWpm] = useState(0);

  // Track if component is in view
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Left side animation - fast transcription (230 WPM)
  useEffect(() => {
    if (!isInView) return;
    let currentIndex = 0;
    const words = fullText.split(" ");
    const totalWords = words.length;
    const wpm = 230;
    const msPerWord = (60 / wpm) * 1000;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setLeftText(words.slice(0, currentIndex + 1).join(" "));
        currentIndex++;
        // Calculate current WPM
        const currentWpm = Math.min(
          Math.round((currentIndex / totalWords) * wpm),
          wpm
        );
        setLeftWpm(currentWpm);
      } else {
        clearInterval(interval);
        setLeftWpm(230);
      }
    }, msPerWord);

    return () => clearInterval(interval);
  }, [isInView]);

  // Right side animation - slow typing with corrections (40 WPM)
  useEffect(() => {
    if (!isInView) return;
    const wpm = 40;
    const msPerChar = (60 / (wpm * 5)) * 1000; // Average 5 chars per word
    let timeoutId: NodeJS.Timeout;

    // Define typos that need correction
    const typoSequence = [
      {
        position: 59,
        wrongText: "useState",
        correctText: "useState",
        shouldError: false,
      },
      {
        position: 70,
        wrongText: "selectdTaskId",
        correctText: "selectedTaskId",
        shouldError: true,
      },
      {
        position: 85,
        wrongText: "intialized",
        correctText: "initialized",
        shouldError: true,
      },
      {
        position: 130,
        wrongText: "isSidebrOpen",
        correctText: "isSidebarOpen",
        shouldError: true,
      },
    ];

    const typeText = async () => {
      let currentText = "";
      let charIndex = 0;
      let typoIndex = 0;

      const typeChar = () => {
        if (charIndex >= fullText.length) {
          setRightWpm(40);
          return;
        }

        // Check if we should introduce an error
        const currentTypo = typoSequence[typoIndex];
        if (
          currentTypo &&
          charIndex === currentTypo.position &&
          currentTypo.shouldError
        ) {
          // Type wrong text
          const wrongChars = currentTypo.wrongText.split("");
          let wrongIndex = 0;

          const typeWrong = () => {
            if (wrongIndex < wrongChars.length) {
              currentText += wrongChars[wrongIndex];
              setRightText(currentText);
              wrongIndex++;

              const charsTyped = charIndex + wrongIndex;
              const totalChars = fullText.length;
              const progress = charsTyped / totalChars;
              setRightWpm(Math.min(Math.round(progress * wpm), wpm));

              timeoutId = setTimeout(typeWrong, msPerChar);
            } else {
              // Pause, then backspace
              timeoutId = setTimeout(() => {
                backspace(wrongChars.length, () => {
                  // Now type correct text
                  const correctChars = currentTypo.correctText.split("");
                  let correctIndex = 0;

                  const typeCorrect = () => {
                    if (correctIndex < correctChars.length) {
                      currentText += correctChars[correctIndex];
                      setRightText(currentText);
                      correctIndex++;

                      const charsTyped = charIndex + correctIndex;
                      const totalChars = fullText.length;
                      const progress = charsTyped / totalChars;
                      setRightWpm(Math.min(Math.round(progress * wpm), wpm));

                      timeoutId = setTimeout(typeCorrect, msPerChar);
                    } else {
                      charIndex += correctChars.length;
                      typoIndex++;
                      timeoutId = setTimeout(typeChar, msPerChar);
                    }
                  };
                  typeCorrect();
                });
              }, 400);
            }
          };
          typeWrong();
        } else {
          // Normal typing
          currentText += fullText[charIndex];
          setRightText(currentText);
          charIndex++;

          const progress = charIndex / fullText.length;
          setRightWpm(Math.min(Math.round(progress * wpm), wpm));

          timeoutId = setTimeout(typeChar, msPerChar);
        }
      };

      const backspace = (count: number, callback: () => void) => {
        let backspaceCount = 0;
        const doBackspace = () => {
          if (backspaceCount < count) {
            currentText = currentText.slice(0, -1);
            setRightText(currentText);
            backspaceCount++;
            timeoutId = setTimeout(doBackspace, msPerChar * 0.5);
          } else {
            callback();
          }
        };
        doBackspace();
      };

      typeChar();
    };

    typeText();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800 mb-3 sm:mb-4 leading-tight tracking-tight">
            5x faster than typing and
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            twice as accurate
          </h2>
          <p className="text-sm sm:text-md md:text-lg font-normal text-gray-600 mb-6 max-w-3xl mx-auto px-4 font-mono text-balance">
            Forget the keyboard. Write five times faster with your voice and
            save hours every week with flawless accuracy.
          </p>
          <a href="/downloads">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base"
            >
              Write faster with invook
            </Button>
          </a>
        </div>

        {/* Comparison Boxes */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 mt-8 sm:mt-12">
          {/* Left Box - Fast Transcription */}
          <div className="border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 bg-[#f5f1e8]">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Using invook
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {leftWpm}{" "}
                <span className="text-xs sm:text-sm font-normal text-gray-500">
                  WPM
                </span>
              </div>
            </div>
            <div className="min-h-[180px] sm:min-h-[200px] text-sm sm:text-base text-gray-900 leading-relaxed">
              {leftText}
              {leftText.length < fullText.length && (
                <span className="inline-block w-0.5 h-4 sm:h-5 bg-blue-500 ml-1 animate-pulse"></span>
              )}
            </div>
          </div>

          {/* Right Box - Slow Typing */}
          <div className="border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 bg-[#f5f1e8]">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="2"
                    strokeWidth="2"
                  ></rect>
                  <path
                    d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Using Keyboard
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {rightWpm}{" "}
                <span className="text-xs sm:text-sm font-normal text-gray-500">
                  WPM
                </span>
              </div>
            </div>
            <div className="min-h-[180px] sm:min-h-[200px] text-sm sm:text-base text-gray-900 leading-relaxed">
              {rightText}
              {rightText.length < fullText.length && (
                <span className="inline-block w-0.5 h-4 sm:h-5 bg-gray-900 ml-1 animate-pulse"></span>
              )}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 font-mono">
          {/* Benefit 1 */}
          <div className="text-center px-4">
            <div className="flex justify-center mb-3 sm:mb-4">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                />
              </svg>
            </div>
            <h3 className="text-sm sm:text-md md:text-lg font-normal text-gray-800 mb-2">
              Works with all your apps
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-normal">
              Fits naturally into every app you use each day, without setup or
              friction.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="text-center px-4">
            <div className="flex justify-center mb-3 sm:mb-4">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-sm sm:text-md md:text-lg font-normal text-gray-800 mb-2">
              Your thoughts set the pace
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-normal">
              Keeps up with your ideas so you can focus on thinking, not typing.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="text-center px-4 sm:col-span-2 md:col-span-1">
            <div className="flex justify-center mb-3 sm:mb-4">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="text-sm sm:text-md md:text-lg font-normal text-gray-800 mb-2">
              Your screen is its dictionary
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-normal">
              Understands what&apos;s on your screen and adapts to everyday
              text.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
