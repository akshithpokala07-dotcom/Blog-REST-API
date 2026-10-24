# Blog REST API with CRUD Operations

A RESTful Blog API built using **Node.js** and **Express.js** that allows users to create, retrieve, update, and delete blog posts. The application uses JSON file storage to persist data between server restarts.

## Features

- Create new blog posts.
- Retrieve all blog posts.
- Retrieve an individual blog post using its ID.
- Update existing blog posts.
- Delete blog posts by ID.
- Validate required fields and reject invalid input.
- Return appropriate HTTP status codes and JSON responses.
- Handle nonexistent routes and posts.
- Persist blog posts using a local JSON file.
- Organize code into routes, controllers, and middleware.

## Technologies Used

- Node.js
- Express.js
- JavaScript (ES Modules)
- JSON file storage
- Nodemon
- Postman for API testing

## Project Structure

```text
minor-project-06/
├── controllers/
│   └── postController.js
├── data/
│   └── posts.json
├── middleware/
│   └── errorHandler.js
├── routes/
│   └── postRoutes.js
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

Install Node.js and npm on your computer.

### 1. Clone the repository

Replace `YOUR_GITHUB_USERNAME` with your GitHub username and `YOUR_REPOSITORY_NAME` with your repository name.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
```

### 2. Navigate to the project directory

```bash
cd YOUR_REPOSITORY_NAME
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The API runs at:

`http://localhost:5000`

To start the server without Nodemon, use:

```bash
npm start
```

## API Endpoints

All endpoints return JSON responses.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Display API information |
| POST | `/posts` | Create a new blog post |
| GET | `/posts` | Retrieve all blog posts |
| GET | `/posts/:id` | Retrieve a blog post by ID |
| PUT | `/posts/:id` | Update an existing blog post |
| DELETE | `/posts/:id` | Delete a blog post by ID |

### 1. Create a Blog Post

**Request**

`POST /posts`

Content-Type: `application/json`

Example request body:

```json
{
  "title": "Introduction to Web Development",
  "content": "Web development involves building websites and web applications.",
  "author": "Akshith",
  "category": "Technology"
}
```

The API generates a unique ID and creation timestamp automatically.

**Success response:** `201 Created`

### 2. Retrieve All Blog Posts

**Request**

`GET /posts`

**Success response:** `200 OK`

Returns the total number of posts and an array containing the blog posts.

### 3. Retrieve a Single Blog Post

**Request**

`GET /posts/:id`

Replace `:id` with the ID of an existing blog post.

**Success response:** `200 OK`

If the post does not exist, the API returns `404 Not Found`.

### 4. Update a Blog Post

**Request**

`PUT /posts/:id`

Example request body:

```json
{
  "title": "Updated Web Development Guide",
  "category": "Web Development"
}
```

Only the supplied fields are updated. The existing ID, creation timestamp, and other unchanged fields are preserved.

**Success response:** `200 OK`

Invalid fields or empty values return `400 Bad Request`. A nonexistent post returns `404 Not Found`.

### 5. Delete a Blog Post

**Request**

`DELETE /posts/:id`

Replace `:id` with the ID of the post to delete.

**Success response:** `200 OK`

If the post does not exist, the API returns `404 Not Found`.

## HTTP Status Codes

| Status code | Meaning |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | Blog post created successfully |
| `400 Bad Request` | Request contains invalid input |
| `404 Not Found` | Requested post or route does not exist |
| `500 Internal Server Error` | Unexpected server-side error |

## Data Storage

Blog posts are stored in `data/posts.json`.

Each post contains:

- `id` — unique identifier
- `title` — post title
- `content` — main blog content
- `author` — author's name
- `category` — post category
- `createdAt` — creation timestamp in ISO 8601 format

The application reads from and writes to the JSON file, allowing created posts to remain available after the server restarts.

**Note:** This project uses local JSON file storage rather than a database. MongoDB integration is a potential future enhancement.

## API Testing with Postman

Test the API using Postman.

1. Start the server using `npm run dev`.
2. Send a `POST` request to create a blog post.
3. Send a `GET` request to retrieve all posts.
4. Send a `GET` request using a valid post ID.
5. Send a `PUT` request to update the post.
6. Send a `DELETE` request to delete the post.
7. Verify that requests for nonexistent IDs return `404 Not Found`.
8. Send an empty JSON object to the create endpoint and verify that it returns `400 Bad Request`.
9. Restart the server and retrieve the posts again to verify data persistence.

Use `http://localhost:5000` as the base URL for all requests.

## Error Handling and Validation

The application validates required fields when creating posts and validates update fields before modifying existing posts.

It also provides meaningful JSON error responses for invalid requests, nonexistent posts, unknown routes, and unexpected server errors.

## Future Improvements

- Integrate MongoDB for database-backed storage.
- Add user authentication using JWT.
- Implement pagination, searching, and filtering.
- Document endpoints using Swagger.
- Deploy the API using Render or Railway.

## Author

**Akshith**

## License

This project was created for educational purposes as part of the Web Development Week 06 Minor Project.
