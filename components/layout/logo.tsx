import { cn } from "@/lib/utils/cn";

interface LogoProps {
  size?: "sm" | "lg";
  className?: string;
}

export function Logo({ size = "lg", className }: LogoProps) {
  const isSmall = size === "sm";
  return (
    <div className={cn("font-display leading-[0.85] font-extrabold", className)}>
      <div
        className={cn(
          "text-stroke text-white",
          isSmall ? "text-2xl" : "text-5xl sm:text-7xl"
        )}
        style={{
          textShadow: isSmall
            ? "2px 2px 0 #1A1A2E"
            : "3px 3px 0 #1A1A2E, 5px 5px 0 rgba(26,26,46,0.15)",
        }}
      >
        ULAR
      </div>
      <div
        className={cn(
          "text-stroke bg-gradient-to-b from-brand-yellow via-brand-orange to-brand-orange-dark bg-clip-text text-transparent",
          isSmall ? "text-3xl" : "text-6xl sm:text-8xl"
        )}
        style={{
          WebkitTextStroke: isSmall ? "1.5px #1A1A2E" : "3px #1A1A2E",
          filter: "drop-shadow(3px 3px 0 #1A1A2E)",
        }}
      >
        TANGGA
      </div>
      <div
        className={cn(
          "text-stroke bg-gradient-to-b from-brand-sky to-brand-blue bg-clip-text text-transparent",
          isSmall ? "text-2xl" : "text-5xl sm:text-7xl"
        )}
        style={{
          WebkitTextStroke: isSmall ? "1.5px #1A1A2E" : "3px #1A1A2E",
          filter: "drop-shadow(3px 3px 0 #1A1A2E)",
        }}
      >
        MANIA
      </div>
    </div>
  );
}
