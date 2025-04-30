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
          const totalRotation = rotationProgress * 1800 - 90;
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
            
            // Handle image and copy reveal for "meet me" section (cycle 3)
            if (newCycle === 3 && !imageRevealed) {
              gsap.to(handImageRef.current, { 
                opacity: 1, 
                duration: 0.3 
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
                duration: 0.3 
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

          // Handle height and opacity transitions
          if (progress <= 6/8) {
            const animationProgress = Math.max(0, (progress - 5/8) / (1/8));
            const newHeight = gsap.utils.interpolate(52.75, 100, animationProgress);
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
        },
      });

      return () => {
        trigger?.kill();
      };
    },
    { scope: container }
  );

  return (
    <ReactLenis root>
      <div className="container" ref={container}>
        <section className="sticky" ref={stickyRef}>
          <div className="hand-container" ref={handContainerRef}>
            <div className="hand" ref={handRef}>
              <img 
                src="/usage.jpg" 
                alt="Hand" 
                ref={handImageRef}
                style={{ opacity: 0 }} // Initial state
              />
            </div>
          </div>
          <div className="intro" ref={introRef}>
            <h1 ref={h1ElementRef}>
              <span>time to </span>be brave
            </h1>
            <div ref={introCopyRef}>
              <p style={{ opacity: 0, transform: "translateX(20px)" }}>
                lodep uhidzuedz hiuhdqb uyd gquy dgu dguy edg yugyguygeuygdus
                ygdsu qhdiq
              </p>
              <p style={{ opacity: 0, transform: "translateX(20px)" }}>
                lodep uhidzuedz hiuhdqb uyd gquy dgu dguy edg yugyguygeuygdus
                ygdsu qhdiq
              </p>
            </div>
          </div>
          <div className="website-content" ref={websiteContentRef}>
            <h1>Welcome</h1>
          </div>
        </section>
        <section className="about">
          <p>Some text</p>
        </section>
      </div>
    </ReactLenis>
  );
}