# FarmOn Coding Challenge: Frontend

## How to Run

### Docker

1. Run: `docker compose --env-file .env.example up --build`
2. Try it at: `http://localhost:3000/`

### Without Docker

0. You need to have the FastAPI server running.
1. Navigate to the Next.js root folder: `cd frontend`.
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
- The segments as layers are positioned in a way to match each other and their environment to visually represent a sequence and correlation.
- The chart has a ParcelHistoryLegend extension. It defines the associations between colors, patterns, and data types.

### Parcel Map

- Utilizes Mapbox to show the map and draw the parcel geometry on it based on the coordinates. The map is customized by using a Maptiler dark theme.
- Shapes parcel geometry data into a FeatureCollection to comply with the Mapbox component's requirements.

### Extra

- By default, parcel ID 1 is displayed.
- Other parcels can be viewed by modifying the URL parameter parcel_id like here:
  `http://localhost:3000/?parcel_id={parcel_id}`
