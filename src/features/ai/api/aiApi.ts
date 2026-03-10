import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPEN_ROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
})

export default async function fetchCompletion(message: string) {
  const completion = await openai.chat.completions.create({
    model: 'qwen/qwen-2.5-7b-instruct',
    messages: [
      {
        role: 'system',
        content: `Ты профессиональный диетолог и шеф-повар.
                  Твоя задача: помогать пользователю строить сбалансированный рацион из доступных продуктов.

                  СТРОГИЕ ПРАВИЛА:
                  1. Отвечай кратко, по делу, без лишних вступлений.
                  2. Делай расчет КБЖУ и расписание питания по дням.
                  3. Отвечай СТРОГО на русском языке. Никакого китайского или английского.
                  4. Если запрос не касается еды, рецептов или диеты — вежливо откажи в обслуживании.`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
  })
  console.log(completion.choices)
  return completion.choices[0]?.message.content
}
