"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useLayoutEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";


gsap.registerPlugin(ScrollTrigger);

export type TechListProps = SliceComponentProps<Content.TechListSlice>;

const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true, // pin the trigger element while active
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        },
      );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="wrapper overflow-hidden"
      ref={component}
      id="techList"
    >
      <Bounded as="div">
        <Heading size="xl" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      <div
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={slice.primary.react_name || ""}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <React.Fragment key={index}>
            <span
              className={"tech-item text-8xl font-extrabold uppercase tracking-tighter"}
              style={{
                color: index === 7 && slice.primary.react_color ? slice.primary.react_color : "inherit",
              }}
            >
              {slice.primary.react_name}
            </span>
            <span className="text-3xl">
              <MdCircle />
            </span>
          </React.Fragment>
        ))}
      </div>

      <div
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={slice.primary.next_js_name || ""}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <React.Fragment key={index}>
            <span
              className={"tech-item text-8xl font-extrabold uppercase tracking-tighter"}
              style={{
                color: index === 7 && slice.primary.next_js_color ? slice.primary.next_js_color : "inherit",
              }}
            >
              {slice.primary.next_js_name}
            </span>
            <span className="text-3xl">
              <MdCircle />
            </span>
          </React.Fragment>
        ))}
      </div>

      <div
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={slice.primary.django_name || ""}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <React.Fragment key={index}>
            <span
              className={"tech-item text-8xl font-extrabold uppercase tracking-tighter"}
              style={{
                color: index === 7 && slice.primary.django_color ? slice.primary.django_color : "inherit",
              }}
            >
              {slice.primary.django_name}
            </span>
            <span className="text-3xl">
              <MdCircle />
            </span>
          </React.Fragment>
        ))}
      </div>

      <div
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={slice.primary.java_name || ""}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <React.Fragment key={index}>
            <span
              className={"tech-item text-8xl font-extrabold uppercase tracking-tighter"}
              style={{
                color: index === 7 && slice.primary.java_color ? slice.primary.java_color : "inherit",
              }}
            >
              {slice.primary.java_name}
            </span>
            <span className="text-3xl">
              <MdCircle />
            </span>
          </React.Fragment>
        ))}
      </div>

    </section>
  );
};

export default TechList;