# VesselsMaps

## Installation
Run `yarn install` for install dependencies
## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## TASK

The goal of the challenge is to create a SPA to visualise exported sea routes on the map.
Sea routes are available here:
https://s3-eu-west-1.amazonaws.com/logindex-dev-export/challenge/web_challenge.csv

It is a CSV file with following columns:
route_id - some arbitrary route id
from_port - route origin
to_port - route destination
leg_duration - trip duration in milliseconds
points - an array of vessel observations from GPS where observation is [longitude, latitude, timestamp in epoch milliseconds, actual vessel speed in knots]

Requirements:
1. There should be a route picker component that allows to select a route to be shown on the map
2. Map that shows selected route
3. There should be a graph component that shows how speed changes in time for selected route

Bonus requirement would be to "color" the line on the map according to vessels speed, ie. close to the port, it should be slow eg. red and open sea where the vessel is faster should be green

You can do it either in React or Angular 2+, no preferences here.
Results please push to a github repo where we can access it.