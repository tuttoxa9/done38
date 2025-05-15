/**
 * Оптимизированный экспорт UI-компонентов
 * Это позволяет избежать импорта всех компонентов и уменьшить размер бандла
 */

// Экспортируем только используемые компоненты
export { Button } from "@/components/ui/button";
export { Input } from "@/components/ui/input";
export { Label } from "@/components/ui/label";
export { Toaster } from "@/components/ui/toaster";
export { TooltipProvider } from "@/components/ui/tooltip";
export {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Опционально можно добавить другие компоненты по мере необходимости
