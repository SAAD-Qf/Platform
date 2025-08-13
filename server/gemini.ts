import { GoogleGenAI } from "@google/genai";

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "test-key" });

export async function generateAIResponse(message: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a helpful fashion assistant for Stylish Hub, an e-commerce store specializing in premium leather jackets, hoodies, pants, and fashion wear for men and women. 

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

Keep responses concise but helpful. If you don't know specific product details, acknowledge this and suggest browsing the product catalog.

Customer message: ${message}`
            }
          ]
        }
      ],
    });

    return response.text || "I'm here to help! Could you please rephrase your question?";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to browse our product catalog directly.";
  }
}