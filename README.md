# Pokedex App

This is a full-stack Pokedex application I built as part of an assignment. It allows users to view Pokémon data and filter them based on their type.

---

## What I implemented

* Part 1: Fetch and display a single Pokémon
* Part 2: Fetch and display multiple Pokémon
* Part 3: Filter Pokémon based on type (grass, fire, water)

---

## Tech Stack

* Next.js (App Router)
* TypeScript
* Prisma (SQLite)
* tRPC
* React Query

---

## How to run the project

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open in browser
   http://localhost:3000

---

## Routes

* `/part1` → Single Pokémon
* `/part2` → Multiple Pokémon
* `/part3` → Filterable Pokédex

---

## Notes

* I used Prisma with SQLite for simplicity
* Types are stored as a string and converted to array in the API layer
* Components are reusable for better structure

---

## Future improvements

* Better UI using Material UI
* Pagination support
* More Pokémon data

---

