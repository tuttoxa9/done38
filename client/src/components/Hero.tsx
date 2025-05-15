import { useState, useRef } from "react";
import { Button } from "@/lib/ui-components";
import { ChevronRight, Wallet, Clock, Users, Smartphone, Zap, ArrowRight, Download, Phone, Send, CheckCircle2, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/lib/ui-components";

// Валидация формы заявки
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "ФИО должно содержать минимум 2 символа",
  }).max(50, {
    message: "ФИО не должно превышать 50 символов",
  }),
  birthDate: z.string().min(10, {
    message: "Введите дату рождения в формате ДД.ММ.ГГГГ",
  }).regex(/^\d{2}\.\d{2}\.\d{4}$/, {
    message: "Формат даты: ДД.ММ.ГГГГ",
  }),
  phone: z.string()
    .length(13, { message: "Номер должен быть в формате +375XXXXXXXXX" })
    .regex(/^\+375\d{9}$/, { message: "Формат: +375XXXXXXXXX" }),
});

type FormValues = z.infer<typeof formSchema>;

// Полноценный компонент для фоновых элементов
function BackgroundElements() {
  // Полная версия для всех устройств
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-10 right-[5%] w-48 h-48 bg-primary/30 rounded-full filter blur-[60px]"></div>
      <div className="absolute top-[30%] left-[10%] w-56 h-56 bg-secondary/30 rounded-full filter blur-[50px]"></div>
      <div className="absolute bottom-[15%] right-[15%] w-64 h-64 bg-pink-500/20 rounded-full filter blur-[70px]"></div>
      <div className="absolute top-[15%] left-[30%] w-40 h-40 bg-indigo-500/15 rounded-full filter blur-[80px]"></div>
    </div>
  );
}

export default function Hero() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      phone: "+375",
    },
  });

  const phoneInputRef = useRef<HTMLInputElement>(null);

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    setTimeout(() => {
      if (input.selectionStart !== null) {
        if (input.selectionStart < 4) {
          input.setSelectionRange(4, 4);
        }
      }
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, '');
    if (!value.startsWith('+375')) {
      value = '+375' + value.replace(/[^\\d]/g, '');
    }
    value = value.slice(0, 13); // +375 + 9 цифр
    form.setValue('phone', value);
    setIsPhoneComplete(value.length === 13);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (
      (input.selectionStart ?? 0) <= 4 &&
      ["Backspace", "Delete", "ArrowLeft"].includes(e.key)
    ) {
      e.preventDefault();
      input.setSelectionRange(4, 4);
    }
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d.]/g, '');

    // Автоматическое форматирование ДД.ММ.ГГГГ
    if (value.length === 2 && !value.includes('.')) {
      value = value + '.';
    } else if (value.length === 5 && value.charAt(2) === '.' && !value.includes('.', 3)) {
      value = value + '.';
    }

    form.setValue('birthDate', value);
  };

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch('/.netlify/functions/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.fullName,
          birthDate: values.birthDate,
          phone: values.phone
        }),
      });

      let responseData = null;
      try {
        if (response.headers.get('content-type')?.includes('application/json')) {
          responseData = await response.json();
        }
      } catch (e) {
        // Игнорируем ошибки парсинга JSON, если ответ пустой
      }

      if (!response.ok) {
        const message = responseData?.message || `Ошибка ${response.status}: ${response.statusText}`;
        throw new Error(message);
      }

      setSubmitStatus("success");
      setIsSuccess(true);

      form.reset({
        fullName: "",
        birthDate: "",
        phone: "+375"
      });
      setIsPhoneComplete(false);

    } catch (error: any) {
      console.error('Submit error:', error);
      setSubmitStatus("error");
      setErrorMessage(error.message || 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative pt-14 pb-16 overflow-hidden">
      <BackgroundElements />

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 z-10">
            <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              <Zap size={14} className="mr-2" />
              <span>Начни зарабатывать быстро и легко</span>
            </div>
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight tracking-tight">
              Твой <span className="animated-gradient-text">быстрый старт</span> в доставке
            </h1>
            <p className="text-lg text-foreground/70 mb-6 max-w-xl">
              Стань курьером с частыми выплатами и гибким графиком.
              Доступно с 16 лет на любой платформе (iOS/Android)
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="#apply" className="w-full sm:w-auto">
                <Button size="lg" className="primary-gradient w-full sm:w-auto text-white px-6 py-3 text-base">
                  Начать работу <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#calculator" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 px-6 py-3 text-base hover:bg-accent">
                  Рассчитать доход
                </Button>
              </a>
            </div>
            <div className="mt-4 bg-white/80 p-4 rounded-xl border border-primary/10 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Clock className="text-secondary h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">Гибкий график</span>
                  <p className="text-sm text-foreground/70">Ты сам выбираешь сколько работать</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="text-primary h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">Стабильный доход</span>
                  <p className="text-sm text-foreground/70">До 5000 BYN/мес при полной занятости</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative max-w-md mx-auto lg:ml-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl blur-xl transform rotate-3 scale-105"></div>

              <div className="relative z-10 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] bg-white/90 backdrop-blur-sm">
                <Tabs defaultValue="application" className="w-full">
                  <div className="px-4 pt-4">
                    <TabsList className="w-full bg-transparent gap-2 p-0 h-auto">
                      <TabsTrigger
                        value="application"
                        className="text-xs sm:text-sm py-2 flex-1 font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 border border-primary/20 data-[state=active]:border-primary hover:bg-primary/5">
                        Отправить заявку
                      </TabsTrigger>
                      <TabsTrigger
                        value="mobile-app"
                        className="text-xs sm:text-sm py-2 flex-1 font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 border border-primary/20 data-[state=active]:border-primary hover:bg-primary/5">
                        Мобильное приложение
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="relative h-[375px] overflow-hidden">
                    <TabsContent
                      value="application"
                      className="p-4 pt-4 m-0 absolute inset-0 w-full opacity-100 transition-opacity duration-300"
                    >
                      <div className="text-center mb-5">
                        <h3 className="text-lg font-semibold mb-1">Начни работать с нами</h3>
                        <p className="text-xs text-muted-foreground">Заполните форму и начните зарабатывать уже сегодня</p>
                      </div>
                      {isSuccess ? (
                        <div className="h-full text-center py-4 flex flex-col justify-center items-center">
                          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-fade-up">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                          </div>
                          <h3 className="text-xl font-bold mb-3 font-heading">Заявка успешно отправлена!</h3>
                          <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">Наш менеджер свяжется с вами в течение 15 минут для продолжения регистрации.</p>
                          <Button onClick={() => {setIsSuccess(false);setSubmitStatus("idle");setErrorMessage("");}} className="primary-gradient text-white px-5 py-2">Отправить еще заявку</Button>
                        </div>
                      ) : (
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-[300px] mx-auto">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} placeholder="ФИО" maxLength={50} className="py-1.5 px-3 text-xs rounded-lg bg-white/70 backdrop-blur-sm border-white/30 text-foreground" />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="birthDate" render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative group">
                                    <Input type="text" placeholder="Дата рождения (ДД.ММ.ГГГГ)" maxLength={10} value={field.value} onChange={handleBirthDateChange} className="py-1.5 px-3 text-xs rounded-lg bg-white/70 backdrop-blur-sm border-white/30 text-foreground pr-8" />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                      <Calendar className="h-3 w-3" />
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative group">
                                    <Input
                                      type="text"
                                      inputMode="numeric"
                                      autoComplete="tel"
                                      pattern="\+375\d{9}"
                                      maxLength={13}
                                      value={field.value}
                                      onChange={handlePhoneChange}
                                      onFocus={handlePhoneFocus}
                                      onKeyDown={handlePhoneKeyDown}
                                      placeholder="Номер телефона"
                                      className="py-1.5 px-3 text-xs rounded-lg bg-white/70 backdrop-blur-sm border-white/30 text-foreground pr-7"
                                    />
                                    {isPhoneComplete && (
                                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                      </div>
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )} />
                            <Button type="submit" className="w-full primary-gradient text-white py-2 px-4 text-sm font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 relative overflow-hidden group mt-1" disabled={isSubmitting}>
                              {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                  <div className="h-3 w-3 rounded-full border-2 border-t-transparent border-white animate-spin" />
                                  <span className="animate-pulse">Отправка...</span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                                  Отправить заявку <Send className="h-4 w-4 ml-1" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></div>
                            </Button>
                            <div className="text-center text-[10px] text-muted-foreground pt-0.5">
                              Нажимая кнопку, вы соглашаетесь с <a href="#" className="text-primary hover:underline">условиями обработки данных</a>
                            </div>
                            {/* Картинка test: если отображается — все ок */}
                            <div className="flex flex-col items-center mt-4 mb-1">
                              <img src="/images/bike1.webp" alt="test bike image" className="w-20 h-20 object-contain" onError={(e)=>{e.currentTarget.style.opacity='0.3'; e.currentTarget.nextSibling.textContent='(ошибка загрузки картинки, проверь public/images/bike1.webp)';}}/>
                              <span className="text-[10px] text-muted-foreground"></span>
                            </div>
                          </form>
                        </Form>
                      )}
                    </TabsContent>

                    <TabsContent
                      value="mobile-app"
                      className="p-4 pt-4 m-0 absolute inset-0 w-full opacity-100 transition-opacity duration-300"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold mb-1">
                          Скачайте приложение для работы
                        </h3>
                        <p className="text-xs text-muted-foreground">Доступно на всех популярных платформах</p>
                      </div>
                      <div className="space-y-4">
                        {/* Google Play - moved to the top with bluish gradient */}
                        <a
                          href="https://play.google.com/store/apps/details?id=ru.yandex.taximeter&hl=ru"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-5 py-4 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white transition-colors shadow-sm hover:shadow-lg active:scale-[0.99] space-x-4"
                        >
                          <div className="flex items-center gap-4">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M2 3.65629C2 2.15127 3.59967 1.18549 4.93149 1.88645L20.7844 10.2301C22.2091 10.9799 22.2091 13.0199 20.7844 13.7698L4.9315 22.1134C3.59968 22.8144 2 21.8486 2 20.3436V3.65629ZM19.8529 11.9999L16.2682 10.1132L14.2243 11.9999L16.2682 13.8866L19.8529 11.9999ZM14.3903 14.875L12.75 13.3608L6.75782 18.8921L14.3903 14.875ZM12.75 10.639L14.3903 9.12488L6.75782 5.10777L12.75 10.639ZM4 5.28391L11.2757 11.9999L4 18.7159V5.28391Z" fill="white"/>
                            </svg>
                            <div className="text-left">
                              <div className="text-xs opacity-80 leading-tight">Загрузить</div>
                              <div className="text-base font-semibold">Google Play</div>
                            </div>
                          </div>
                          <Download className="h-5 w-5 ml-4 flex-shrink-0" />
                        </a>

                        {/* App Store - middle position with white background */}
                        <a
                          href="https://apps.apple.com/ru/app/%D1%8F%D0%BD%D0%B4%D0%B5%D0%BA%D1%81-%D0%BF%D1%80%D0%BE-%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D0%B8-%D0%B8-%D0%BA%D1%83%D1%80%D1%8C%D0%B5%D1%80%D1%8B/id1496904594"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-5 py-4 rounded-xl bg-white text-black border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-lg active:scale-[0.99] space-x-4 mx-auto"
                        >
                          <div className="flex items-center gap-4">
                            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.0732 12.5499C17.0594 9.97183 19.1587 8.75288 19.2435 8.70181C17.9887 6.87961 16.0026 6.66309 15.3055 6.64738C13.609 6.45776 11.9686 7.64107 11.1022 7.64107C10.2162 7.64107 8.86523 6.6631 7.43643 6.69451C5.58518 6.72486 3.86441 7.74748 2.91465 9.35191C0.961961 12.6241 2.41392 17.4636 4.28155 20.0007C5.22919 21.2393 6.34526 22.6398 7.7937 22.5809C9.20265 22.517 9.71611 21.677 11.4203 21.677C13.0988 21.677 13.609 22.5809 15.0807 22.5454C16.6014 22.517 17.5707 21.2785 18.4773 20.0252C19.5736 18.5855 20.0048 17.1692 20.0283 17.0867C19.9907 17.0749 17.0908 15.9855 17.0732 12.5499Z"/>
                              <path d="M15.0097 4.21331C15.796 3.24685 16.3212 1.9288 16.1662 0.59082C15.0368 0.637133 13.6474 1.36554 12.8376 2.30617C12.1171 3.12831 11.4803 4.50639 11.6588 5.78647C12.9271 5.87497 14.2 5.17977 15.0097 4.21331Z"/>
                            </svg>
                            <div className="text-left">
                              <div className="text-xs opacity-80 leading-tight">Загрузите в</div>
                              <div className="text-base font-semibold">App Store</div>
                            </div>
                          </div>
                          <Download className="h-5 w-5 ml-4 flex-shrink-0" />
                        </a>

                        {/* AppGallery - bottom position with red gradient */}
                        <a
                          href="https://appgallery.huawei.ru/app/C101435517"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-colors shadow-sm hover:shadow-lg active:scale-[0.99] space-x-3"
                        >
                          <div className="flex items-center gap-4">
                            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id="appgallery-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop stopColor="#FFFFFF" offset="0%"></stop>
                                  <stop stopColor="#FFFFFF" offset="100%"></stop>
                                </linearGradient>
                              </defs>
                              <g>
                                <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#appgallery-gradient)" opacity="0"/>
                                <g transform="translate(6,6)">
                                  <path d="M9.101,0C1.705,0,0,1.705,0,9.099v15.802C0,32.295,1.705,35,9.101,35h15.793c7.396,0,10.106-2.705,10.106-10.099V9.099C35,1.705,32.295,0,24.899,0H9.101z" fill="url(#appgallery-gradient)" opacity="0"/>
                                  <path d="M14.703,19.879h1.445l-0.725-1.686L14.703,19.879z M14.347,20.729l-0.429,0.981h-0.976l2.076-4.711h0.844l2.068,4.711H17.927l-0.423-0.981H14.347z" fill="currentColor"/>
                                  <path d="M30.056,20.707h0.944V16h-0.944V20.707z" fill="currentColor"/>
                                  <path d="M26.301,18.685h1.739v-0.858H26.301V16.862h2.525v-0.859h-3.468v4.706h3.559v-0.859h-2.616V18.685z" fill="currentColor"/>
                                  <path d="M22.552,19.241l-1.07-3.241h-0.78L19.632,19.241l-1.041-3.239h-1.018l1.643,4.71h0.792l1.072-3.094l1.071,3.094h0.798l1.639-4.71h-0.992L22.552,19.241z" fill="currentColor"/>
                                  <path d="M11.502,18.698c0,0.766-0.38,1.176-1.071,1.176c-0.694,0-1.077-0.421-1.077-1.208V16.003h-0.956V18.698c0,1.326,0.737,2.086,2.021,2.086c1.297,0,2.04-0.775,2.04-2.125v-2.658h-0.955V18.698z" fill="currentColor"/>
                                  <path d="M6.115,16.000h0.956v4.713H6.115V18.799H3.956v1.914H3V16.000h0.956v1.901h2.159V16.000z" fill="currentColor"/>
                                  <path d="M17.998,11C14.691,11,12,8.308,12,5h0.848c0,2.841,2.311,5.152,5.152,5.152c2.841,0,5.152-2.311,5.152-5.152H24C24,8.308,21.309,11,17.998,11z" fill="currentColor"/>
                                </g>
                              </g>
                            </svg>
                            <div className="text-left">
                              <div className="text-xs opacity-80 leading-tight">Загрузите из</div>
                              <div className="text-base font-semibold">AppGallery</div>
                            </div>
                          </div>
                          <Download className="h-5 w-5 ml-4 flex-shrink-0" />
                        </a>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
