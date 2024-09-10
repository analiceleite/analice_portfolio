"use client";

import React, { useState, useLayoutEffect, useRef } from 'react';
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { MdArrowOutward } from 'react-icons/md';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const Contact = ({ slice }: ContactProps): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formRef = useRef(null);
  const buttonRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `*Hello Analice! I hope you're doing well. I came across your portfolio, which I found truly inspiring :D*\n\nI would love to learn more about your work and discuss some ideas. Here are my details:\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}\n\nLook forward to hear from you!`;
      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = '5547984957878';
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      gsap.to(buttonRef.current, { scale: 1.1, duration: 0.2, ease: "power1.out" });

      setTimeout(() => {
        window.open(whatsappLink, '_blank');
      }, 3000);

      setSubmitSuccess('Being redirected to Analice`s WhatsApp!');

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitSuccess(null);
      }, 4000);
    } catch (error) {
      setSubmitError('Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useLayoutEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current, // Elemento que ativa a animação
            start: "top 80%", // Inicia a animação quando o topo do elemento está a 80% da viewport
            end: "top 30%",   // Termina quando o topo do elemento atinge 30% da viewport
            toggleActions: "play none none none", // Play on entering, do nothing on leave
          },
        }
      );
    }
  }, []);

  return (
    <div id='contact'>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Heading>
          {slice.primary.heading}
        </Heading>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mt-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-[#11192D] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-[#11192D] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-white">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-[#11192D] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-[#11192D] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {submitSuccess && (
            <div className="text-green-600">{submitSuccess}</div>
          )}

          {submitError && (
            <div className="text-red-600">{submitError}</div>
          )}

          <button
            ref={buttonRef}
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              "group relative flex w-fit text-slate-800 items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-500 px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
              {
                'opacity-50 cursor-not-allowed': isSubmitting,
              }
            )}
          >
            <span className="absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
            <span className="relative flex items-center justify-center gap-2">
              {isSubmitting ? 'Sending...' : 'Send'}
              <MdArrowOutward className="inline-block" />
            </span>
          </button>
        </form>
      </Bounded>
    </div>
  );
};

export default Contact;
