# Testing

## Parsing Tests

For Google and Meta parsing, tests are under insta_export.py and google_export.py to test the functionality without external interference. Both tests are run manually inside a python virtual environment. These tests cover 95%+ branch coverage, testing exceptions and potential errors.

## Frontend Testing

For frontend testing, we used Vite’s dev server (npm run dev) to constantly preview changes as we built the site. Instead of writing automated tests, we relied on the present with hands-on testing making small code changes, checking how the UI reacted, and fixing anything that looked off. This lets us quickly spot issues like layout bugs, animation problems, missing imports, and broken components. White screens and error messages were debugged through the descriptive nature of Vite’s developer server, this allowed us to pinpoint things like incorrect import statements, typos, and other code issues that would cause the website to break. Overall, our testing approach was very iterative. We tried something, checked the result, and made tweaks until everything behaved correctly.
