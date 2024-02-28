# White Canvas - Challenge Rettore Mattes Marco A.

## Deploy instructions

This appplication is auto deployable on Vercel with every push made into main branch,

## How to RUN the proyect (development):

- Clone repository
- Copy .env.exmaple into .env
- Fill VITE_API_LOCATION_KEY variable in the .env with your personal key generated on: https://openweathermap.org/api (you must create an account)
- run: npm install
- run: npm run dev

pd: please use develop branch or create other branch while adding features/improvements/bug fixes

## How to BUILD the proyect:

- run: npm run build (with typescript verification)
- compiled project is stored on /dist folder

## Adiotional features:

- Request user Localization and set the weather automatically
- Preview next 5/10/15 days weather
- Navigation with keyboard/tab
- Change application layout base on current weather condition of the location selected
