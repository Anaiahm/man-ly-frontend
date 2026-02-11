# Man*ly Frontend

## Overview

The Man*ly frontend is a React + TypeScript single-page application deployed on Netlify. It provides users with an interactive interface to browse providers, manage their care team, and personalize their experience.

The frontend communicates with a deployed Spring Boot backend via RESTful API calls and dynamically renders data-driven content based on authentication state and user interaction.

---

## Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Routing:** React Router
- **State Management:** React Hooks (useState, useEffect)
- **API Communication:** HTTP requests to deployed backend
- **Styling:** CSS
- **Deployment:** Netlify

TypeScript was used to improve type safety, reduce runtime errors, and strengthen understanding of structured data contracts between frontend and backend.

---

## Application Architecture

The application follows a component-based architecture:

- **Pages** handle top-level routes (Landing, SignIn, SignUp, Dashboard, ProviderSearch, Settings, etc.).
- **Reusable components** support layout and UI consistency.
- **API calls** connect the frontend to a deployed backend.
- **Authentication state** determines protected route access and conditional rendering.

React Router enables client-side routing without full page reloads, creating a seamless user experience.

---

## State & Data Flow

The frontend manages:

- Authentication state
- Provider data
- Care team data
- User preferences

Data is fetched from the backend using asynchronous requests and stored in component state. Side effects are handled using React lifecycle hooks.

Conditional rendering ensures:

- Protected routes only display when authenticated
- UI updates reflect backend changes
- Error and loading states are handled appropriately

This structure reinforces a reactive, data-driven UI model.

---

## Key Features

### Authentication State Management

The application maintains authentication state and dynamically updates the UI based on login status. This required understanding how frontend state controls route access and user-specific rendering.

### Dynamic Provider Filtering

Users can filter providers by category, name, or personalized categories. This feature required conditional logic, controlled UI state, and synchronization between user interaction and rendered results.

### Full-Stack Integration

The frontend communicates with a deployed backend API. This includes handling asynchronous data fetching, error management, and debugging routing inconsistencies between development and production environments.

---

## Challenges & Growth

Connecting the frontend to the deployed backend introduced real-world challenges, including CORS configuration and incorrect API base paths. Debugging these issues strengthened understanding of:

- Environment configuration
- HTTP request lifecycles
- Browser security policies
- Cross-layer debugging

Managing authentication state and conditional rendering also required a deeper understanding of React’s reactive data model and TypeScript typing patterns.

---

## Future Improvements

- Enhanced authentication and authorization handling
- Improved UI transitions and micro-interactions
- Expanded user personalization features
- Performance optimizations for larger datasets

## 🧊 Icebox 

The following features are planned for future iterations of Man*ly:

- **AI Reflection Buddy**  
  A supportive, reflective AI companion designed to encourage self-awareness and guided reflection. This tool will focus on affirmation and thoughtful prompts rather than diagnostic or clinical advice.

- **Mood-Based Theming**  
  Dynamic visual themes that respond to user check-ins, allowing the interface to subtly reflect emotional states through color and atmosphere.

- **Micro-Animations**  
  Intentional, subtle animations throughout the application to enhance polish, improve feedback, and create moments of delight.


- **Theme Preferences in Settings**  
  User-controlled theme customization within the Settings page to support personalization and accessibility.
