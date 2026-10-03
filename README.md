# 🗃️ Recipe Keeper

Built with React. Deployed via Cloudflare Pages Functions, Cloudflare D1, and Cloudflare Access.

## Overview 👩🏻‍💻

#### Problem Statement
Cooking is a big part of my life. I have a lot of online recipes bookmarked, but I often wish I could:
1. Search them by ingredient
1. View them without ads or reading a long personal journey

#### Product Vision
- The Recipe Keeper app allows any use to search the recipe collection by ingredient and view recipes. Authorized users can save and modify recipes.

#### MVP Use Cases
- All usres can view recipes in-app and link out to the original recipe, if applicable.
- All users can search the recipe collection by ingredient(s).
- Authorized users can manually save and delete recipes.
- Authorized users can import online recipes that utilize the standard Recipe Schema and have the recipe name, URL, ingredients, and instructions automatically parsed and saved by the app.

## Road Map 🗺️
* [X] Add functionality to parse recipes that utilize the standard Recipe Schema.
* [X] Add functionality to search by ingredient across all saved recipes.
* [X] Move to Cloudflare Pages, Functions, and D1, with Cloudflare Access gating edits (replaces the original MongoDB/Express/password login version).
* [ ] Make the app fully responsive for mobile devices.
* [ ] Add functionality so that the user can edit a recipe within the app.

## Run locally 🛠️

One time setup: 

```bash
npm install
echo 'ENVIRONMENT=development' > .dev.vars        # skips the Access check locally
npm wrangler d1 execute recipe-keeper --local --file=./schema.sql # initializes the local db
```

Routine local development:

Terminal 1:
```bash
npm run dev
```

Terminal 2: 
```bash
npm run api
```
Then open http://localhost:8788.

Run the Function tests with `npm test`.

## Acknowledgements ✨
- The first iteration of the app was developed with the help of the [Net Ninja MERN Stack Tutorial](https://github.com/iamshaunjp/MERN-Stack-Tutorial).
- The second iteration was migrated to using Cloudflare Pages, Functions, and D1, with Cloudflare Access gating edits with the help of Claude Code.
