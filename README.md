This repository compares three different task runner / bundler combinations:

- Gulp + Browserify
- Gulp + Webpack
- Webpack + npm scripts [Current Branch]

The repository consists of three different branches, each of which have near-identical code for a sample web app but differ in their task running and bundling approaches.

Each approach accomplishes the following:

- Linting
- Unit tests
- SASS bundled and minified into a single CSS file (with sourcemaps in dev)
- JS bundled, minified and transpiled from ES6 to ES5 (with sourcemaps in dev)
- Hot module reloading
- Hosting on an Express server

I originally wanted to use a framework agnostic approach for the front-end. However, I opted to use React since it actually simplifies some aspects of the project. For example, I only have to worry about a single index.html file, React-Router handles all the client-side routing, don't need to use something like Jade for templating, etc.

***

To run the setup:

```
npm install
npm start (or npm run build)
```

Once the bundling is complete, the app will automatically run in a new tab in your browser. Feel free to edit any JS or SCSS file in `app/components`, as this will trigger a new round of linting, unit tests, and hot reloading in the browser.