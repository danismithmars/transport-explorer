import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY; 
const BASE_URL = "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1"; 


export const fetchVehiclePositions = async () => {
  const query = `{
      routes {
        gtfsId
        longName
        mode
      }
    }`;


  const response = await axios.post(BASE_URL, { query }, {
    headers: {
      "Content-Type": "application/json",
      "digitransit-subscription-key": API_KEY,
    },
  });


  return response.data.data.routes;
};

export const fetchStops = async () => {
  const query = `
  {
    stops {
      gtfsId
      name
      lat
      lon
      code
      vehicleMode
      zoneId
      patterns {
        code
        directionId
        headsign
        route {
          gtfsId
          shortName
          longName
          mode
        }
      }
    }
  }
`;

  const response = await axios.post(BASE_URL, { query }, {
    headers: {
      "Content-Type": "application/json",
      "digitransit-subscription-key": API_KEY, 
    }
  });

  return response.data.data.stops;
};

export const fetchRoutePlan = async (from: string, to: string) => {
  const query = `{
      plan(
        from: { lat: ${from.split(",")[0]}, lon: ${from.split(",")[1]} },
        to: { lat: ${to.split(",")[0]}, lon: ${to.split(",")[1]} }
      ) {
        itineraries {
          legs {
            mode
            from {
              name
              lat
              lon
            }
            to {
              name
              lat
              lon
            }
            startTime
            endTime
            duration
            distance
            legGeometry {
              points
            }
          }
        }
      }
    }`;

  const response = await axios.post(BASE_URL, { query }, {
    headers: {
      "Content-Type": "application/json",
      "digitransit-subscription-key": API_KEY,
    },
  });

  return response.data.data.plan.itineraries;
};

export const fetchAlerts = async () => {
  const query = `{
      alerts {
        id
        alertHeaderText
        alertDescriptionText
      }
    }`;

  const response = await axios.post(BASE_URL, { query }, {
    headers: {
      "Content-Type": "application/json",
      "digitransit-subscription-key": API_KEY,
    },
  });

  return response.data.data.alerts;
};
