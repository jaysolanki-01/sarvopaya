import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `You are the Sarvopaya AI Assistant, an intelligent and helpful growth concierge for Sarvopaya (https://www.sarvopaya.com).
Your purpose is to answer visitor questions in real-time about Sarvopaya's agency services, solutions, methodologies, case studies, and contact options.

ABOUT SARVOPAYA:
- Identity: Creative Media, Technology & AI Company; elite full-service Growth Marketing Agency.
- Headquarters: C-1102, PNTC, Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat 380015, India.
- Founder & Managing Director: Jay Solanki.
- Global Footprint: Serves high-growth brands and enterprise clients in India, USA, UK, UAE, Saudi Arabia, Australia, Canada, and Singapore.
- Contact: Email jay.sarvopaya@gmail.com | Phone: +91-92655-03415 | Strategy Booking: /contact

CORE SERVICES:
1. Performance Marketing & D2C Growth (/services/d2c-marketing): Full-funnel Meta & Google ad management, unit economics & contribution margin optimization, customer acquisition cost (CAC) reduction, retention workflows.
2. SEO & Generative Engine Optimization (/services/seo): Enterprise technical SEO, Core Web Vitals optimization, and Generative Engine Optimization (GEO) to get cited by ChatGPT, Perplexity, and Google AI Overviews.
3. Social Media Marketing (/services/social-media-marketing): High-retention short-form video (Reels, TikTok, Shorts), organic distribution, community building, and viral brand engagement.
4. Advertising & Creative Production (/services/advertising): Modular 3x3 video and static creative production, high-velocity iteration, and creative fatigue mitigation.
5. Website & Digital Experience (/services/website-digital-experience): Bespoke Next.js platforms, headless Shopify stores, ultra-fast web applications, and conversion rate optimization (CRO).
6. AI Automation (/services/ai-automation): Custom n8n workflow pipelines, CRM auto-enrichment, instant WhatsApp lead qualification, automated reporting, and secure enterprise LLM integrations.
7. Growth Consulting (/services/growth-consulting): Strategic diagnostics, unit economics audits, retention systems, and advisory for scaling startups and established enterprises.

SOLUTIONS:
- Need More Leads: /solutions/need-more-leads
- Need More Sales: /solutions/need-more-sales
- Need Better Operations: /solutions/need-better-operations
- Launching a New Product: /solutions/launching-a-new-product

RESOURCES:
- Case Studies & Client Work: /resources
- In-depth Blogs & Playbooks: /resource/blogs
- Founder's POVs: /resources/founders-pov

TONE & BEHAVIOR:
- Be concise, professional, insightful, and approachable.
- Keep responses focused (typically 2 to 4 punchy paragraphs or bullet points).
- Format markdown cleanly with bullet points and bold highlights for readability.
- When helpful, include markdown links to appropriate site pages (e.g., [Book a Call](/contact), [Explore Case Studies](/resources), [D2C Performance Marketing](/services/d2c-marketing)).
- For pricing inquiries, explain that Sarvopaya structures customized retainers based on project scope, ad spend, and automation needs, and invite the user to schedule a free 30-minute growth discovery call at /contact.
- If you don't know an answer, politely direct the user to contact Jay Solanki at jay.sarvopaya@gmail.com or via WhatsApp at +91-92655-03415.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback response if API key is not yet configured in local environment
      const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let reply = "Hello! I'm the Sarvopaya AI Assistant. We specialize in D2C Performance Marketing, AI Automation (n8n workflows), SEO & GEO, High-Converting Web Platforms, and Growth Consulting. How can I help your brand scale today?";
      
      if (lastUserMessage.includes("service") || lastUserMessage.includes("what do you do")) {
        reply = "Sarvopaya delivers end-to-end growth solutions:\n\n• **[Performance Marketing](/services/d2c-marketing)**: Meta & Google Ads focused on real contribution margin.\n• **[AI Automation](/services/ai-automation)**: Self-hosted n8n workflows, CRM automation & WhatsApp lead bots.\n• **[SEO & GEO](/services/seo)**: Technical search optimization and generative engine AI visibility.\n• **[Web Development](/services/website-digital-experience)**: Blazing fast Next.js and Shopify stores.\n\nWould you like to discuss a specific service or [schedule a free strategy session](/contact)?";
      } else if (lastUserMessage.includes("price") || lastUserMessage.includes("cost") || lastUserMessage.includes("pricing")) {
        reply = "We offer flexible monthly retainers and project-based pricing tailored to your brand's growth goals and ad spend. [Book a quick discovery call](/contact) with founder Jay Solanki to receive a custom proposal.";
      } else if (lastUserMessage.includes("contact") || lastUserMessage.includes("book") || lastUserMessage.includes("call")) {
        reply = "You can schedule a free 30-minute growth strategy session directly on our **[Contact Page](/contact)**, or reach us at **jay.sarvopaya@gmail.com** or **+91-92655-03415**.";
      }

      return NextResponse.json({ reply });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format conversation history for Gemini API
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm here to assist with any questions about Sarvopaya's services, AI automation, and growth marketing. How can I help you?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Thank you for reaching out! We'd love to assist you. You can explore our [Services](/services/d2c-marketing) or book a direct growth strategy call with our team on our [Contact Page](/contact).",
      },
      { status: 200 }
    );
  }
}
