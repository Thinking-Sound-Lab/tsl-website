import Image from "next/image";

export function Partners() {
  const partners = [
    { name: "Notion", logoPath: "/svgs/Notion.svg" },
    { name: "Linear", logoPath: "/svgs/Linear.svg" },
    { name: "Amazon", logoPath: "/svgs/Amazon.svg" },
    { name: "Webflow", logoPath: "/svgs/Webflow.svg" },
    { name: "Descript", logoPath: "/svgs/Descript.svg" },
    { name: "Figma", logoPath: "/svgs/Figma.svg" },
  ];

  return (
    <section>
      {/* Content area without container or border */}
      <div className="">
        {/* Heading with reduced spacing */}
        <div className="text-center p-2 sm:p-4 ">
          <h2 className="text-sm sm:text-md md:text-lg font-normal font-mono text-gray-800 tracking-tight text-pretty">
            Used by professionals everywhere to speed up their thoughts
          </h2>
        </div>

        {/* Partner Grid with stitched sides and solid top border only */}
        <div className="border-t border-gray-300">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-2 border border-gray-300 grayscale"
                >
                  <Image
                    src={partner.logoPath}
                    alt={partner.name}
                    width={80}
                    height={24}
                    className="object-contain w-full h-auto max-h-[24px] opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
