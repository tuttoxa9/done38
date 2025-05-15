import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/range";
import { Calendar, Clock, ArrowUpRight, PiggyBank, Wallet, BarChart } from "lucide-react";

export default function IncomeCalculator() {
  const [hours, setHours] = useState<number>(8);
  const [days, setDays] = useState<number>(5);
  const [useVehicle, setUseVehicle] = useState<boolean>(false);
  const [income, setIncome] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
  });

  // Base hourly rate in BYN depending on transportation mode
  const getHourlyRate = () => useVehicle ? 15 : 12;

  useEffect(() => {
    const hourlyRate = getHourlyRate();
    const daily = hours * hourlyRate;
    const weekly = daily * days;
    const monthly = weekly * 4; // Assuming 4 weeks in a month

    setIncome({
      daily,
      weekly,
      monthly,
    });
  }, [hours, days, useVehicle]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  return (
    <section id="calculator" className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-48 h-48 bg-secondary/10 rounded-full filter blur-[60px]"></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-primary/10 rounded-full filter blur-[70px]"></div>
      </div>

      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-sm text-primary font-medium">
            Калькулятор заработка
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Узнай свой <span className="gradient-text">доход</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Рассчитай, сколько ты сможешь заработать в качестве курьера
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl blur-md"></div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 relative">
                <div className="space-y-10">
                  <div>
                    <h3 className="font-bold text-xl mb-5 flex items-center font-heading">
                      <Clock className="text-primary h-5 w-5 mr-2" />
                      Настрой свой график
                    </h3>

                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between mb-3">
                          <label className="text-base font-medium">Часов в день</label>
                          <span className="flex items-center gap-1 bg-primary/10 rounded-full px-3 py-0.5 text-sm font-medium">
                            <Clock className="h-3 w-3 text-primary" /> {hours} ч
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium">4ч</span>
                          <Slider
                            value={[hours]}
                            min={4}
                            max={12}
                            step={1}
                            onValueChange={(value) => setHours(value[0])}
                            className="flex-1"
                          />
                          <span className="text-xs font-medium">12ч</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-3">
                          <label className="text-base font-medium">Дней в неделю</label>
                          <span className="flex items-center gap-1 bg-primary/10 rounded-full px-3 py-0.5 text-sm font-medium">
                            <Calendar className="h-3 w-3 text-primary" /> {days} д
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium">2д</span>
                          <Slider
                            value={[days]}
                            min={2}
                            max={7}
                            step={1}
                            onValueChange={(value) => setDays(value[0])}
                            className="flex-1"
                          />
                          <span className="text-xs font-medium">7д</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-base font-medium flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={useVehicle}
                              onChange={(e) => setUseVehicle(e.target.checked)}
                              className="rounded text-primary w-4 h-4"
                            />
                            Я на мото/авто транспорте
                          </label>
                          {/* Удалены строки с ценой за час */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/10 shadow-md">
                    <div className="flex items-start gap-3">
                      <PiggyBank className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Регулярные выплаты</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Получай деньги 3 раза в неделю
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="font-bold text-xl mb-5 flex items-center font-heading">
                  <Wallet className="text-primary h-5 w-5 mr-2" />
                  Твой потенциальный доход
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="glass-card rounded-lg p-4 hover:shadow-sm transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-muted-foreground">В день</h4>
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">{hours}ч</span>
                    </div>
                    <div className="font-heading font-bold text-2xl gradient-text">
                      {formatCurrency(income.daily)} р
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">{hours}ч × {getHourlyRate()} р</div>
                      <ArrowUpRight className="h-3 w-3 text-primary" />
                    </div>
                  </div>

                  <div className="glass-card rounded-lg p-4 hover:shadow-sm transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-muted-foreground">В неделю</h4>
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">{days}д</span>
                    </div>
                    <div className="font-heading font-bold text-2xl gradient-text">
                      {formatCurrency(income.weekly)} р
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">{formatCurrency(income.daily)} р × {days}д</div>
                      <ArrowUpRight className="h-3 w-3 text-primary" />
                    </div>
                  </div>

                  <div className="glass-card rounded-lg p-4 hover:shadow-sm transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-muted-foreground">В месяц</h4>
                      <span className="text-xs bg-secondary/10 text-secondary rounded-full px-2 py-0.5">4 нед</span>
                    </div>
                    <div className="font-heading font-bold text-2xl gradient-text">
                      {formatCurrency(income.monthly)} р
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">{formatCurrency(income.weekly)} р × 4</div>
                      <ArrowUpRight className="h-3 w-3 text-secondary" />
                    </div>
                  </div>
                </div>



                <div className="text-xs text-muted-foreground mb-5">
                  * Приблизительный расчет. Фактический доход может отличаться в зависимости от района работы и количества заказов.
                </div>

                <div className="text-center">
                  <a href="#apply">
                    <Button size="lg" className="primary-gradient text-white px-8 py-5 text-base font-medium">
                      Начать зарабатывать
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
