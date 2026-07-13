import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Precarga con prioridad — pasar true SOLO cuando el logo esté above-the-fold (hero) */
  priority?: boolean;
}

export function EnjoyLogo({ className, priority = false }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/logos/enjoy.png"
        alt="Enjoy"
        width={600}
        height={200}
        className="h-full w-auto object-contain brightness-0 invert"
        priority={priority}
      />
    </div>
  );
}

export function OutxideLogo({ className, priority = false }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/logos/outxide.png"
        alt="Outxide Club"
        width={600}
        height={200}
        className="h-full w-auto object-contain brightness-0 invert"
        priority={priority}
      />
    </div>
  );
}

export function OutxideXMark({ className }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/logos/outxide-x.png"
        alt="Outxide"
        width={200}
        height={200}
        className="h-full w-auto object-contain brightness-0 invert"
      />
    </div>
  );
}

export function HiruLogo({ className, priority = false }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/logos/hiru.png"
        alt="Hiru Food & Drinks"
        width={600}
        height={200}
        className="h-full w-auto object-contain brightness-0 invert"
        priority={priority}
      />
    </div>
  );
}

export function GroupLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-7">
        {/* Sin priority: el logo del navbar/footer no justifica un preload */}
        <Image
          src="/images/logos/enjoy.png"
          alt="Grupo Enjoy"
          width={400}
          height={140}
          className="h-full w-auto object-contain brightness-0 invert"
        />
      </div>
      <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase translate-y-px">
        Group
      </span>
    </div>
  );
}
