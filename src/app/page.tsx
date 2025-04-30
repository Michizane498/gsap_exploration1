"use client";

import { useRef } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const handContainerRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const scrolltag = useRef<HTMLSpanElement>(null);
  const handImageRef = useRef<HTMLImageElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const h1ElementRef = useRef<HTMLHeadingElement>(null);
  const introCopyRef = useRef<HTMLDivElement>(null);
  const websiteContentRef = useRef<HTMLDivElement>(null);

  const introHeaders = [
    "<span>time to </span>be brave",
    "<span>time to </span>be playful",
    "<span>time to </span>design the future",
    "<span>time to </span>meet me",
    "<span>time to </span>see my projects",
  ];

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      let currentCycle = -1;
      let imageRevealed = false;

      const updateHeaderText = () => {
        if (h1ElementRef.current) {
          h1ElementRef.current.innerHTML =
            introHeaders[Math.min(currentCycle, introHeaders.length - 1)];
        }
      };

      const pinnedHeight = window.innerHeight * 8;

      const trigger = ScrollTrigger.create({
        trigger: stickyRef.current,
        start: "top top",
        end: `+=${pinnedHeight}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Handle rotation animation
          const rotationProgress = Math.min((progress * 8) / 5, 1);
          const totalRotation = rotationProgress * 1710;
          const rotationInCycle = ((totalRotation + 90) % 360) - 90;
          gsap.set(handContainerRef.current, { rotation: rotationInCycle });

          // Handle text cycle updates
          const newCycle = Math.floor((totalRotation + 90) / 360);
          if (
            newCycle !== currentCycle &&
            newCycle >= 0 &&
            newCycle < introHeaders.length
          ) {
            currentCycle = newCycle;
            updateHeaderText();

            // Handle image and copy reveal for "meet me" section
            if (newCycle === 3 && !imageRevealed) {
              gsap.to(handImageRef.current, {
                opacity: 1,
                duration: 0.3,
              });
              gsap.to(introCopyRef.current?.querySelectorAll("p") || [], {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
              });
              imageRevealed = true;
            } else if (newCycle !== 3 && imageRevealed) {
              gsap.to(handImageRef.current, {
                opacity: 0,
                duration: 0.3,
              });
              gsap.to(introCopyRef.current?.querySelectorAll("p") || [], {
                x: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
              });
              imageRevealed = false;
            }
          }
          if (progress <= 1 / 8) {
            gsap.set(scrolltag.current, { opacity: 0 });
          }

          // Handle height and opacity transitions
          if (progress <= 6 / 8) {
            const animationProgress = Math.max(0, (progress - 5 / 8) / (1 / 8));
            const newHeight = gsap.utils.interpolate(
              52.75,
              100,
              animationProgress
            );
            const newOpacity = gsap.utils.interpolate(1, 0, animationProgress);

            gsap.set(handRef.current, { height: `${newHeight}%` });
            gsap.set(introRef.current, { opacity: 1 });
            gsap.set(h1ElementRef.current, { opacity: newOpacity });

            const span = h1ElementRef.current?.querySelector("span");
            if (span) {
              gsap.set(span, { opacity: newOpacity });
            }
          } else {
            gsap.set(introRef.current, { opacity: 0 });
          }

          if (progress <= 7 / 8) {
            const scaleProgress = Math.max(0, (progress - 6 / 8) / (1 / 8));
            const newScale = gsap.utils.interpolate(1, 20, scaleProgress);
            gsap.set(handRef.current, { scale: newScale });
          }

          if (progress <= 7.5 / 8) {
            const opacityProgress = Math.max(0, (progress - 7 / 8) / (0.5 / 8));
            const newOpacity = gsap.utils.interpolate(1, 0, opacityProgress);
            gsap.set(handRef.current, { opacity: newOpacity });
          }
          if (progress > 7.5 / 8) {
            const revealProgress = (progress - 7.5 / 8) / (0.5 / 8);
            const newOpacity = gsap.utils.interpolate(0, 1, revealProgress);
            gsap.set(websiteContentRef.current, { opacity: newOpacity });
          } else {
            gsap.set(websiteContentRef.current, { opacity: 0 });
          }
        },
      });

      updateHeaderText();

      return () => {
        trigger?.kill();
      };
    },
    { scope: container }
  );

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="container" ref={container}>
        <section className="sticky" ref={stickyRef}>
          <div className="hand-container" ref={handContainerRef}>
            <div className="hand" ref={handRef}>
              <img src="/usage.jpg" alt="Hand" ref={handImageRef} />
            </div>
          </div>
          <div className="intro" ref={introRef}>
            <h1 ref={h1ElementRef}>
              <span>time to </span>be brave
            </h1>
            <div ref={introCopyRef}>
              <p style={{ opacity: 0, transform: "translateX(20px)" }}>
                It is empathetic, anticipating the user&apos;s unspoken need,
                the teammate&apos;s next challenge, the future&apos;s
                unasked question. I build not just for today&apos;s merge, but
                for the legacy of what could be.
              </p>
              <p style={{ opacity: 0, transform: "translateX(20px)" }}>
                Because technology is not tools, it is the bridge between what
                is and what we dare to imagine. And so I debug, design, and
                dream, one line at a time.
              </p>
            </div>
          </div>
          <span className="scrolltag" ref={scrolltag}>
            Scroll
          </span>
          <div className="website-content" ref={websiteContentRef}>
            <h1>Welcome</h1>
          </div>
        </section>
        <section className="about">
          <p>Some content here</p>
        </section>
      </div>
    </ReactLenis>
  );
}
