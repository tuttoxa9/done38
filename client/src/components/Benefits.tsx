import { Banknote, Package, Headset, Check, ArrowRight, Sparkles, Clock, Shield, Zap, Briefcase, Award } from "lucide-react";
import { useState } from "react";
import ShaderLogo from "@/components/ShaderLogo";

export default function Benefits() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Карточки с преимуществами
  const benefitCards = [
    {
      icon: <Banknote className="h-6 w-6 text-primary" />,
      title: "Стабильный доход",
      description: "Выплаты 3 раза в неделю без задержек. Ты всегда знаешь, сколько и когда получишь.",
      linkText: "Рассчитать доход",
      linkHref: "#calculator",
      color: "primary"
    },
    {
      icon: <Package className="h-6 w-6 text-secondary" />,
      title: "Всё необходимое",
      description: "Мы предоставляем фирменную сумку и брендированную форму для комфортной работы.",
      linkText: "Узнать подробнее",
      linkHref: "#",
      color: "secondary"
    },
    {
      icon: <Headset className="h-6 w-6 text-primary" />,
      title: "Поддержка 24/7",
      description: "Наша команда поддержки всегда готова ответить на твои вопросы в любое время суток.",
      linkText: "Как мы помогаем",
      linkHref: "#",
      color: "primary"
    }
  ];

  // Дополнительные преимущества
  const additionalBenefits = [
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Гибкий график",
      description: "Работай когда удобно — утром, днем или вечером"
    },
    {
      icon: <Shield className="h-5 w-5 text-secondary" />,
      title: "Стабильно",
      description: "Выплаты 3 раза в неделю без задержек"
    },
    {
      icon: <Award className="h-5 w-5 text-primary" />,
      title: "Бонусы",
      description: "Дополнительные бонусы за выполненные заказы"
    },
    {
      icon: <Briefcase className="h-5 w-5 text-secondary" />,
      title: "Карьера",
      description: "Возможность роста от курьера до менеджера"
    }
  ];

  return (
    <section id="benefits" className="py-16">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-sm text-primary font-medium">
            Преимущества работы у нас
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Почему курьеры выбирают <span className="gradient-text inline-flex items-center gap-2">
              <ShaderLogo width="35px" height="35px" /> ЮНИК
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Мы создаем технологичные и комфортные условия для наших курьеров
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {benefitCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={`bg-gradient-to-r ${card.color === 'primary' ? 'from-primary/20 to-primary/5' : 'from-secondary/20 to-secondary/5'} p-4`}>
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  {card.icon}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 font-heading">{card.title}</h3>
                <p className="text-muted-foreground text-sm min-h-[50px]">
                  {card.description}
                </p>
              </div>

              {/* Удалено "Нажми для подробностей" по запросу пользователя */}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-2/5 relative">
            <div className="relative max-w-sm">
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl blur-lg transform rotate-2"></div>
              <div className="glass-card rounded-xl p-2 relative">
                <img
                  src="/up.png"
                  alt="Курьер в современном городе"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 p-3 glass-card rounded-lg shadow-sm hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Быстрое развитие</div>
                  <div className="text-xs text-muted-foreground">От курьера до менеджера</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/5">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">Возможности</span> для твоего роста
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {additionalBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-primary/10 hover:bg-white/90 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <h4 className="font-bold text-lg">{benefit.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-11">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <a href="#apply" className="inline-flex items-center font-medium text-primary hover:underline">
                Присоединиться к команде <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
