# Game state labs assignment

Architecture: Built a component based architecture using ReactJS, modularized code by splitting the code into small maintainable components and functions

### Folder structure

- components - Created reusable and other small components inside this folder
- constants - created all constants used across the application.
- data - static data is stored here and exported
- hooks - created reusable hooks with react query here and - imported in the components where it is required and used.
- mocks - this folder have all mock service worker items to create local backend
- pages - this folder is created to hold all major pages, currently have single page, if there are multiple we can import pages from here and use routing for navigation between pages
- services - this folder created to hold api calls, created api calls here and imported in the components/hooks where it is needed.
- types - this folder is created to hold all types used in the components, apis, functions.
- utils - this folder is created hold all util functions, which can be reused in multiple components or functions

### State management and Data fetching

- Since the application have single page and didn’t find and state need to be shared across different component tree, used ‘useState’ and managed all states.
- For server state, used Tanstack query which have caching inbuilt and reduce api call if api call is triggered before stale time is expired.

### Library choices

- React - as mentioned in the assignment to use React, used React with typescript
- Recharts - For chart usecase, used recharts as the learning curve is small and most used chart library
- TailwindCSS - Since I wanted to implement the features as soon as possible, tailwind really helps to fast track the development process, so I chose it.
- Tanstack query - Major reason to select is because of features it provides, caching, refetch functionality, api call status and no need to do manual setup for loading, error etc
- React-date-range - This one selected as I used once before, don’t wanted to mess up with new library in short time so chose it

### Tradeoff

- Built major functionalities as the deliverables and chose libraries like date-range, tailwindcss for required functionalities and to finish the tasks faster
- Avoided routing, as currently it have single page
  Used usestates for localstates and react query for server state instead of Redux

### Improvements

- Polish the UI and make it responsive till mobile devices
- Divide the components more structurally, now some of them are not more structured.
- Customizing chart library usage.
- Would have replaced the date library with a better one, since it is now in unmaintained state.
