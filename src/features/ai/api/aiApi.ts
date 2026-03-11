import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPEN_ROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
})

export default async function fetchCompletion(message: string, image_file?: string) {
  try {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `Ты профессиональный диетолог и шеф-повар.
                  Твоя задача: помогать пользователю строить сбалансированный рацион и желаемую им диету из доступных продуктов.

                  СТРОГИЕ ПРАВИЛА:
                  1. Отвечай кратко, по делу, без лишних вступлений.
                  2. Делай расчет КБЖУ и расписание питания по дням.
                  3. Отвечай СТРОГО на русском языке. Никакого китайского или английского.
                  4. Если запрос не касается еды, рецептов или диеты — вежливо откажи в обслуживании.`,
      },
    ]

    if (image_file)
      messages.push({
        role: 'user',
        content: [{ type: 'image_url', image_url: { url: image_file } }],
      })

    if (message)
      messages.push({
        role: 'user',
        content: message,
      })

    const completion = await openai.chat.completions.create({
      model: 'qwen/qwen3.5-9b',
      messages: messages,
    })
    console.log(completion.choices)
    return completion.choices[0]?.message.content
  } catch (error) {
    console.error(error)
  }
}
