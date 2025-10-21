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

// Narrow type for the slice primary data to include snake_case fields used in templates
type Primary = {
  heading?: string;
  angular_name?: string;
  angular_color?: string;
  docker_name?: string;
  docker_color?: string;
  django_name?: string;
  django_color?: string;
  java_name?: string;
  java_color?: string;
};

const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);
  const primary = slice.primary as Primary;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true, 
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
    return () => ctx.revert(); 
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
          {primary.heading}
        </Heading>
      </Bounded>

      <div
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={primary.angular_name || ""}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <React.Fragment key={index}>
            <span
              className={"tech-item text-8xl font-extrabold uppercase tracking-tighter"}
              style={{
                color: index === 7 && primary.angular_color ? primary.angular_color : "inherit",
              }}
            >
              {primary.angular_name}
            </span>
            <span className="text-3xl">
              <MdCircle />
            </span>
          </React.Fragment>
        ))}
      </div>

      <div
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={primary.docker_name || ""}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <React.Fragment key={index}>
            <span
              className={"tech-item text-8xl font-extrabold uppercase tracking-tighter"}
              style={{
                color: index === 7 && primary.docker_color ? primary.docker_color : "inherit",
              }}
            >
              {primary.docker_name}
            </span>
            <span className="text-3xl">
              <MdCircle />
            </span>
          </React.Fragment>
        ))}
      </div>

      <div
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={primary.django_name || ""}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <React.Fragment key={index}>
            <span
              className={"tech-item text-8xl font-extrabold uppercase tracking-tighter"}
              style={{
                color: index === 7 && primary.django_color ? primary.django_color : "inherit",
              }}
            >
              {primary.django_name}
            </span>
            <span className="text-3xl">
              <MdCircle />
            </span>
          </React.Fragment>
        ))}
      </div>

      <div
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={primary.java_name || ""}
      >
        {Array.from({ length: 15 }, (_, index) => (
          <React.Fragment key={index}>
            <span
              className={"tech-item text-8xl font-extrabold uppercase tracking-tighter"}
              style={{
                color: index === 7 && primary.java_color ? primary.java_color : "inherit",
              }}
            >
              {primary.java_name}
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