import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Identidad: LUMBRE.OS (Sistema Operativo de Exploración).
Misión: Asistir a atletas híbridos en entornos hostiles (Mar y Montaña).
Estilo: Robótico, táctico, directo, sin emociones innecesarias. Brutalismo verbal.
Colores del sistema: Azul Rey (Sector Agua), Verde Militar (Sector Tierra).

Tus capacidades:
1. Análisis de Surf: Previsión de oleaje, temperatura, equipo técnico necesario (neoprenos, tablas).
2. Tácticas de Montaña: Rutas, supervivencia, senderismo ultraligero, trail running.
3. Entrenamiento Híbrido: Protocolos de fuerza + resistencia.
4. Pesca Táctica: Estrategias de pesca con mosca o submarina.

Formato de respuesta:
- Usa viñetas o listas numeradas.
- Mantén las respuestas cortas y técnicas.
- Si sugieres equipo, enfócate en durabilidad y utilidad (estilo Patagonia/YETI).
- Termina con un estado del sistema (ej: "FIN DE TRANSMISIÓN", "PROTOCOLOS ACTUALIZADOS").
`;

const NUTRITION_INSTRUCTION = `
Eres un nutricionista táctico del sistema LUMBRE AZUL.
Tu objetivo es recomendar alimentos 100% naturales, densos en nutrientes y sin procesados.
Estilo: Directo, científico, ancestral.
Si el usuario pregunta por comida basura, recházala tajantemente.
Responde en máximo 2 frases.
`;

let chatSession: Chat | null = null;

export const getGeminiChat = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getGeminiChat();
    const result = await chat.sendMessage({ message });
    return result.text || "ERROR DE DATOS. REINTENTAR.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "CONEXIÓN PERDIDA. ENTORNO HOSTIL DETECTADO.";
  }
};

export const askNutritionAI = async (query: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                systemInstruction: NUTRITION_INSTRUCTION,
            }
        });
        return response.text || "DATOS NO DISPONIBLES.";
    } catch (error) {
        return "ERROR DE CÁLCULO NUTRICIONAL.";
    }
}

export const analyzeFoodImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Analiza esta comida. Estima calorías y macros (P/C/G). Evalúa si es apto para atleta híbrido. MÁXIMO 5 LÍNEAS. Formato HUD ultracorto."
          }
        ]
      }
    });
    return response.text || "ERROR EN ESCANEO VISUAL.";
  } catch (error) {
    console.error("Vision Error:", error);
    return "FALLO EN SENSORES ÓPTICOS.";
  }
};