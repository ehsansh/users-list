# User Management Dashboard

A modern web application for browsing, filtering, and managing a list of randomly generated users. Built with Next.js, TypeScript, and SCSS.

[![Deploy with Vercel](https://vercel.com/button)](https://users-list-pi-lac.vercel.app/)

**Live Demo:** [https://users-list-pi-lac.vercel.app/](https://users-list-pi-lac.vercel.app/)

## Features

-   **Infinite Scrolling:** Dynamically loads new users as you scroll to the bottom of the page.
-   **Advanced Filtering:** Filter the user list by both nationality and gender.
-   **Favorite Users:** Mark users as favorites, with your choices saved directly in your browser's `localStorage`.
-   **Dedicated Favorites Page:** View all your favorited users on a separate page.
-   **Responsive Design:** A clean and modern UI that adapts seamlessly to all screen sizes.

## Technologies & APIs

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [SASS](https://sass-lang.com/) with the BEM (Block, Element, Modifier) naming methodology.
-   **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and component testing.
-   **APIs:**
    -   [**Random User API**](https://randomuser.me/): Used to fetch random user data.
    -   [**FlagCDN**](https://flagcdn.com/): Used to display country flags for the nationality filter.

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

-   Node.js (v18.0 or later recommended)
-   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project. This variable controls how many users are fetched per API call for the infinite scroll.
    ```
    NEXT_PUBLIC_RESULTS_PER_PAGE=10
    NEXT_PUBLIC_API_BASE_URL=https://randomuser.me/api/
    NEXT_PUBLIC_FLAG_BASE_URL=https://flagcdn.com/w40/
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Running Tests

To run the automated tests for this project, use the following command:

```bash
npm test
```

## Project Structure

The project follows a feature-sliced design approach to keep the codebase organized, scalable, and maintainable.

-   `src/app/`: Contains global layouts and page routing, adhering to the Next.js App Router conventions.
-   `src/components/`: Houses reusable, general-purpose ("dumb") components that are used across multiple features (e.g., `Header`, `Loading`, `UserCard`).
-   `src/features/`: Contains the core application features (e.g., `home`, `profile`, `favorite-users`). Each feature folder encapsulates its own components, hooks, API calls, and logic.
-   `src/data/`: Contains countries list.
-   `src/types/`: Typescript types and interfaces.
-   **Styling:** Component-level styling is achieved using SCSS Modules to ensure styles are locally scoped and prevent naming collisions.
-   **State Management:** State is managed primarily with React Hooks (`useState`, `useEffect`, `useCallback`). For synchronizing the "favorite" status across components, the application uses a lightweight combination of `localStorage` and a custom browser event (`favoritesChanged`), avoiding the need for a heavier global state library.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
