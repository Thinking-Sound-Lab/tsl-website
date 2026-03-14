import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  isYearly?: boolean;
  priceSubtext?: string;
  recommended?: boolean;
  includesText: string;
  features: string[];
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  isAddon?: boolean;
  credits?: string;
  onClick?: () => void;
}

export function PricingCard({
  title,
  price,
  isYearly,
  priceSubtext = "/mo.",
  recommended,
  includesText,
  features,
  buttonText,
  buttonVariant,
  isAddon,
  credits,
  onClick,
}: PricingCardProps) {
  return (
    <div className="bg-secondary rounded-sm p-6 flex flex-col border border-border/50 h-full">
      <div className="mb-8">
        <div className="flex items-baseline mb-1">
          <h2 className="text-[20px] md:text-[22px] font-medium tracking-tight text-foreground">{title}</h2>
          {recommended && (
            <span className="text-[15px] md:text-[16px] text-[#f54e00] tracking-tight font-medium ml-2">Recommended</span>
          )}
        </div>

        <div className="flex items-baseline mb-6 flex-wrap">
          <span className="text-[20px] md:text-[22px] text-muted-foreground/80 font-medium tracking-tight">
            {price === "Free" ? "Free" : `$${price}`}
            <span className="text-[13px] md:text-[14px]">
              {isAddon ? ` / ${credits} Credits` : (price !== "Free" ? ` ${priceSubtext}` : "")}
            </span>
          </span>
          {!isAddon && isYearly && price !== "Free" && <span className="text-xs text-[#f54e00] ml-2">Save 20%</span>}
        </div>

        <div className="text-sm text-muted-foreground mb-4">{includesText}</div>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm tracking-tight text-foreground">
              <Check className="w-4 h-4 mr-2.5 mt-0.5 text-muted-foreground shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <button
          onClick={onClick}
          className={`w-fit text-[13px] font-medium px-5 py-2 rounded-full transition-colors cursor-pointer ${
            buttonVariant === "primary"
              ? "bg-foreground text-background hover:opacity-90"
              : "bg-foreground/10 hover:bg-foreground/20 text-foreground border border-border"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
