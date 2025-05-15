import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Интерфейс для данных заявки
interface ApplicationData {
  name: string;
  phone: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Проверка метода запроса
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    // Получаем данные из тела запроса
    const data: ApplicationData = JSON.parse(event.body || "{}");

    // Проверка наличия необходимых данных
    if (!data.name || !data.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields: name and phone" }),
      };
    }

    // Получаем токен бота и ID чата из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Проверка наличия переменных окружения
    if (!botToken || !chatId) {
      console.error("Missing environment variables: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Server configuration error" }),
      };
    }

    // Формируем сообщение для отправки
    const message = `🔔 *Новая заявка с сайта*\n\n👤 *Имя*: ${data.name}\n📱 *Телефон*: ${data.phone}\n\n⏰ *Дата*: ${new Date().toLocaleString('ru-RU')}`;

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.json();
      console.error("Telegram API error:", telegramError);
      throw new Error("Failed to send message to Telegram");
    }

    // Возвращаем успешный ответ
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Application submitted successfully" }),
    };
  } catch (error) {
    console.error("Error processing application:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

export { handler };
