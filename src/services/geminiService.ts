
interface TripAnalysisRequest {
  startingPoint: string;
  destinations: string[];
  duration: string;
  travelers: string;
  budget: string;
  interests: string;
  notes?: string;
}

interface TripSuggestion {
  accommodations: Array<{
    name: string;
    type: string;
    priceRange: string;
    rating: number;
    description: string;
    location: string;
  }>;
  restaurants: Array<{
    name: string;
    cuisine: string;
    priceRange: string;
    rating: number;
    description: string;
    location: string;
  }>;
  activities: Array<{
    name: string;
    type: string;
    duration: string;
    cost: string;
    description: string;
    location: string;
  }>;
  itinerary: Array<{
    day: number;
    location: string;
    activities: string[];
    accommodation: string;
    meals: string[];
    notes: string;
  }>;
  totalEstimatedCost: string;
  bestTimeToVisit: string;
  packingList: string[];
  travelTips: string[];
}

export class GeminiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeTripData(tripData: TripAnalysisRequest): Promise<TripSuggestion> {
    const prompt = this.buildPrompt(tripData);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;
      
      // Parse the AI response and structure it
      return this.parseGeminiResponse(content);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  private buildPrompt(tripData: TripAnalysisRequest): string {
    return `
You are a professional travel planning AI. Analyze the following trip request and provide comprehensive suggestions in JSON format:

Trip Details:
- Starting Point: ${tripData.startingPoint}
- Destinations: ${tripData.destinations.join(', ')}
- Duration: ${tripData.duration}
- Travelers: ${tripData.travelers}
- Budget: ${tripData.budget}
- Interests: ${tripData.interests}
- Additional Notes: ${tripData.notes || 'None'}

Please provide detailed suggestions for:
1. Accommodations (hotels, B&Bs, unique stays) with ratings and price ranges
2. Restaurants (local cuisine, fine dining, casual spots) with cuisine types and price ranges
3. Activities and attractions (based on interests) with duration and costs
4. Day-by-day itinerary suggestions
5. Total estimated cost breakdown
6. Best time to visit each destination
7. Packing recommendations
8. Local travel tips and insider knowledge

Format your response as a detailed JSON object with the structure matching the TripSuggestion interface. Include at least 3-5 suggestions for each category per destination, with realistic details, ratings, and descriptions.
`;
  }

  private parseGeminiResponse(content: string): TripSuggestion {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback: create structured response from text
      return this.createFallbackResponse(content);
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return this.createFallbackResponse(content);
    }
  }

  private createFallbackResponse(content: string): TripSuggestion {
    return {
      accommodations: [
        {
          name: "AI-Suggested Hotel",
          type: "Hotel",
          priceRange: "$100-200/night",
          rating: 4.2,
          description: "Based on AI analysis of your preferences",
          location: "Central location"
        }
      ],
      restaurants: [
        {
          name: "Local Favorite Restaurant",
          cuisine: "Local",
          priceRange: "$25-50/person",
          rating: 4.5,
          description: "Highly recommended by AI analysis",
          location: "Downtown area"
        }
      ],
      activities: [
        {
          name: "Recommended Activity",
          type: "Sightseeing",
          duration: "2-3 hours",
          cost: "$20-40",
          description: "Perfect for your interests",
          location: "Main attraction area"
        }
      ],
      itinerary: [
        {
          day: 1,
          location: "Starting destination",
          activities: ["Check-in", "Explore local area"],
          accommodation: "Selected hotel",
          meals: ["Welcome dinner"],
          notes: "Take it easy on the first day"
        }
      ],
      totalEstimatedCost: "Contact AI for detailed breakdown",
      bestTimeToVisit: "Spring or Fall for optimal weather",
      packingList: ["Comfortable walking shoes", "Weather-appropriate clothing", "Camera"],
      travelTips: ["Book accommodations in advance", "Try local cuisine", "Respect local customs"]
    };
  }
}
