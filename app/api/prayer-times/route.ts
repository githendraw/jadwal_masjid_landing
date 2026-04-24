import { NextRequest, NextResponse } from "next/server";

// Kabupaten/Kota mapping for major Indonesian cities
// Uses regency_code from api.co.id
const CITY_CODE_MAP: Record<string, string> = {
  // Jakarta
  "jakarta": "3171", // Jakarta Pusat (default fallback)
  "jakarta selatan": "3174",
  "jakarta barat": "3173",
  "jakarta timur": "3178",
  "jakarta utara": "3172",
  "jakarta pusat": "3171",
  "jakarta tengah": "3171",
  "jakarta south": "3174",
  "jakarta west": "3173",
  "jakarta east": "3178",
  "jakarta north": "3172",
  "jakarta central": "3171",
  // Other major cities
  "bandung": "3273",
  "bandung kota": "3273",
  "surabaya": "3578",
  "medan": "1215",
  "makassar": "7374",
  "semarang": "3374",
  "bogor": "3218",
  "bogor kota": "3218",
  "depok": "3275",
  "bekasi": "3216",
  "tangerang": "3604",
  "tangerang selatan": "3604",
  "Palembang": "3401",
  "denpasar": "5171",
  "yogyakarta": "3412",
  "yunior": "3412",
  "solo": "3474",
  "batu": "3518",
  "ambon": "7425",
  "palembang": "3401",
  "padang": "1371",
  "banjarmasin": "6471",
  "pontianak": "6171",
  "balikpapan": "6471",
  "manado": "7103",
  "jambi": "1571",
  "bandar lampung": "1874",
  "mataram": "5171",
  "aceh": "1171",
};

// Default fallback: Masjid Istiqlal, Jakarta Pusat
const DEFAULT_LAT = -6.1698;
const DEFAULT_LON = 106.8309;
const DEFAULT_CITY = "Jakarta Pusat";
const DEFAULT_REGENCY_CODE = "3171";

// API Key from environment
const API_KEY = process.env.API_CO_ID_KEY;

// Reverse geocode: convert lat/lon to city name using a simple distance-based approach
// This is a simplified approach - for production, use a proper reverse geocoding API
function reverseGeocode(lat: number, lon: number): { city: string; regencyCode: string } {
  // This is a simplified reverse geocoding approach
  // For production, use a proper reverse geocoding service like Nominatim or Google Maps
  // Here we use a simple proximity-based approach
  
  // For now, we'll use a simple approach: if geolocation is available,
  // we'll try to determine the city from coordinates
  // If the user is near Jakarta area, return Jakarta Pusat
  
  const distToJakarta = Math.sqrt(
    Math.pow(lat - DEFAULT_LAT, 2) + Math.pow(lon - DEFAULT_LON, 2)
  );
  
  // If within ~50km of Jakarta, use Jakarta Pusat
  if (distToJakarta < 0.5) {
    return { city: DEFAULT_CITY, regencyCode: DEFAULT_REGENCY_CODE };
  }
  
  // For other cities, we'd need a full reverse geocoding database
  // For now, return the default
  return { city: DEFAULT_CITY, regencyCode: DEFAULT_REGENCY_CODE };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const date = searchParams.get("date"); // YYYY-MM-DD format

    // Get city and regency code
    let city = DEFAULT_CITY;
    let regencyCode = DEFAULT_REGENCY_CODE;

    if (lat && lon) {
      const result = reverseGeocode(parseFloat(lat), parseFloat(lon));
      city = result.city;
      regencyCode = result.regencyCode;
    }

    // If no date provided, use today
    const targetDate = date || new Date().toISOString().split("T")[0];

    // Fetch prayer times from api.co.id
    const apiUrl = `${process.env.PRAYER_API_BASE_URL || "https://use.api.co.id/regional/indonesia/prayer-times"}?regency_code=${regencyCode}&start_date=${targetDate}&end_date=${targetDate}`;

    const response = await fetch(apiUrl, {
      headers: {
        "x-api-co-id": API_KEY || "",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch prayer times", fallback: true },
        { status: 200 } // Return fallback data
      );
    }

    const data = await response.json();

    if (data.is_success && data.data && data.data.length > 0) {
      const prayerData = data.data[0];

      // Transform to our format
      const prayers = [
        { name: "Subuh", time: prayerData.subuh, icon: "🌙" },
        { name: "Terbit", time: prayerData.terbit, icon: "🌅" },
        { name: "Dzuhur", time: prayerData.dzuhur, icon: "☀️" },
        { name: "Ashar", time: prayerData.ashr, icon: "🌤️" },
        { name: "Maghrib", time: prayerData.maghrib, icon: "🌇" },
        { name: "Isya", time: prayerData.isya, icon: "🌃" },
      ];

      return NextResponse.json({
        city: city,
        prayers: prayers,
        gmtOffset: prayerData.gmt,
      });
    }

    // Fallback if API fails
    return NextResponse.json({
      city: city,
      prayers: [],
      gmtOffset: 7,
      fallback: true,
    });
  } catch (error) {
    return NextResponse.json({
      city: DEFAULT_CITY,
      prayers: [],
      gmtOffset: 7,
      fallback: true,
      error: "API request failed",
    });
  }
}
