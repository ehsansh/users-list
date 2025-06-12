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
    Create a file named `.env.local` in the root of the project. You have to define 3 variables there. One for number of results per page and two urls for the API.
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


## Project Structure

The project follows a feature-sliced design approach to keep the codebase organized, scalable, and maintainable.

-   `src/app/`: Contains global layouts and page routing, adhering to the Next.js App Router conventions.
-   `src/components/`: Houses reusable, general-purpose ("dumb") components that are used across multiple features (e.g., `Header`, `Loading`, `UserCard`).
-   `src/features/`: Contains the core application features (e.g., `home`, `profile`, `favorite-users`). Each feature folder encapsulates its own components, hooks, API calls, and logic.
-   `src/data/`: Contains countries list.
-   `src/types/`: Typescript types and interfaces.
-   **Styling:** Component-level styling is achieved using SCSS Modules to ensure styles are locally scoped and prevent naming collisions.
-   **State Management:** State is managed primarily with React Hooks (`useState`, `useEffect`, `useCallback`). For synchronizing the "favorite" status across components, the application uses a lightweight combination of `localStorage` and a custom browser event (`favoritesChanged`), avoiding the need for a heavier global state library.

## Performance & Optimization

To ensure a smooth user experience, the following performance optimizations have been implemented:

-   **Debouncing:** The `useUsers` hook implements debouncing for API requests to prevent rapid and unnecessary network calls.
-   **State-Level Throttling:** The `useUsers` hook is designed to keep a maximum of 200 users in the state at any time. This prevents the React component tree from becoming excessively large, which could lead to slower rendering and increased memory usage.
-   **Component Memoization:** `React.memo` is used on the `UsersList` component to prevent unnecessary re-renders, ensuring that the list only updates when the user data actually changes.

### Future Improvements: Virtualization

For applications expecting to render many thousands of items, a more advanced optimization would be to implement "windowing" or "virtualization." A library like [**react-window**](https://www.npmjs.com/package/react-window) could be used. This technique ensures that only the items currently visible in the viewport are mounted in the DOM, offering significant performance gains for extremely large lists.


## Running with Docker

You can also run this project in a container using Docker. This is a great way to ensure a consistent environment for the application.

### Prerequisites

-   [Docker](https://docs.docker.com/engine/install/) installed on your machine.

### Build & Run

1.  **Ensure you have a `.env` file** with the required variables as described in the "Installation & Setup" section.

2.  **Build the Docker image:**
    You need to pass your environment variables from the `.env` file to the Docker build command.

    **Method 1: Recommended (Reliable & Explicit)**
    This command ensures a successful build by reading variables directly from your `.env` file and passing them to Docker. It's the safest method and will work in any shell.
    ```bash
    export $(grep -v '^#' .env | xargs) && docker build \
      --build-arg NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} \
      --build-arg NEXT_PUBLIC_FLAG_BASE_URL=${NEXT_PUBLIC_FLAG_BASE_URL} \
      --build-arg NEXT_PUBLIC_RESULTS_PER_PAGE=${NEXT_PUBLIC_RESULTS_PER_PAGE} \
      -t my-nextjs-app .
    ```

    **Method 2: Simpler (Requires Pre-Exported Variables)**
    You can use a simpler command *only if* you have already exported the environment variables from your `.env` file into your current terminal session.
    ```bash
    # Note: This will only work if the NEXT_PUBLIC_* variables are already in your environment!
    docker build -t my-nextjs-app .
    ```

3.  **Run the Docker container:**
    This command starts a container from the image you just built.

    ```bash
    docker run -p 3000:3000 my-nextjs-app
    ```

    The application will now be running and accessible at [http://localhost:3000](http://localhost:3000).

## Running Tests

To run the automated tests for this project, use the following command:
```bash
npm test
```