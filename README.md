# Bike index app

A modern Angular 19+ application for exploring stolen bikes, it features a reactive state powered by Angular **signals**.

---

## Features

### Stolen bikes listing
- Fetches real data from the [bikeindex.org/ API v3](https://bikeindex.org/documentation/api_v3#!/search/GET_version_search_format_get_0)
- Displays bike reports in a clean, responsive UI
- Handles loading, empty states, and errors gracefully
- Fully responsive and dark/light scheme aware

### Fully Signal-Based Store
- Built with Angular's new `signal()` and `computed()` APIs
- No third-party state management libraries required
- Easy to test and extend

### Unit Tested
- All components and store are unit tested with **Jasmine**
- Mocks are used for API calls
- Tests cover state updates, event emission, and edge cases

---

## Tech Stack

- Angular 19+
- Angular Signals (`signal`, `computed`)
- RxJS for HTTP handling
- Jasmine & Karma for testing

---

## Folder Structure

```bash
src/ 
├── app/ 
│    ├── components/ # Reusable components
│    │     └── ui/ # generic UI components
│    ├── stores/ # State stores
│    ├── services/ # API and utility services
│    └── views/ # Top-level routed views
│         ├── home/ # /home routed view
│         ├── bike/ # /single bike routed view
│         └── page-not-found/ # catch all unregistered routes
├── styles/ # style helpers and utilities
└── utils/ # Helpers and test mocks
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```