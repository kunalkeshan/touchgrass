## Contributing Guide to Touchgrass

Welcome to the Touchgrass community! We're thrilled to have you here and appreciate your interest in contributing to our project. Below is a guide to help you get started with contributing to the Touchgrass application.

### Prerequisites

Before you begin contributing to Touchgrass, ensure you have the following prerequisites installed and set up on your development environment:

1. **Node.js v18 or Above**: Touchgrass requires Node.js version 18 or above to run smoothly. If you haven't installed Node.js yet, you can download and install it from the [official Node.js website](https://nodejs.org/).

2. **pnpm**: Touchgrass uses pnpm as its package manager. Make sure you have pnpm installed globally on your system. If not, you can install it using the following command:
    ```
    npm install -g pnpm
    ```

With these prerequisites in place, you're ready to start contributing to Touchgrass! 🌱

### Getting Started

1. **Fork the Repository**: Start by forking the [Touchgrass repository](https://github.com/kunalkeshan/touchgrass) to your GitHub account.

2. **Clone the Repository**: Next, clone your forked repository to your local machine using the following command:

    ```
    git clone https://github.com/your-username/touchgrass.git
    ```

3. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using npm or yarn:

    ```
    cd touchgrass
    pnpm install
    ```

4. **Set Up Convex Backend**: Follow the [Convex quickstart guide for React](https://docs.convex.dev/quickstart/react) to set up Convex for backend services.

5. **Set Up AI Grass Toucher**: You'll need an API key from the OpenAI dashboard for the AI Grass Toucher feature. Make sure to create an API key and follow any necessary setup instructions.

6. **Set Up Authentication**: Touchgrass uses Clerk for authentication. Follow the [guide for setting up Clerk with Convex](https://docs.convex.dev/auth/clerk) to configure authentication.

### Development Workflow

1. **Create a Branch**: Before making any changes, create a new branch for your feature or bug fix:

    ```
    git checkout -b feature-name
    ```

2. **Make Changes**: Make your desired changes to the codebase. Be sure to follow the existing code style and conventions.

3. **Test Locally**: Test your changes locally to ensure they work as expected.

4. **Commit Changes**: Once you're satisfied with your changes, commit them with a descriptive commit message:

    ```
    git add .
    git commit -m "Add feature or fix bug"
    ```

5. **Push Changes**: Push your changes to your forked repository:

    ```
    git push origin feature-name
    ```

6. **Submit a Pull Request**: Finally, submit a pull request from your forked repository to the main Touchgrass repository. Be sure to provide a detailed description of your changes.

### Tech Stack

Touchgrass is built with the following technologies:

-   React
-   Vite
-   Tailwind CSS
-   Shadcn UI
-   Convex (for backend services)
-   OpenAI (for AI Grass Toucher feature)
-   Clerk (for authentication)

### Contributions Welcome!

Contributions to Touchgrass are open and welcomed. We follow proper open-source practices, including code review, testing, and documentation. We appreciate your contributions and look forward to seeing your ideas and improvements!

If you have any questions or need assistance, feel free to reach out to us via GitHub issues or our social channels. Happy contributing! 🌱
