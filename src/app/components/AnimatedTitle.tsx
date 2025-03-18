"use client"
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";    

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }: { title: string, containerClass: string }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // First, we create a special box (context) where our animation will live
    const ctx = gsap.context(() => {
      // We're making a timeline - it's like a storyboard for our animation!
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          // We tell the animation to start when our container comes into view
          trigger: containerRef.current,
          // Start when the bottom of the screen hits 100px from the top of our container
          start: "100 bottom",
          // End when the center of our container hits the bottom of the screen
          end: "center bottom",
          // This tells the animation what to do:
          // - "play" when it starts
          // - "none" if we scroll forward
          // - "none" if we scroll backward
          // - "reverse" when we scroll back up
          toggleActions: "play none none reverse",
        },
      });

      // Now we tell each word how to appear!
      titleAnimation.to(
        ".animated-word", // We're animating all the words with this class
        {
          opacity: 1,                   // Make the words visible (they start invisible)
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", // Move words to their final position
          ease: "power2.inOut",         // Make the movement smooth, like a bouncy ball
          stagger: 0.02,                // Wait 0.02 seconds between each word's animation
        },
        0  // Start right away (0 seconds delay)
      );
    }, containerRef);

    // When we're done, clean up our animation box so it doesn't make a mess
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;