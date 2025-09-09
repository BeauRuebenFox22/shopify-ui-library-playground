# Shopify Skeleton theme

Herd skeleton theme for Shopify 2.0 stores.


## Requirements

You will need the following software before starting development:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)


## Getting started

- Clone/download the repo
- Run `npm install` to install the projects dependencies
- That's it! You're good to go. See the "[Commands](#commands)" section.


## Commands

| Command | Description
|---|-
| `npm run login` | This will run the Shopify login command, the store name must be updated in the package.json script.
| `npm run serve` | This will run the Shopify theme serve command.
| `npm start` | View the commands you can run.
| `npm run start:win` | Windows Specific: Watch source files for changes, re-compile them as necessary and upload to your Shopify development theme. Also opens shopify in a tab and starts Shopify CLI to sync files.
| `npm run start:mac` | Macintosh Specific: Watch source files for changes, re-compile them as necessary and upload to your Shopify development theme. Also opens shopify in a tab and starts Shopify CLI to sync files.
| `npm run build:dev` | Builds the theme assets (CSS, JS, SVG), this is the default gulp task
| `npm run build:prod` | Builds an optimised version of the theme assets. This includes a purge of the CSS.
| `npm run watch` | Watch source files for changes and re-compile them as necessary.
| `npm run check` | This will run the Shopify theme check command
| `npm run deploy` | This will run the Shopify theme push command


## Shopify CLI commands

| Command | Description
|---|-
| `shopify theme push --unpublished` | You will be prompted to name your theme and then it will push your theme to the store.
| `shopify theme push` | The CLI will show you a list of available themes to push your theme to.


## Shopify Theme check commands

| Command | Description
|---|-
| `shopify theme check -a` | Shopify theme check will auto-correct any issues it finds in the theme code.

## Help

- [Shopify Cli](https://shopify.dev/themes/tools/cli#getting-started)
-


### Setting up your Shopify development environment

Only follow these steps if you are developing on a new development store.
- Log in to the development store
- Click on 'Settings' in the bottom left corner
- On the next page, click on 'Users and Permissions'
- Click on 'Add staff' and then add your details (name and email) and click 'Save'.

You will then get an email to active your staff account.

*Having a user account on a development store is required until the store is transferred to the client.*


## Contributors

[Mark Claxton](mark.claxton@herd.io) and [Tim Powell](tim.powell@herd.io)