const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const categorizeComplaint = async (text) => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
You are an AI system used by a college administration.

Task:
Classify the complaint and assign priority.

Rules for PRIORITY:
- HIGH: Issues affecting health, hygiene, safety, exams, or basic necessities (water, electricity).
- MEDIUM: Issues affecting comfort or productivity but not dangerous.
- LOW: Minor, non-urgent maintenance issues.

Return ONLY valid JSON in this exact format:
{
  "category": "Water | Electricity | Internet | Cleanliness | Other",
  "priority": "High | Medium | Low"
}

Complaint:
${text}
`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    const responseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    const jsonMatch = responseText?.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return fallbackCategorization(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return fallbackCategorization(text);
  }
};

const fallbackCategorization = (text) => {
  const t = text.toLowerCase();

  let category = "Other";
  let priority = "Medium";

  if (t.includes("water") || t.includes("pipe") || t.includes("leak")) {
    category = "Water";
    priority =
      t.includes("no water") ||
      t.includes("cannot use washroom") ||
      t.includes("health") ||
      t.includes("sanitation")
        ? "High"
        : "Medium";
  } else if (t.includes("power") || t.includes("electric")) {
    category = "Electricity";
    priority =
      t.includes("no power") ||
      t.includes("exam") ||
      t.includes("danger")
        ? "High"
        : "Medium";
  } else if (t.includes("wifi") || t.includes("internet")) {
    category = "Internet";
    priority = t.includes("exam") ? "High" : "Medium";
  } else if (t.includes("garbage") || t.includes("dirty")) {
    category = "Cleanliness";
    priority =
      t.includes("health") ||
      t.includes("smell") ||
      t.includes("hygiene")
        ? "High"
        : "Medium";
  }

  return { category, priority };
};
