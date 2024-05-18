# FarmOn Coding Challenge: Frontend

## How to Run

### Docker

1. Run: `docker compose --env-file .env.example up --build`
2. Try it at: `http://localhost:3000/`

### Without Docker

0. You need to have the FastAPI server running.
1. Navigate to the Next.js root folder: `cd frontend`
2. Create a .env file here. You can use the same variables in the .env.example file for testing. The NEXT_PUBLIC_API_URL might need to be changed depending on the FastAPI server's running environment.
3. Install the necessary dependencies:
   `yarn add nodejs`
   or
   `npm i`
4. Start the development server:
   `yarn dev`
   or
   `npm run dev`
5. Try it at: `http://localhost:3000/`

## Brief Explanation

This project consists of two main components based on libraries like [visx](https://github.com/airbnb/visx) and [react-map-gl](https://github.com/visgl/react-map-gl).

### Parcel History

- Each daily parcel data is visually represented by a vertical bar.
- These bars are grouped into segments, and customized based on their coverage and date.
- Coverage-based segments are divided into Bare, Rice, Grass, and Cover Crop, each represented with distinct colors and patterns.
- Date-based segments are divided into Year and Winter.
- The segments as layers are positioned in a way to match each other and their environment to illustrate the sequence and correlation on the timeline.
- The chart has a ParcelHistoryLegend extension. It defines the associations between colors, patterns, and data types.

### Parcel Map

- Utilizes Mapbox to show the map and draw the parcel geometry on it based on the coordinates. The map is customized by using a Maptiler dark theme.
- Shapes parcel geometry data into a FeatureCollection to comply with the Mapbox component's requirements.

### Extra

- By default, parcel ID 1 is displayed.
- Other parcels can be viewed by modifying the URL parameter parcel_id like here:
  `http://localhost:3000/?parcel_id={parcel_id}`

### Testing

- I used [Cypress](https://www.cypress.io/) for testing.
- You can find the test files in `frontend/cypress/e2e`

#### parcelHistory.cy.ts

- The tests ensure that the rendered

```html
<rect class="rect.visx-bar"></rect>
```

elements accurately reflect the expected count, colors, and patterns based on the different segment types calculated from the daily parcel data.

#### utils.cy.ts

- The tests validate the functionality of the daily parcel data grouping functions (year, coverage, winter). These functions define the segments that are subsequently rendered in the **parcelHistory.cy.ts** tests.

#### How to Run

0. Either with Docker or without, you need to have the frontend running at localhost:3000, and the FastAPI server too.
1. In the frontend project folder, run the Cypress tests with: `yarn cypress run` or `npm cypress run`
