# AmuedTest-Hirushi

## Overview
This project demonstrates API automation testing using Playwright's built-in API testing capabilities. It includes tests for CRUD (Create, Read, Update, Delete) operations on a RESTful API.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [Playwright](https://playwright.dev/) installed as a dependency in your project

## Installation
1. Clone this repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Playwright browsers (if not already installed):
   ```sh
   npx playwright install
   ```

## Running Tests
Execute the tests using the following command:
```sh
npx playwright test
```

## Test Cases
The tests validate the following API functionalities:

1. **Get all objects**: Retrieves all objects from the API and verifies the response structure and status.
2. **Create an object**: Posts a new object to the API and checks that the object is created successfully.
3. **Retrieve the created object**: Fetches the newly created object and verifies its attributes.
4. **Update the object**: Modifies an existing object and ensures the changes are applied correctly.
5. **Delete the object**: Deletes the created object and confirms that it no longer exists.

## API Endpoints Used
- `GET /objects` - Fetches all available objects.
- `POST /objects` - Creates a new object.
- `GET /objects/{id}` - Retrieves a specific object by ID.
- `PUT /objects/{id}` - Updates an existing object.
- `DELETE /objects/{id}` - Deletes an object by ID.

## Expected Objects
The tests use predefined objects to validate responses:
- **Expected First Object**: Google Pixel 6 Pro with specific attributes.
- **New Object**: Apple MacBook Air M2.
- **Updated Object**: Apple MacBook Air M3.

## Logging
The script includes logging of API responses to assist in debugging and verifying test outcomes.

## License
This project is open-source and available for use and modification.

## Author
Maintained by Hirushi de Silva.


