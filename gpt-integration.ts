// services/gptService.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class GPTService {
  static async improveText(text: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "أنت مساعد متخصص في تحسين النصوص العربية وتصحيح الأخطاء اللغوية مع الحفاظ على المعنى الأصلي."
          },
          {
            role: "user",
            content: `قم بتصحيح وتحسين النص التالي مع الحفاظ على المعنى: ${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0].message.content || text;
    } catch (error) {
      console.error('Error improving text:', error);
      throw new Error('فشل في تحسين النص');
    }
  }
}
