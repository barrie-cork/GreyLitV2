# API Documentation

## Overview
The Grey Literature Search Engine exposes RESTful APIs through an API Gateway, with each microservice providing specific functionality.

## Authentication

### POST /auth/login
Login with email and password.

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt.token.here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

## Search Configuration

### POST /search/config
Create new search configuration.

Request:
```json
{
  "population": "adults",
  "interest": "diabetes type 2",
  "context": "primary care"
}
```

Response:
```json
{
  "searchId": "search_id",
  "status": "configured"
}
```

## Results

### GET /search/{searchId}/results
Get search results.

Response:
```json
{
  "searchId": "search_id",
  "results": [
    {
      "url": "https://example.com/guideline",
      "title": "Guideline Title",
      "snippet": "Relevant text..."
    }
  ]
}
```

## Error Responses
All endpoints may return these errors:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

Common error codes:
- `AUTH_REQUIRED`: Authentication required
- `INVALID_INPUT`: Invalid request data
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
