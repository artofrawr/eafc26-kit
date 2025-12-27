# API Specification

## Base URL

- Development: `http://localhost:3001`

## Endpoints

### Health Check

```
GET /health
```

Returns API health status.

**Response:**

```json
{
  "status": "ok"
}
```

### SBC Challenges

#### Get All Challenges

```
GET /sbc/challenges
```

**Response:**

```json
[
  {
    "id": "string",
    "challengeId": "string",
    "name": "string",
    "requirements": {},
    "status": "pending" | "solving" | "solved" | "failed",
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
  }
]
```

#### Get Challenge by ID

```
GET /sbc/challenges/:id
```

#### Create Challenge

```
POST /sbc/challenges
```

**Request Body:**

```json
{
  "challengeId": "string",
  "name": "string",
  "requirements": {}
}
```

#### Solve Challenge

```
POST /sbc/challenges/:id/solve
```

Initiates solving process for a challenge.

**Response:**

```json
{
  "status": "solving",
  "challengeId": "string"
}
```

### SBC Solutions

#### Get Solutions for Challenge

```
GET /sbc/challenges/:id/solutions
```

**Response:**

```json
[
  {
    "id": "string",
    "challengeId": "string",
    "players": [],
    "cost": 0,
    "rating": 0,
    "isValid": true,
    "createdAt": "ISO8601"
  }
]
```

### EA FC Companion App

#### Extract Challenge from Companion App

```
POST /ea-fc/extract-challenge
```

**Request Body:**

```json
{
  "challengeId": "string"
}
```

**Response:**

```json
{
  "challenge": {
    "id": "string",
    "name": "string",
    "requirements": {}
  }
}
```

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error
