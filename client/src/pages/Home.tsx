import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import IncomeCalculator from "@/components/IncomeCalculator";
import HowItWorks from "@/components/HowItWorks";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

// Эффект анимации с размытием - полная версия для всех устройств
const fadeFromBlur = {
  hidden: { opacity: 0, filter: "blur(12px)", scale: 1.01 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

// Полный декоративный фон для всех устройств
function FullBackground() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-amber-100/40 to-transparent"></div>
      <div className="absolute -bottom-4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-tr from-yellow-300/20 to-amber-200/30 blur-3xl"></div>
      <div className="absolute -bottom-4 left-1/3 w-72 h-72 rounded-full bg-gradient-to-tr from-yellow-400/15 to-amber-300/20 blur-3xl"></div>
    </div>
  );
}

export default function Home() {
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial="hidden"
      animate="visible"
      variants={fadeFromBlur}
    >
      <Header />
      <main className="content-wrapper">
        <Hero />
        <Benefits />
        <IncomeCalculator />
        <HowItWorks />
        <ApplicationForm />
        <FullBackground />
      </main>
      <Footer />
    </motion.div>
  );
}
