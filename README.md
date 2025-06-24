# AI-Itinerary Planner

**Effortless, Automated Trip Planning for Modern Travelers**

The AI-Itinerary Planner project addresses the common frustrations of trip planning: the tedious process, inflated prices from travel agents, and the uncertainty of figuring out activities only after reaching your destination. By automating itinerary creation and leveraging AI, this tool ensures travelers can focus on enjoying their journey—not planning it.

## Tech Stack

- **Frontend:** Next.js (with built-in API routes and NextAuth for authentication)
- **Backend (Compute & Maps):** Spring Boot ([itinerary-planner-spring](https://github.com/Nipun-Yv/itinerary-planner-spring))
- **Backend (Calendar SSE & Langchain):** FastAPI ([itinerary-planner-fastapi](https://github.com/Nipun-Yv/itinerary-planner-fastapi))

## Project Overview

AI-Itinerary Planner streamlines the entire trip planning workflow:

1. **Location Selection**
   - Choose from pre-configured destinations (currently Delhi and Goa).
   - Database and attraction data are available for these locations.

2. **Attraction Selection**
   - Browse and select attractions you wish to visit.

3. **Activity Customization**
   - View an activity screen tailored to your chosen attractions.
   - Select activities based on your interests.
   - Use the text drawer to describe your trip—its semantic meaning is analyzed to auto-select relevant tags and activities.
   - *Currently supports filtering by `activity_type`; additional filters are planned for future updates.*

4. **AI-Powered Itinerary Generation**
   - Click "Generate AI Itinerary" to automate the rest of your planning.
   - **Automated Route Planning:** Uses routing APIs to optimize your travel path.
   - **Dynamic Calendar Generation:** Calendar updates in real time using server-sent events (SSE).
   - **Smart Hotel Recommendations:** Hotels are rendered on a map along the planned route (within a 15km radius), so you plan your trip around what you do rather than where you stay.
   - **Hotel Booking Integration:** Cards redirect you to the hotel booking section for easy reservations.

5. **Hotel Section**
   - Access the `/hotels` route to independently browse hotel recommendations, or visit it after itinerary generation.

## Key Features

- **Customizable Map Markers:** Map markers are enhanced with images and text for better visual presentation[1].
- **Efficient Activity Management:** Scrollable UI components and map views for seamless tab and activity management[2].
- **SVG-Based UI Elements:** Uses SVG for custom shapes, responsive design, and text formatting[3].
- **Modern React Hooks:** Leverages React hooks like `useEffect` and `useCallback` for optimized component lifecycle and performance[4].

## Getting Started

To get started with the project, clone the repositories and follow the setup instructions in each backend and frontend project.

---

**AI-Itinerary Planner: Where your journey begins with a single click.**


