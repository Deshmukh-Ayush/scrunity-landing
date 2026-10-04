"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PRICING_DATA } from "./data";
import { PricingCard } from "./pricing-card";

export const Pricing = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
      filter: shouldReduceMotion ? "none" : "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <div className="w-full">
      {/* 2-Tier Pricing Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
      >
        {PRICING_DATA.map((plan) => (
          <motion.div key={plan.id} variants={cardVariants} className="h-full">
            <PricingCard plan={plan} className="h-full" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
