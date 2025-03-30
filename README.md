# Word Viz FE

## Description

Word Viz FE is an app to visualize word-related data that comes through WebSocket streaming.

## Tech Stack

- **Languages**: TypeScript, CSS, JavaScript, HTML
- **Library**: [`useWebSocket`](https://www.npmjs.com/package/react-use-websocket)
- **Build Tool**: [`Vite`](https://vite.dev/)
- **Testing Framework**: [`Vitest`](https://vitest.dev/)
- **CSS Framework**: [`Tailwind CSS`](https://tailwindcss.com/)
- **UI Components**: [`Shadcn UI`](https://shadcn.dev/)

## Table of Contents

- [Preview](#preview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Build](#build)

## Preview

![App Preview](/public/word-FE.png)

## Features

- Interactive word visualizations.
- Real-time data updates via WebSocket.
- User-friendly interface.
- Responsive design.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MohammadHejazi20/word-viz-FE.git
   ```

2. Navigate to the project directory:

   ```bash
   cd word-viz-FE
   ```

3. Install the dependencies using pnpm:

   ```bash
   pnpm install
   ```

## Usage

1. Ensure that the `SOCKET_URL` in the `.env` file matches the WebSocket URL for the backend. You can find the backend details in the following repository: [Word Stream BE](https://github.com/MohammadHejazi20/word-stream-BE).

2. Start the development server:

   ```bash
   pnpm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` or `http://localhost:5173/`.

## Running Tests

To run the tests, use the following command:

```bash
pnpm run test
```

For a UI version of the tests, use:

```bash
pnpm run test-ui
```

## Build

To build the project, use the following command:

```bash
pnpm run build
```

## Additional Links

- [WebSocket Library](https://www.npmjs.com/package/react-use-websocket)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://shadcn.dev/)
