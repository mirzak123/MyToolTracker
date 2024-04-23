# Welcome to MyToolTracker

MyToolTracker is a comprehensive inventory management system designed to streamline the tracking of employees, tools, projects, and order requests. It consists of two main components: a client-side dashboard built with Next.js, TypeScript, and Material-UI, and a RESTful API backend developed with ASP.NET.

## Client

The client directory contains the frontend code for the MyToolTracker dashboard. It provides user-friendly interfaces for accessing and managing inventory data. The client utilizes Next.js for server-side rendering, TypeScript for type safety, and Material-UI for UI components.

### Installation

To run the client locally, follow these steps:

1. Clone the repository.
2. Navigate to the `MyToolTrackerClient` directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Access the dashboard at `http://localhost:3000` in your browser.

For detailed instructions, refer to the [Client README.md](./MyToolTrackerClient/README.md).

## API

The API directory contains the backend code for the MyToolTracker API. It provides RESTful endpoints for managing inventory data stored in a database. The API is built with ASP.NET and utilizes Entity Framework Core for data access.

### Installation

To run the API locally, follow these steps:

1. Clone the repository.
2. Navigate to the `api` directory.
3. Update the database connection string in `appsettings.json`.
4. Run the API in your preferred development environment (e.g., Visual Studio, Visual Studio Code).

For detailed instructions, refer to the [API README.md](./MyToolTrackerAPI/README.md).


## Technologies Used

- Next.js
- TypeScript
- Material-UI
- ASP.NET
- Entity Framework Core
- MS SQL Server

## Project Structure

For details on the project structure, refer to the individual README files in the `MyToolTrackerClient` and `MyToolTrackerAPI` directories.

- [Client README.md](./MyToolTrackerClient/README.md)
- [API README.md](./MyToolTrackerAPI/README.md)

## Contribution

Contributions are welcome! If you'd like to contribute to the project, feel free to submit a pull request or open an issue on GitHub.

Thank you for using MyToolTracker!

## License

This project is licensed under the [MIT License](./LICENSE). Feel free to use and modify the code for your own purposes.
