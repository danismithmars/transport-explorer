# HSL Transport Dashboard

This project is a transportation dashboard designed to display routes, delays, and stops using data from the Helsinki public transportation API. It provides a visual representation of active vehicles (buses, trains, trams), route details, and delay information.

## Features:
- **Route Visualization**: Displays routes and stops on a map using **React** and **Leaflet**.
- **Real-time Data**: Fetches live data on transport delays and vehicles, displaying real-time updates.
- **Search Functionality**: Allows users to search for stops or routes and view relevant information.
- **User-friendly UI**: Designed with a smart, clean, modern interface using module scss.

## Deployment:

- **Vercel**: The frontend is deployed on **Vercel** for seamless automatic deployment with every push to the `main` branch.
- **GitHub Integration**: The repository is connected to Vercel for continuous deployment. Vercel handles builds, hosting, and optimizations out of the box.

### CI/CD Pipeline:
- **GitHub Actions**: The CI/CD pipeline is set up with **GitHub Actions** to automate the following steps:
  1. **Install Dependencies**: Run `npm install` to set up the project.
  2. **Run Tests**: All unit and integration tests are executed to ensure everything works as expected.
  3. **Build the Project**: The application is built for production using `npm run build`.
  4. **Deploy**: The frontend is deployed to **Vercel** after a successful test pass.

#### GitHub Actions Workflow:
The `.github/workflows/deploy.yml` file configures the CI/CD pipeline to:
- Check out the code
- Install dependencies
- Run tests
- Build the project
- Deploy the project to Vercel

Here's a snippet of the `deploy.yml` configuration for automated deployment:

```yaml
name: CI Workflow

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build the project
        run: npm run build

      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## How to Run Locally:

  1. **Clone the repository**: `git clone https://github.com/your-username/hsl-transport-dashboard.git`
  2. **Navigate to the Project Directory:**: `cd hsl-transport-dashboard`
  3. **Install Dependences**: `npm install --legacy-peer-deps` faced the npm version compatibility issue while installing testing libraries. 
  4. **Run the Project Locally:**: `npm run dev` The project will be running on http://localhost:5173.

## Challenges Faced:

**Integrating with APIs:** Fetching and managing data from the Helsinki public transportation API was tricky, as some data endpoints were not fully documented, and old versions deperecated, requiring extra debugging and research.
 For example: when fetching the lat and lon data for marking the location on the map it returns the points data for google map api, so I decieded to use the `polyline` module first. But faced the npm version compatibility issue so switched to add query for lat and lon of stops data. Finally solved. 

**Version compatibility issue:** When I am working with the react testing library, I used the latest version of react - 19, and it has lots of version compatibility issues, particularly testing library dependencies. So I needed to decide two of these options: 1. Downgrade React version 2. install using --legacy-peer-deps. 

I chose `npm install --legacy-peer-deps` since it allowed me to bypass the version compatibility issues that arose when trying to work with React 19 and the testing library dependencies. By using this option, I avoided the need to downgrade React, which could potentially break other parts of the application that depend on the latest React features or optimizations. This decision was made based on the fact that downgrading React would require more extensive changes across the entire application to ensure compatibility, whereas --legacy-peer-deps allows for a more immediate solution to continue development. Additionally, this approach provided flexibility in keeping the rest of the project’s dependencies up-to-date while still addressing the immediate dependency issues with the testing library.


**References while developing (mainly testing)**
https://github.com/testing-library/jest-dom/issues/546
https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany


**Potential Improvements:**

- Dark/Light mode for better UX
- Offline Mode (currently I developed just only the offline mode hook but in the future I can use this hook and make current app offline mode)
- Other Data visualization and add more functionalities. (Real time analytics chart, etc)
  Now, I just fetch stops, alerts, routes, vechiles apis but in the future I can update it using Chart libraries like recharts, apexchart etc to visualize the statistical data for bus, train, trams. 
- I18n: Regarding this is the Helsinki specific api, we can use i18n for internationalization of page's lanugage switch. 
- Map improvement: current Map functionalities are limited but I can improve this more user friendly. (various symbols, routing, 3D map, etc)
- Update the design amazing combining dynamic transitions and animations. 
- Performance Optimization: The larger the project scale is, it is the most important to optimise app performance, so need to use various kind of optimization methods like callback, memo, lazyloading, debouncing, code quality & refactor etc. 


**Dear Hiring Team**, above is overall my approach, challenge, potential improvement with desire to join Corsearch to deveote my ability, skills, and experience. 
Please feel free to give me feedback for the project, approach etc. 

Waiting for your reply. 
Thanks. 
