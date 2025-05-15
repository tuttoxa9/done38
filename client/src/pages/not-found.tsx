import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Страница не найдена</h2>
      <p className="mb-8 text-lg text-muted-foreground">
        Извините, запрашиваемая страница не существует или была перемещена.
      </p>
      <Link href="/">
        <a className="rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/90">
          Вернуться на главную
        </a>
      </Link>
    </div>
  );
}
