# CD_cwd_events

rename your branch to main

```sh
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
```

[![Latest Stable Version](https://img.shields.io/packagist/v/cubear/cwd_events.svg?style=flat-square)](https://packagist.org/packages/cubear/cwd_events) ![Build passing](https://img.shields.io/badge/build-passing-brightgreen "All tests passed") ![Code Coverage](https://img.shields.io/badge/coverage-85%25-yellowgreen "Test cover 83% of code")

A light weight Drupal module to pull localist and render in a cwd_events block. With six options for built in views.

## [Interactive Demo Page](https://cu-communityapps.github.io/CD_cwd_events/src/app/index.html) (Deprecated)
## [Component Demo Page](https://philwilliammee.github.io/react-localist-viewer/?path=/story/react-localist-viewer-localist-app--calendar)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This module is made for use with a Drupal websites. Development requires Node and NPM.

### Installing

with composer

```bash
composer require cubear/cwd_events
```

or download directly from [Github Repo](https://github.com/CU-CommunityApps/CD_cwd_events).

```bash
cd modules/custom && git clone https://github.com/CU-CommunityApps/CD_cwd_events
```

Development to compile sass and javascript.

```bash
cd ./src/app
npm install
npm run watch
```

## Running the tests

start a local server in the /dev folder using http-server

```bash
npm install -global http-server
```

then run

```bash
npm run test
```

check for test coverage:

```bash
npm run coverage
```

view browser tests
[Demo Page](https://cu-communityapps.github.io/CD_cwd_events/dev/test.html)

### Break down into end to end tests

Test are loocated in the dev/test folder and test for:

- localist main function
- localist connector
- all templates
- all helper functions

    button click events are not currently tested and must be done manually using the demo page.

### And coding style tests

This module follows drupal code standards for phpcs and linting.

- see the `.eslintrc.json` file for linting details.
- see  [squizlabs/PHP_CodeSniffer](https://www.drupal.org/docs/8/modules/code-review-module/installing-coder-sniffer) for more details.

production builds `npm prod` require all linting tests to pass before the build can finish with success.

## Deployment

enable the module with drush

```bash
drush en cwd_events
```

add a Events block and configure block settings.

This is an example of the block output:

```HTML
  <section>
      <h2>Block Name</h2>
      <a class="cwd_events_readmore" href="/events">Read More</a>
        <div
            id="events-listing-UUID"
            class="drupal-events-listing cwd-events-style"
            data-target="standard"
            data-depts="0"
            data-entries="4"
            data-format="standard"
            data-group="0"
            data-keyword="Sustainability"
            data-heading="Test"
            data-calendarurl= "../test/testData.json"
            data-apikey= 'KLhy2GtuSAGirYGY'
            data-filterby= 'group'
            data-addcal= "true"
            data-pagination="true"
        ></div>
  </section>
```

## To use the Drupal API enable install and enable the Drupal Graphql Modules

```bash
drush en graphql
drush en graphql_core
```

Set the Graphql permissions for anonymous users.

- [x] Bypass field security (optional)

- [x] Execute arbitrary GraphQL requests

- [x] Execute persisted GraphQL requests

## More about the Localist API

The localist api docs https://developer.localist.com/doc/api#usage

### API query Filters

READ the API DOCS! In many cases just play around with the demo, until you get the results you need.

The module builds a query that is made to to the localist api

The localist api returns results with the three parameters Anded together:

Departments are (OR)
keywords (AND)
Group_id (integer)

Currently the Drupal module does not support multiple keywords. The API does support multiple keywords but they would be ORed together and in most cases the resulting query is very small. If you have a project that requires multiple keywords put in a issue for it.

## Built With

- [laravel mix](https://github.com/JeffreyWay/laravel-mix) - The babel and sass transpiller

## Versioning

For the versions available, see the [tags on this repository](https://github.com/CU-CommunityApps/CD_cwd_events/tags).

## Authors

- **Richard Marisa** - *Druapl Work* - [richmarisa](https://github.com/richmarisa)
- **Phil Williammee** - *Javascript Work* - [philwilliammee](https://github.com/philwilliammee)

See also the list of [contributors](https://github.com/CU-CommunityApps/CD_cwd_events/graphs/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License v2.0 - see the [LICENSE.md](https://github.com/CU-CommunityApps/CD_cwd_events/blob/master/LICENSE) file for details

## Acknowledgments

- Hat tip to Anthony M. Adinolfi for his work on localist event in Cornell Base theme.

## Sites using this plugin.
