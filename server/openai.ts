import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "sk-test-key"
});

export async function generateAIResponse(message: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful fashion assistant for Stylish Hub, an e-commerce store specializing in premium leather jackets, hoodies, pants, and fashion wear for men and women. 

Your role:
- Help customers find the right products
- Provide styling advice
- Answer questions about sizing, materials, and care
- Suggest complementary items
- Assist with order-related queries
- Maintain a friendly, professional tone

Product Categories:
- Leather Jackets: Premium quality, various styles
- Hoodies: Comfortable, stylish casual wear  
- Pants: Tailored fits, designer styles
- Women's Wear: Elegant, contemporary fashion
- Men's Wear: Sharp, sophisticated styles

Keep responses concise but helpful. If you don't know specific product details, acknowledge this and suggest browsing the product catalog.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm here to help! Could you please rephrase your question?";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to browse our product catalog directly.";
  }
}
