"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export function AppAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const cleanupFns: Array<() => void> = [];

    const reveals = gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']");
    if (reveals.length > 0) {
      gsap.fromTo(
        reveals,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "opacity,transform,visibility",
        },
      );
    }

    const hoverables = gsap.utils.toArray<HTMLElement>("button, [data-gsap-button='true']");

    hoverables.forEach((el) => {
      if (el.dataset.noGsap === "true" || el.classList.contains("stack-btn")) return;

      const onEnter = () => {
        if (el instanceof HTMLButtonElement && el.disabled) return;
        if (!el.dataset.baseBg) {
          const styles = window.getComputedStyle(el);
          el.dataset.baseBg = styles.backgroundColor;
          el.dataset.baseColor = styles.color;
          el.dataset.baseShadow = styles.boxShadow;
        }

        gsap.to(el, {
          y: -2,
          backgroundColor: "#f2f2f2",
          color: "#000000",
          boxShadow: "0 8px 0 #bdbdbd",
          duration: 0.18,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          y: 0,
          backgroundColor: el.dataset.baseBg || "#000000",
          color: el.dataset.baseColor || "#ffffff",
          boxShadow: el.dataset.baseShadow || "none",
          duration: 0.18,
          ease: "power2.out",
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      cleanupFns.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    const cards = gsap.utils.toArray<HTMLElement>("[data-gsap-card='true']");
    cards.forEach((card) => {
      const onEnter = () => {
        gsap.to(card, {
          y: -4,
          boxShadow: "0 10px 0 #d6d6d6",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 0px 0 #d6d6d6",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      cleanupFns.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
