import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  ArrowRight,
  Zap,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ShaderLogo from "@/components/ShaderLogo";

// Единая анимация для футера без зависимости от скролла
const footerAnimation = {
  hidden: { opacity: 0, filter: "blur(5px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={footerAnimation}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-28 pb-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-secondary/10 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container-custom relative">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 -z-10">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-5">
            <path d="M50 0L61.5 38.5H100L69.25 62.25L80.75 100L50 76.25L19.25 100L30.75 62.25L0 38.5H38.5L50 0Z" fill="url(#footerGradient)" />
            <defs>
              <linearGradient id="footerGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#cbd5e1" />
                <stop offset="1" stopColor="#475569" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 gap-x-8 mb-16">
          <div className="lg:col-span-4">
            <div className="text-3xl font-bold mb-6 inline-block">
              <Link href="/">
                <div className="flex items-center gap-2">
                  <ShaderLogo width="35px" height="35px" />
                  <span className="gradient-text font-heading tracking-tighter">ЮНИК</span>
                </div>
              </Link>
            </div>

            <p className="text-slate-400 mb-6 leading-relaxed">
              Современный сервис доставки с гибким графиком работы и достойным заработком для курьеров. Технологичное решение для быстрого поиска работы и стабильного дохода.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-300 hover:text-white transition-all duration-300">
                <CheckCircle2 className="mr-3 h-5 w-5 text-secondary" />
                <span>Удобное мобильное приложение</span>
              </div>
              <div className="flex items-center text-slate-300 hover:text-white transition-all duration-300">
                <CheckCircle2 className="mr-3 h-5 w-5 text-secondary" />
                <span>Выплаты 3 раза в неделю</span>
              </div>
              <div className="flex items-center text-slate-300 hover:text-white transition-all duration-300">
                <CheckCircle2 className="mr-3 h-5 w-5 text-secondary" />
                <span>Поддержка 24/7</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 md:mt-0">
            <h3 className="font-heading font-bold text-xl mb-6 text-white">Навигация</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-all duration-300 flex items-center hover:translate-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span>Главная
              </a></li>
              <li><a href="#benefits" className="text-slate-400 hover:text-white transition-all duration-300 flex items-center hover:translate-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span>Преимущества
              </a></li>
              <li><a href="#calculator" className="text-slate-400 hover:text-white transition-all duration-300 flex items-center hover:translate-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span>Калькулятор
              </a></li>
              <li><a href="#about" className="text-slate-400 hover:text-white transition-all duration-300 flex items-center hover:translate-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span>О нас
              </a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-xl mb-6 text-white">Контакты</h3>
            <ul className="space-y-5">
              <li className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4">
                  <Phone className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Телефон</p>
                  <a href="tel:+375298646329" className="text-white hover:text-secondary transition-all duration-300">+375 29 864-63-29</a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4 mt-1">
                  <MapPin className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Адрес</p>
                  <span className="text-white">г. Минск, ул. Игнатенко 7, 2 этаж</span>
                </div>
              </li>
            </ul>
          </div>

          <motion.div
            variants={footerAnimation}
            className="lg:col-span-3"
          >
            <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 h-full">
              <h3 className="font-heading font-bold text-xl mb-4 text-white">Присоединяйся к команде</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                <span className="text-white font-medium">Если серьезно</span>, то мы очень ценим наших курьеров и водителей. Можете не сомневаться — вам понравится работать с нами!
              </p>
              <a href="#apply">
                <Button className="w-full primary-gradient text-white font-medium py-6 group">
                  Стать курьером
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="pt-10 border-t border-slate-800/80 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear} ЮНИК. Все права защищены.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors duration-300">Политика конфиденциальности</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors duration-300">Условия использования</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
