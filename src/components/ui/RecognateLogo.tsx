"use client";
// HMR force update

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface RecognateLogoProps {
  animated?: boolean;
}

export default function RecognateLogo({ animated = false }: RecognateLogoProps) {
  const delays = [
    0.00, 0.05, 0.10, 0.15, 0.20, 0.22, 0.25, 0.30, 0.32, 0.35, 
    0.37, 0.39, 0.41, 0.43, 0.45, 0.47, 0.49, 0.51, 0.53, 0.60, 0.80
  ];

  const drawVariants: Variants = {
    hidden: { opacity: 0, pathLength: 0, fillOpacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      pathLength: 1,
      fillOpacity: 1,
      scale: 1,
      transition: {
        pathLength: { delay: delays[i], duration: 1.5, ease: "easeInOut" },
        fillOpacity: { delay: delays[i] + 1.0, duration: 0.5, ease: "easeIn" },
        opacity: { delay: delays[i], duration: 0.1 },
        scale: { delay: delays[i], duration: 0.5, ease: "easeOut" }
      }
    }),
    static: {
      opacity: 1,
      pathLength: 1,
      fillOpacity: 1,
      scale: 1,
      transition: { duration: 0 }
    }
  };

  const animationState = animated ? "visible" : "static";
  const initialAnimationState = animated ? "hidden" : "static";

  return (
    <svg 
      viewBox="350 410 840 130" 
      className="w-full h-auto" 
      preserveAspectRatio="xMidYMid meet"
    >
      <g style={{ transformOrigin: "center" }} strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="10">
        <motion.path custom={0} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" d="M444.29,426.63c30.18,2.72,41.1,42.89,15.6,59.03-2.24,1.42-4.59,2.08-6.64,3.26-.38.22-.75-.12-.57.76l34.45,41.38-30.15-9.73-35.12-41.39-5.45-7.29h28.34c.26,0,3.85-1.61,4.37-1.93,10.8-6.52,7.03-23.79-5.71-25.08l-71.11-.07-14.32-17.89.63-1.04h85.69Z"/>
        <motion.path custom={1} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" d="M851.14,433.99l-5.43,12.8c-19.77,1.82-44.34-6.43-56.29,13.78-7.27,12.3-5.05,29.06,6.45,38.09,3.09,2.43,10.18,5.88,14.09,5.88h27.03l.94-.92v-19.32h-20.43l-4.09-12.88h37.72v46.62h-41.18c-26.7,0-42.8-30.55-36.46-53.98,3.49-12.9,18.75-30.06,33.31-30.06h44.32Z"/>
        <motion.path custom={2} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" d="M929.72,487.36v-53.37h13.83v84.05c0,.18-3.02.97-3.48.05-18.17-17.65-35.71-35.65-54.36-52.81v51.84l-.94.92h-12.89v-84.66l2.86.58c16.65,15.36,31.69,32.58,48.36,47.9,2.07,1.9,4.28,3.91,6.62,5.5Z"/>
        <motion.path custom={3} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" d="M649.97,433.99l-4.46,12.82c-12.93,1.1-28.35-2.55-40.18,3.42-20.64,10.42-20.02,42.13,1.14,51.67,1.62.73,7.17,2.63,8.62,2.63h34.26v13.5h-34.26c-24.11,0-41.39-27.38-37.87-49.23,2.37-14.71,18.38-34.82,34.73-34.82h38.03Z"/>
        <motion.polygon custom={4} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="#183efa" stroke="#183efa" strokeWidth="1" points="1042.87 517.42 1027.79 517.42 1000.44 462.22 972.15 517.42 957.38 517.42 1000.44 433.39 1042.87 517.42"/>
        <motion.path custom={5} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="#183efa" stroke="#183efa" strokeWidth="1" d="M405.3,473.08l32.64,39.39c2.35,1.89,3.88,5.66,7.03,6.19.08.75-1.56.48-2.06.46-6.48-.3-15.21-1.35-21.7-2.27-.8-.11-1.66-.37-2.32-.84l-35.58-42.93h21.99Z"/>
        <motion.polygon custom={6} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" points="1105.11 433.99 1105.11 446.87 1079.33 447.48 1079.33 518.03 1066.13 518.03 1066.13 447.79 1065.19 446.87 1040.99 446.87 1040.99 433.99 1105.11 433.99"/>
        <motion.path custom={7} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" d="M712.21,523.55v-12.27c44.42-5.28,44.14-67.26,0-73v-12.27c19.29,1.32,35.44,13.97,42.42,31.3,12.17,30.2-8.94,64.51-42.42,66.24Z"/>
        <motion.path custom={8} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="#183efa" stroke="#183efa" strokeWidth="1" d="M704.66,426.63v11.66c-43.7,5.68-44.26,67.86,0,73v12.27c-27.3-2.44-46.26-25.42-44.66-51.87,1.39-22.99,20.59-43.85,44.66-45.06Z"/>
        <motion.rect custom={9} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="#183efa" stroke="#183efa" strokeWidth="1" x="504.75" y="468.96" width="55.95" height="13.5"/>
        <motion.rect custom={10} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" x="504.75" y="504.54" width="55.95" height="13.5"/>
        <motion.rect custom={11} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="#183efa" stroke="#183efa" strokeWidth="1" x="1122.05" y="468.96" width="55.98" height="13.5"/>
        <motion.rect custom={12} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" x="1122.06" y="504.54" width="55.97" height="13.5"/>
        <motion.rect custom={13} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" x="504.75" y="433.99" width="55.95" height="13.55"/>
        <motion.rect custom={14} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" x="1122.35" y="433.99" width="55.68" height="13.55"/>
        <motion.path custom={15} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" d="M1010.18,515.58h-20.75c2.75-5.21,5.07-10.79,7.83-15.98.82-1.55,2.11-3.76,3.48-4.88l9.44,20.86Z"/>
        <motion.path custom={16} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" d="M698.99,467.71l-10.67,7.09,10.41,7.65-1.62,3.69-15.66-10.82c-.15-.86,1.52-2.1,2.17-2.66,1.15-.99,11.33-8.34,12.05-8.53,1.67-.45,3.07,2.12,3.32,3.59Z"/>
        <motion.path custom={17} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" d="M735.95,473.99c.31.53.32,1.69,0,2.21l-14.65,9.81c-.44-.03-1.23-1.07-1.48-1.51-.29-.51-.74-1.02-.61-1.65.25-1.28,8.15-6.35,9.96-7.16.24-.94-.16-.98-.67-1.48-1.88-1.85-9.76-5.61-9.29-7.86l2.1-2.9c1.85,2.7,13.68,8.94,14.63,10.54Z"/>
        <motion.polygon custom={18} variants={drawVariants} initial={initialAnimationState} animate={animationState} fill="currentColor" stroke="currentColor" strokeWidth="1" points="716.56 460.43 704.73 491.27 700.87 491.37 712.91 460.13 713.77 459.21 716.56 460.43"/>
      </g>
    </svg>
  );
}
