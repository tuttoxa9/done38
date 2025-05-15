import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ShaderLogo from "@/components/ShaderLogo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Преимущества", href: "#benefits" },
    { name: "Калькулятор", href: "#calculator" },
    { name: "О нас", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full blur-header">
      <div className="container-custom py-3 flex justify-between items-center">
        <Link href="/">
          <div className="text-3xl font-bold flex items-center gap-2 relative">
            <ShaderLogo width="35px" height="35px" />
            <span className="gradient-text font-heading tracking-tighter">ЮНИК</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <a href="#apply">
            <Button className="primary-gradient text-white px-6 py-6 font-medium">
              Начать работу
            </Button>
          </a>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[280px] sm:w-[350px] bg-white/90 backdrop-blur-xl">
            <div className="mt-8 flex flex-col gap-8">
              <Link href="/">
                <div className="text-3xl font-bold flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <ShaderLogo width="35px" height="35px" />
                  <span className="gradient-text font-heading tracking-tighter">ЮНИК</span>
                </div>
              </Link>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-foreground/80 hover:text-primary font-medium transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <a href="#apply" onClick={() => setIsOpen(false)}>
                <Button className="w-full primary-gradient text-white font-medium py-6">
                  Начать работу
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
