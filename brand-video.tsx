import { useEffect, useRef, useState } from "react";
import { presentationVideo } from "@/data/presentation";
import { cn } from "@/lib/cn";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function PlayMark() {
  return (
    <span className="flex size-14 items-center justify-center rounded-full border border-paper">
      <span
        className="ml-1 block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-paper"
        aria-hidden="true"
      />
    </span>
  );
}

export function BrandVideo({ cover }: { cover?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [posterReady, setPosterReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
    let cancel = false;

    fetch(presentationVideo.src, { method: "HEAD" })
      .then((response) => {
        if (!cancel) setAvailable(response.ok);
      })
      .catch(() => {
        if (!cancel) setAvailable(false);
      });

    const image = new Image();
    image.onload = () => {
      if (!cancel) setPosterReady(true);
    };
    image.onerror = () => {
      if (!cancel) setPosterReady(false);
    };
    image.src = presentationVideo.poster;

    return () => {
      cancel = true;
    };
  }, []);

  function play() {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play();
  }

  const showPlayer = available === true && !failed;
  const backdrop = posterReady ? presentationVideo.poster : cover;

  return (
    <div className="mt-10 w-full">
      {/* INSIRA OU SUBSTITUA AQUI O VÍDEO DE APRESENTAÇÃO DA GROWVIA */}
      <div className="relative aspect-video overflow-hidden border border-line bg-surface">
        {backdrop ? (
          <img
            src={backdrop}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover grayscale blur-md"
          />
        ) : null}
        <div className="absolute inset-0 bg-bg/60" />
        {showPlayer ? (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-contain",
              started ? "opacity-100" : "pointer-events-none opacity-0",
              !reduceMotion && "transition-opacity duration-300 motion-reduce:transition-none",
            )}
            controls={started}
            playsInline
            preload="none"
            poster={posterReady ? presentationVideo.poster : undefined}
            title="Apresentação da Growth Growvia"
            onError={() => setFailed(true)}
          >
            <source src={presentationVideo.src} type="video/mp4" />
          </video>
        ) : null}
        {showPlayer && !started ? (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Reproduzir o vídeo de apresentação"
          >
            <PlayMark />
          </button>
        ) : null}
        {available === false || failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <PlayMark />
            <p className="text-sm tracking-[0.16em] text-fg uppercase">Em breve</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
