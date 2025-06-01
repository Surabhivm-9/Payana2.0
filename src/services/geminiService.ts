
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`, {
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
        const errorText = await response.text();
        console.error('Gemini API response:', errorText);
        throw new Error(`Gemini API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from Gemini API');
      }

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
You are a professional travel planning AI. Analyze the following trip request and provide comprehensive suggestions in JSON format.

Trip Details:
- Starting Point: ${tripData.startingPoint}
- Destinations: ${tripData.destinations.join(', ')}
- Duration: ${tripData.duration}
- Travelers: ${tripData.travelers}
- Budget: ${tripData.budget}
- Interests: ${tripData.interests}
- Additional Notes: ${tripData.notes || 'None'}

Please provide a detailed JSON response with the following structure:

{
  "accommodations": [
    {
      "name": "Hotel Name",
      "type": "Hotel/B&B/Airbnb",
      "priceRange": "$100-200/night",
      "rating": 4.5,
      "description": "Brief description",
      "location": "City, Area"
    }
  ],
  "restaurants": [
    {
      "name": "Restaurant Name",
      "cuisine": "Italian/Local/etc",
      "priceRange": "$25-50/person",
      "rating": 4.3,
      "description": "Brief description",
      "location": "City, Area"
    }
  ],
  "activities": [
    {
      "name": "Activity Name",
      "type": "Sightseeing/Adventure/etc",
      "duration": "2-3 hours",
      "cost": "$20-40",
      "description": "Brief description",
      "location": "City, Area"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "location": "City Name",
      "activities": ["Activity 1", "Activity 2"],
      "accommodation": "Hotel Name",
      "meals": ["Restaurant for breakfast", "Restaurant for dinner"],
      "notes": "Travel tips for the day"
    }
  ],
  "totalEstimatedCost": "$1500-2500 for the entire trip",
  "bestTimeToVisit": "Spring (March-May) for optimal weather",
  "packingList": ["Item 1", "Item 2", "Item 3"],
  "travelTips": ["Tip 1", "Tip 2", "Tip 3"]
}

Provide at least 3-5 suggestions for accommodations, restaurants, and activities. Make the recommendations specific to the destinations and interests mentioned. Return ONLY the JSON object, no additional text.
`;
  }

  private parseGeminiResponse(content: string): TripSuggestion {
    try {
      // Clean the response to extract JSON
      let jsonContent = content.trim();
      
      // Remove markdown code blocks if present
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Try to find JSON object in the response
      const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      }
      
      // If no JSON found, return fallback
      console.warn('Could not parse JSON from response, using fallback');
      return this.createFallbackResponse(content);
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      console.log('Raw content:', content);
      return this.createFallbackResponse(content);
    }
  }

  private createFallbackResponse(content: string): TripSuggestion {
    return {
      accommodations: [
        {
          name: "Centrally Located Hotel",
          type: "Hotel",
          priceRange: "$120-180/night",
          rating: 4.2,
          description: "Comfortable accommodation with modern amenities",
          location: "City Center"
        },
        {
          name: "Boutique Inn",
          type: "B&B",
          priceRange: "$90-140/night",
          rating: 4.4,
          description: "Charming local hospitality with personalized service",
          location: "Historic District"
        },
        {
          name: "Modern Apartment",
          type: "Airbnb",
          priceRange: "$80-120/night",
          rating: 4.3,
          description: "Spacious apartment perfect for families or groups",
          location: "Residential Area"
        }
      ],
      restaurants: [
        {
          name: "Local Favorite Bistro",
          cuisine: "Local",
          priceRange: "$30-50/person",
          rating: 4.5,
          description: "Authentic local cuisine with seasonal ingredients",
          location: "Downtown"
        },
        {
          name: "Rooftop Restaurant",
          cuisine: "International",
          priceRange: "$40-70/person",
          rating: 4.3,
          description: "Fine dining with panoramic city views",
          location: "City Center"
        },
        {
          name: "Cozy Café",
          cuisine: "Café",
          priceRange: "$15-25/person",
          rating: 4.6,
          description: "Perfect for breakfast and casual meals",
          location: "Arts Quarter"
        }
      ],
      activities: [
        {
          name: "City Walking Tour",
          type: "Sightseeing",
          duration: "3 hours",
          cost: "$25-35",
          description: "Guided tour of historical landmarks and attractions",
          location: "City Center"
        },
        {
          name: "Local Museum Visit",
          type: "Cultural",
          duration: "2-3 hours",
          cost: "$15-25",
          description: "Explore local history and culture",
          location: "Museum District"
        },
        {
          name: "Scenic Viewpoint",
          type: "Nature",
          duration: "1-2 hours",
          cost: "Free",
          description: "Beautiful views and photo opportunities",
          location: "Hilltop Area"
        }
      ],
      itinerary: [
        {
          day: 1,
          location: "Starting destination",
          activities: ["Check-in", "City Walking Tour", "Local Dinner"],
          accommodation: "Centrally Located Hotel",
          meals: ["Cozy Café (breakfast)", "Local Favorite Bistro (dinner)"],
          notes: "Take it easy on arrival day and get oriented"
        },
        {
          day: 2,
          location: "Main destination",
          activities: ["Museum Visit", "Scenic Viewpoint", "Shopping"],
          accommodation: "Centrally Located Hotel",
          meals: ["Hotel breakfast", "Rooftop Restaurant (dinner)"],
          notes: "Full day of exploration and sightseeing"
        }
      ],
      totalEstimatedCost: "$800-1200 per person for a weekend trip",
      bestTimeToVisit: "Spring or Fall for optimal weather and fewer crowds",
      packingList: [
        "Comfortable walking shoes",
        "Weather-appropriate clothing",
        "Camera or smartphone",
        "Portable charger",
        "Travel documents",
        "Light daypack"
      ],
      travelTips: [
        "Book accommodations in advance for better rates",
        "Try local specialties and ask for recommendations",
        "Use public transportation or walk when possible",
        "Keep copies of important documents",
        "Check local customs and etiquette",
        "Download offline maps for navigation"
      ]
    };
  }
}
