# MyToolTrackerAPI

This directory contains the server-side API code for the MyToolTracker project.

## About
MyToolTrackerAPI is the backend component of the MyToolTracker application. It provides the necessary endpoints to manage employee, company, tool, project, order request, category, employee type, company type, and tool status data.

## Technologies Used

- **ASP.NET Core**: The backend of the application is built using ASP.NET Core, a cross-platform, high-performance framework for building web applications and services with .NET.
- **Entity Framework Core**: Entity Framework Core is used as the Object-Relational Mapping (ORM) framework for interacting with the database.
- **C#**: The primary programming language used for developing the backend logic and business logic of the application.

### Database
- **MS SQL Server**: The database management system used for storing and managing the application's data.

## Getting Started
To run the MyToolTracker API locally, follow these steps:
1. Clone this repository to your local machine.
2. Open the project in Visual Studio.
3. Configure the database connection string in the `appsettings.json` file under the `DefaultConnection` field. Ensure that you have an MS SQL Server database set up and running.
4. To seed the data from Seed.cs into your local database, run the application the first time as follows: `dotnet run seeddata`, then stop the execution.
5. Run the project in debug mode.

## Project Structure

The project directory structure is organized as follows:

- **MyToolTrackerAPI**: This directory contains the main project files and folders.
  - **Controllers**: Contains the controller classes responsible for handling incoming HTTP requests and returning appropriate responses.
  - **Data**: Contains the database context and related classes for interacting with the database.
  - **Dto**: Contains Data Transfer Object (DTO) classes used for transferring data between the API and the client.
  - **Helper**: Contains utility/helper classes and methods used across the application.
    - **MappingProfiles.cs:** Contains the mapping profiles that AutoMapper uses to map Models to DTOs and vice-versa.
  - **Interfaces**: Contains interface definitions used for dependency injection and abstraction.
  - **Migrations**: Contains Entity Framework Core migration files for database schema changes.
  - **Models**: Contains the entity classes that represent database tables and are used to interact with the database.
  - **Properties**: Contains project properties and settings files.
  - **Repository**: Contains repository classes responsible for database operations and data access logic.
  - **appsettings.json**: Configuration file for storing application settings such as database connection strings and other configurations.
  - **MyToolTrackerAPI.csproj**: The project file that defines the project structure and dependencies.
  - **Program.cs**: The entry point of the application where the hosting environment is configured and the application is started.
  - **Seed.cs**: Contains seed data used for populating the database with initial data during application startup.


## Usage
The MyToolTracker API exposes various endpoints to interact with the database. You can use these endpoints to perform CRUD operations on different entities.

## API Endpoints
### Entities with Full CRUD Operations
- **Employee**: `/api/Employees`
- **Company**: `/api/Companies`
- **Tool**: `/api/Tools`
- **Project**: `/api/Projects`
- **OrderRequest**: `/api/OrderRequests`
- **Category**: `/api/Categories`

### Entities with Read Operations Only
- **EmployeeType**: `/api/EmployeeTypes`
- **CompanyType**: `/api/CompanyTypes`
- **ToolStatus**: `/api/ToolStatuses`

For each entity, the API provides the following endpoints:
- `GET /api/{entity}`: Retrieves all entries for the specified entity.
- `GET /api/{entity}/{id}`: Retrieves a specific entry by its ID.
- `POST /api/{entity}`: Adds a new entry to the database.
- `PUT /api/{entity}/{id}`: Updates an existing entry in the database.
- `DELETE /api/{entity}/{id}`: Deletes an entry from the database.