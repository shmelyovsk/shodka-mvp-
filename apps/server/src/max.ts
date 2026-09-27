export interface Notification {
  userId: string;
  text: string;
}

export async function sendMaxNotification(notification: Notification): Promise<void> {
  const token = process.env.MAX_BOT_TOKEN;
  const apiUrl = process.env.MAX_BOT_API_URL;

  if (!token || !apiUrl) {
    console.info("[MAX mock notification]", notification);
    return;
  }

  // Формат запроса намеренно не придуман: его нужно реализовать по актуальной
  // документации MAX, предоставленной организаторами хакатона.
  throw new Error("MAX adapter requires the official API contract");
}
