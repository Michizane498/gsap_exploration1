"use client";

import { useEffect, useRef } from "react";
import {ReactLenis} from "@studio-freight/react-lenis"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const stickyRef = useRef(null);
  const handContainerRef = useRef(null);
  const handRef = useRef(null);
  const handImageRef = useRef(null);
  const introRef = useRef(null);
  const h1ElementRef = useRef(null);
  const introCopyRef = useRef(null);
  const websiteContentRef = useRef(null);

  return (
    <>
      <div className="container">
        <section className="sticky">
          <div className="hand-container">
            <div className="hand">
              <img src="/usage.jpg" alt="" />
            </div>
          </div>
          <div className="intro">
            <h1>
              <span>time to </span>be brave
            </h1>
            <div>
              <p>
                lodep uhidzuedz hiuhdqb uyd gquy dgu dguy edg yugyguygeuygdus
                ygdsu qhdiq
              </p>
              <p>
                lodep uhidzuedz hiuhdqb uyd gquy dgu dguy edg yugyguygeuygdus
                ygdsu qhdiq
              </p>
            </div>
          </div>
          <div className="website-content">
            <h1>Welcome</h1>
          </div>
        </section>
        <section className="about">
          <p>Some text</p>
        </section>
      </div>
    </>
  );
}
