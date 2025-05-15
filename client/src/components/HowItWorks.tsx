import {
  FileText,
  PhoneCall,
  Bike,
  Bell,
  Wallet,
  Smartphone,
  CheckCircle,
  Route,
  Clock,
  BadgePercent
} from "lucide-react";
import { useState } from "react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      number: 1,
      icon: <FileText className="h-5 w-5" />,
      title: "Заполни заявку",
      description: "Заполни простую форму на сайте, указав контактные данные",
      color: "primary"
    },
    {
      number: 2,
      icon: <PhoneCall className="h-5 w-5" />,
      title: "Пройди интервью",
      description: "Менеджер свяжется с тобой в течение 15 минут",
      color: "secondary"
    },
    {
      number: 3,
      icon: <Bike className="h-5 w-5" />,
      title: "Начинай работать",
      description: "Получи доступ к приложению и выполняй заказы",
      color: "primary"
    }
  ];

  const appFeatures = [
    {
      icon: <Route className="h-5 w-5 text-primary" />,
      title: "Умная маршрутизация",
      description: "Автоматическое построение оптимальных маршрутов с учетом пробок"
    },
    {
      icon: <Bell className="h-5 w-5 text-secondary" />,
      title: "Мгновенные уведомления",
      description: "Push-уведомления о новых заказах и изменениях"
    },
    {
      icon: <Wallet className="h-5 w-5 text-primary" />,
      title: "Финансовый трекер",
      description: "Отслеживание заработка и история выплат"
    }
  ];

  return (
    <section id="about" className="py-16 relative overflow-hidden">
      {/* Яркий фон с узором */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        <div className="absolute top-10 right-[10%] w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-20 left-[10%] w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full filter blur-[70px]"></div>
      </div>

      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-primary/10 via-blue-500/10 to-secondary/10 text-sm font-medium">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 via-purple-500 via-pink-500 to-secondary animate-text-gradient font-bold">Быстрый старт</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Как начать <span className="gradient-text">работать</span> с нами
          </h2>
          <p className="text-lg text-muted-foreground">
            Три простых шага для начала работы и получения стабильного дохода
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 relative mb-16">
            {/* Connecting line for desktop */}
            <div className="absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block"></div>

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="absolute -top-12 left-1/2 md:left-1/4 transform -translate-x-1/2 text-8xl font-bold text-primary/20 z-0 font-heading md:left-auto">{step.number}</div>

                <div className={`bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10 shadow-sm relative z-10 h-full flex flex-col p-5 transition-all duration-300 ${activeStep === index ? 'bg-primary/5' : ''}`}>
                  <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-md z-10 ${step.color === "primary" ? "from-primary to-primary/80 shadow-primary/20" : "from-secondary to-secondary/80 shadow-secondary/20"}`}>
                    {step.icon}
                  </div>

                  <div className="mt-6 text-center">
                    <h3 className="font-bold text-xl mb-2 font-heading">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>

                    {/* Удалено "Нажми для подробностей" по запросу пользователя */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-2/5 relative">
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-xl blur-lg transform rotate-2"></div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-primary/10 p-2 relative overflow-hidden">
                  <img
                    src="/images/mo1.png"
                    alt="Мобильное приложение для курьеров"
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-primary/10 hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Мобильное приложение</div>
                    <div className="text-xs text-muted-foreground">iOS/Android</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-3/5">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
                <span className="gradient-text">Приложение</span> для курьеров
              </h3>

              <div className="space-y-5 mb-6">
                {appFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${index % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'} flex items-center justify-center flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/80 border border-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Гибкий график</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/80 border border-primary/10">
                  <BadgePercent className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">Бонусы за заказы</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
