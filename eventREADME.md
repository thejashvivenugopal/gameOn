## Assignmnet 9 - REST API FOR THE PROJECT


## REST API FOR EVENT CLASS
This REST API for Event Class helps to manage events by allowing you to add, view, update, or delete event details. Each event has its own unique ID, type, start and end times, hourly cost, and is linked to an owner, location, and some common fields. The API makes it easy to organize events, schedule them, and calculate costs.

## Project Structure

The project includes the following files:

- `event-controller.js`: This controller handles CRUD operations for events, allowing you to create, retrieve, update, and delete events.
- `event.js`: This schema defines an Event model with details like type, timing, hourly rate, owner, location, and other common fields for storing in a MongoDB database.
- `event-route.js`: This router defines endpoints for creating, retrieving, updating, and deleting events, with routes to handle event operations based on the event ID.
- `index.js`: This function sets up the application routes, registering the /events endpoint to handle event-related operations.
- `event-service.js`:This service provides database operations to save, retrieve, update, and delete events using the Event model in MongoDB.
- `app.js`:This function initializes the application by setting up CORS, JSON parsing, MongoDB connection, and registering routes.
- `server.js`:This file loads settings from environment files, sets up the Express app, prepares the services, and starts the server on the given port.


## Key Fields of the Event Class
- eventHashId: A unique ID for each event.
- eventType: The category of the event.
- eventStartTime & eventEndTime: When the event starts and ends.
- amountPerHour: Cost per hour for the event.
- owner: Details about who owns the event.
- location: Where the event takes place.
- commonFields: Extra shared details for events.


## Technologies Used
- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB

