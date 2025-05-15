// Новая анимация fadeFromBlur для появления из блюра
export const fadeFromBlur = (
  direction: "up" | "down" | "left" | "right",
  delay: number,
  duration: number = 0.7
) => {
  return {
    hidden: {
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: duration,
        delay: delay,
      },
    },
  };
};

export const fadeIn = (
  direction: "up" | "down" | "left" | "right",
  delay: number,
  duration: number = 0.7
) => {
  return {
    hidden: {
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
      opacity: 0,
      filter: "blur(5px)",
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: duration,
        delay: delay,
      },
    },
  };
};

export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number
) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const slideIn = (
  direction: "up" | "down" | "left" | "right",
  delay: number,
  duration: number = 0.7
) => {
  return {
    hidden: {
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      opacity: 0,
      filter: "blur(8px)",
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: "easeOut",
        delay: delay,
        duration: duration,
      },
    },
  };
};

export const textVariant = (delay: number) => {
  return {
    hidden: {
      y: 15,
      opacity: 0,
      filter: "blur(4px)",
    },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: "easeOut",
        delay: delay,
        duration: 0.7,
      },
    },
  };
};

export const zoomIn = (delay: number, duration: number) => {
  return {
    hidden: {
      scale: 0.9,
      opacity: 0,
      filter: "blur(6px)",
    },
    show: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: duration,
        delay: delay,
      },
    },
  };
};
