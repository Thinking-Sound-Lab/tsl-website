import Image from "next/image";

interface KeyboardKeyProps {
  keys: string[];
  platform?: "mac" | "windows";
}

export function KeyboardKey({ keys, platform = "mac" }: KeyboardKeyProps) {
  const getKeyDisplay = (key: string) => {
    // Mac symbols
    if (platform === "mac") {
      if (key.toLowerCase() === "fn") return "fn";
      if (key.toLowerCase() === "control" || key.toLowerCase() === "ctrl")
        return "⌃";
      if (key.toLowerCase() === "command" || key.toLowerCase() === "cmd")
        return "⌘";
      if (key.toLowerCase() === "option" || key.toLowerCase() === "alt")
        return "⌥";
      if (key.toLowerCase() === "shift") return "⇧";
      if (key.toLowerCase() === "space") return "Space";
    }

    // Windows keys
    if (platform === "windows") {
      if (key.toLowerCase() === "ctrl") return "Ctrl";
      if (key.toLowerCase() === "alt") return "Alt";
      if (key.toLowerCase() === "window key" || key.toLowerCase() === "win")
        return "winlogo";
      if (key.toLowerCase() === "shift") return "Shift";
      if (key.toLowerCase() === "space") return "Space";
    }

    return key;
  };

  return (
    <div className="inline-flex items-center gap-1">
      {keys.map((key, index) => {
        const displayKey = getKeyDisplay(key);
        const isWinLogo = displayKey === "winlogo";

        return (
          <div key={index} className="inline-flex items-center">
            <kbd
              className="inline-flex items-center justify-center min-w-[32px] h-7 px-2
                         font-mono text-xs font-semibold text-gray-700
                         bg-gradient-to-b from-gray-100 to-gray-200
                         border border-gray-300 rounded-sm
                         shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.8)]
                         hover:shadow-[0_1px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.8)]
                         hover:translate-y-[1px] transition-all duration-100"
            >
              {isWinLogo ? (
                <Image
                  src="/winlogo.svg"
                  alt="Windows"
                  width={14}
                  height={14}
                  className="opacity-70"
                />
              ) : (
                displayKey
              )}
            </kbd>
            {index < keys.length - 1 && (
              <span className="mx-1 text-gray-500 text-xs">+</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
