# webapp-exercises
## Getting started

Make sure you have [Docker](https://www.docker.com/products/docker-desktop) installed.

### Start the app

```bash
docker compose up
```

This will start:
- **API** (Node.js) — available at http://localhost:8081
- **MongoDB** — available on port 27017

### Stop the app

```bash
docker compose down
```

## React app

The goal is to get React exercises to showcase some difficulties that might be encountered during some functional developments.

### Routes

#### /portolios

Building a small interface that displays a portfolio of financial assets.

Functionalities

✔ load positions from the API
✔ fetch the market prices
✔ automatically recalculate PnL
✔ button to modify a quantity
✔ button to modify a position

Prices are refreshed every 5 seconds.

#### /orders

Developing an interface to display the order book for financial assets

An order book contains two lists :

bids → buy orders
asks → sale orders

The UI must remain fluid even with :

100 updates / second

The exercise allows to be careful with :

massive re-renders
mutation state
useless sorting
useless calculation

#### /tasks

Build a small task management app with :

columns (Todo / In Progress / Done)
drag & drop
backend persistance

It tests :

complex state management
React performance
indirect DOM manipulation
UI / API synchronisation

#### /metrics

WIP
