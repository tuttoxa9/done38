import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Star, Quote, ThumbsUp, MessageSquare, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
  const testimonialsRef = useRef(null);
  const isInView = useInView(testimonialsRef, { once: false, amount: 0.3 });
  
  const testimonials = [
    {
      name: "Александр, 22 года",
      position: "Курьер, 3 месяца",
      text: "Работаю уже 3 месяца, очень доволен! Удобный график, можно совмещать с учебой. Выплаты всегда вовремя, поддержка отвечает быстро.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100",
    },
    {
      name: "Мария, 27 лет",
      position: "Курьер, 6 месяцев",
      text: "Сначала переживала, но всё оказалось просто. Приложение удобное, заказы есть всегда. Могу работать 2-3 дня в неделю и этого достаточно.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100",
    },
    {
      name: "Дмитрий, 32 года",
      position: "Курьер, 1 год",
      text: "Отличная подработка! Работаю по вечерам после основной работы и в выходные. За месяц получаю неплохую прибавку к зарплате.",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=100&h=100",
    },
  ];

  // Статистика компании, которая будет плавно появляться
  const stats = [
    { title: "Лет на рынке", value: 5, icon: <Award className="h-4 w-4 text-primary" /> },
    { title: "Курьеров", value: 1000, icon: <ThumbsUp className="h-4 w-4 text-primary" /> },
    { title: "Доставок", value: "100K", icon: <MessageSquare className="h-4 w-4 text-primary" /> },
    { title: "Рейтинг", value: "4.9", icon: <Star className="h-4 w-4 text-primary fill-primary" /> }
  ];
  
  // Отслеживаем прокрутку для появления цифр
  const [countUpValues, setCountUpValues] = useState<{ [key: number]: any }>({
    0: 0,
    1: 0,
    2: 0,
    3: 0
  });
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCountUpValues(prevValues => {
          const newValues = { ...prevValues };
          
          // Числовые значения
          if (prevValues[0] < 5) newValues[0] = prevValues[0] + 1;
          if (prevValues[1] < 1000) newValues[1] = Math.min(1000, prevValues[1] + 50);
          
          // Текстовые значения
          if (prevValues[2] === 0) newValues[2] = "100K"; 
          if (prevValues[3] === 0) newValues[3] = "4.9";
          
          // Если все значения достигли максимума, останавливаем интервал
          if (newValues[0] >= 5 && newValues[1] >= 1000 && newValues[2] === "100K" && newValues[3] === "4.9") {
            clearInterval(interval);
          }
          
          return newValues;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 stroke-none h-4 w-4" />);
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="h-4 w-4">
          <defs>
            <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#half-fill)" 
            stroke="#FACC15"
            strokeWidth="1"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
          />
        </svg>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300 h-4 w-4" />);
    }

    return stars;
  };

  return (
    <section id="questions" className="py-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-0 w-48 h-48 bg-primary/10 rounded-full filter blur-[60px]"></div>
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-secondary/10 rounded-full filter blur-[70px]"></div>
      </div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-sm text-primary font-medium">
            Истории успеха
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Отзывы наших <span className="gradient-text">курьеров</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Узнай, что говорят курьеры, которые уже работают с нами
          </p>
        </div>

        <div className="relative">
          <div className="absolute -z-10 top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-primary/10 p-5 relative transition-all duration-300 ${activeTestimonial === index ? 'scale-[1.02] shadow-md bg-primary/5' : ''}`}
                onMouseEnter={() => setActiveTestimonial(index)}
                onMouseLeave={() => setActiveTestimonial(null)}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-sm">
                  <Quote className="h-4 w-4" />
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {renderStars(testimonial.rating)}
                  </div>
                  <div className="ml-2 text-xs font-medium bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">
                    {testimonial.rating.toFixed(1)}
                  </div>
                </div>

                <p className="text-foreground/80 mb-6 leading-relaxed text-sm min-h-[80px]">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center mt-auto border-t border-border/50 pt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ring-1 ring-primary/20">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-primary">{testimonial.position}</div>
                  </div>
                </div>
                
                {/* Дополнительная информация, которая появляется при наведении */}
                {activeTestimonial === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-white px-3 py-1 rounded-full text-xs text-primary font-medium border border-primary/20 shadow-sm"
                  >
                    Нажми для подробностей
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div 
          ref={testimonialsRef}
          className="mt-16 bg-white/70 backdrop-blur-sm rounded-xl border border-primary/10 shadow-sm p-8 relative overflow-hidden"
        >
          <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-heading tracking-tight">
                Присоединяйся к команде <span className="gradient-text">профессионалов</span>
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`bg-white/80 rounded-lg p-4 text-center border border-primary/10 transition-all duration-500 ${isInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="font-bold text-xl text-primary">
                      {typeof countUpValues[index] === 'number' ? countUpValues[index].toLocaleString() : countUpValues[index]}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.title}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Мы гордимся нашими курьерами и создаем для них комфортные условия. 
                Прозрачная система оплаты, своевременные выплаты и удобное приложение — 
                преимущества, которые делают работу с нами приятной и выгодной.
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col justify-center items-center">
              <p className="text-xl font-bold gradient-text mb-4 text-center">Начни зарабатывать с нами!</p>
              <a href="#apply">
                <Button className="primary-gradient text-white px-8 py-5 text-base font-medium hover:shadow-md hover:shadow-primary/20 transition-all">
                  Оставить заявку
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
