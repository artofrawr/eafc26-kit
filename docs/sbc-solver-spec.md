# SBC Solver Specification

## Overview

The SBC (Squad Building Challenge) Solver uses Google OR-Tools to solve constraint programming problems for EA FC 26 Ultimate Team challenges.

## Algorithm

### Problem Definition

Given:
- Challenge requirements (rating, chemistry, league, nation, club, positions)
- Available players with attributes (rating, position, price, chemistry links)
- Budget constraints

Find:
- A valid squad that satisfies all requirements
- Optionally: minimize cost or maximize rating

### Constraint Programming Model

#### Variables
- `player[i][j]`: Boolean variable indicating if player `i` is in position `j`
- `total_rating`: Integer variable for squad rating
- `total_chemistry`: Integer variable for squad chemistry
- `total_cost`: Integer variable for squad cost

#### Constraints
1. **Position Constraints**: Each position must have exactly one player
2. **Rating Constraints**: Squad rating must meet min/max requirements
3. **Chemistry Constraints**: Squad chemistry must meet minimum requirement
4. **League/Nation/Club Constraints**: If specified, players must match
5. **Budget Constraint**: Total cost must not exceed budget (if specified)

#### Objectives
- Minimize cost (primary)
- Maximize rating (secondary, if cost is equal)

## API Endpoints

### Solve Challenge

```
POST /solve
```

**Request Body:**
```json
{
  "requirements": {
    "minRating": 80,
    "maxRating": 85,
    "chemistry": 33,
    "league": "Premier League",
    "nation": null,
    "club": null,
    "positions": [
      {"position": "GK", "rating": null},
      {"position": "CB", "rating": 82},
      {"position": "CB", "rating": 82},
      {"position": "LB", "rating": null},
      {"position": "RB", "rating": null},
      {"position": "CM", "rating": null},
      {"position": "CM", "rating": null},
      {"position": "CM", "rating": null},
      {"position": "LW", "rating": null},
      {"position": "ST", "rating": 85},
      {"position": "RW", "rating": null}
    ]
  },
  "players": [
    {
      "id": "player1",
      "name": "Player Name",
      "position": "ST",
      "rating": 85,
      "price": 10000,
      "league": "Premier League",
      "nation": "England",
      "club": "Arsenal"
    }
  ],
  "budget": 50000
}
```

**Response:**
```json
{
  "status": "solved",
  "solution": {
    "players": [
      {"id": "player1", "position": "GK"},
      {"id": "player2", "position": "CB"},
      ...
    ],
    "rating": 82,
    "chemistry": 33,
    "cost": 45000
  }
}
```

## Implementation Notes

- Use CP-SAT solver from OR-Tools
- Implement efficient constraint modeling
- Handle timeout scenarios gracefully
- Return multiple solutions if possible
- Validate input requirements

## Future Enhancements

- Support for multiple formations
- Chemistry link optimization
- Player price prediction
- Historical solution caching

