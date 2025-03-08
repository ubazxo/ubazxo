import { useScroll, useSpring, useTransform } from "framer-motion";

export const useScrollAnimation = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress);
  
  return {
    opacity: useTransform(smoothProgress, [0, 1], [0.3, 1]),
    scale: useTransform(smoothProgress, [0, 1], [0.8, 1])
  };
};
