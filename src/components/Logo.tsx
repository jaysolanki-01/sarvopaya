import Image from "next/image";

type LogoProps = {
  variant?: "dark" | "light";
};

export default function Logo({ variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Image
      src={isLight ? "/images/Logo_white.png" : "/images/Logo_black.png"}
      alt="Sarvopaya"
      width={3564}
      height={719}
      priority
      className="h-7 w-auto sm:h-8"
    />
  );
}
