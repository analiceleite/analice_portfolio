/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef } from 'react';
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from '@prismicio/next';
import Bounded from "@/components/Bounded";
import Heading from '@/components/Heading';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

const getLinkUrl = (link: any) => {
  if (link?.url) {
    return link.url;
  }
  return '#';
};

const Projects = ({ slice }: ProjectsProps): JSX.Element => {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%', 
              end: 'bottom top', 
              scrub: true,
            },
          }
        );
      }
    });
  }, []);

  return (
    <div id='projects'>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="py-16 px-4"
      >
        <div className="container mx-auto">
          <Heading as="h1" size="xl">
            {slice.primary.heading}
          </Heading>
          <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {slice.primary.project.map((item, index) => (
              <div
                key={index}
                ref={(el) => { if (el) cardRefs.current[index] = el; }}
                className="relative group overflow-hidden rounded-lg shadow-xl transition-transform transform hover:scale-105 w-full lg:w-80 xl:w-96"
              >
                <PrismicNextImage
                  field={item.cover}
                  alt=""
                  className="w-full h-80 object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={getLinkUrl(item.button_link)}
                    className="text-white text-lg font-bold flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Project
                    <FaArrowRight className="ml-2" /> {/* Adiciona o ícone de seta */}
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 p-6 bg-black bg-opacity-50 text-white w-full">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Bounded>
    </div>
  );
};

export default Projects;
