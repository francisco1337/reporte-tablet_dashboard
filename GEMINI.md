# Project Overview

This is a Next.js application that serves as a dashboard for analyzing survey data. The dashboard provides visualizations of key performance indicators (KPIs), employee performance, service ratings, and trends over time. It appears to be designed to provide insights into customer satisfaction and employee effectiveness.

The application is built with the following technologies:

*   **Framework:** Next.js (React)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Charting:** Recharts
*   **Icons:** Lucide React

The main page of the application is a comprehensive dashboard that includes:

*   KPI cards for a high-level overview.
*   Charts for visualizing data distribution, employee performance, and service ratings.
*   A detailed table of the raw survey data with sorting and filtering capabilities.

Currently, the application uses hardcoded sample data, but it is structured to easily connect to a live data source.

# Building and Running

To get the development environment running, use the following command:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

Other available scripts:

*   `npm run build`: To create a production build.
*   `npm run start`: To start the production server.
*   `npm run lint`: To run the ESLint linter.

# Development Conventions

*   **Component-Based Architecture:** The application is built with React components, with a main component that composes the entire dashboard.
*   **Styling:** The project uses Tailwind CSS for utility-first styling.
*   **Data Handling:** Data is currently hardcoded in the main page component. For a production environment, this should be replaced with a data fetching mechanism (e.g., `fetch`, `axios`, or a data-fetching library like SWR or React Query) to retrieve data from an API.
*   **Linting:** The project is set up with ESLint to enforce code quality and consistency.
