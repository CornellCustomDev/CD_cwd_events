# CD_cwd_events

[![Latest Stable Version](https://img.shields.io/packagist/v/cubear/cwd_events.svg?style=flat-square)](https://packagist.org/packages/cubear/cwd_events) ![Build passing](https://img.shields.io/badge/build-passing-brightgreen "All tests passed") ![Code Coverage](https://img.shields.io/badge/coverage-85%25-yellowgreen "Test cover 85% of code")

A light weight Drupal module to pull localist and render in a cwd_events block. With Eight options for built in views.

## [Interactive Demo Page](https://cu-communityapps.github.io/CD_cwd_events/dev/demo.html) | [Demo Page](https://cu-communityapps.github.io/CD_cwd_events/dev/index.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This module is made for use with a Drupal websites.

### Installing

with composer

```bash
composer require cubear/cwd_events
```

or download directly from [Github Repo](https://github.com/CU-CommunityApps/CD_cwd_events).

```bash
cd modules/custom && git clone https://github.com/CU-CommunityApps/CD_cwd_events
```

## Running the tests

start a local server in the /dev folder using http-server

```bash
npm install -global http-server
```

then run

```bash
npm test
```

@todo impliment browser testing

### Break down into end to end tests

NPM will test for the following cases.

```bash
cd events application unit tests
    Server status
      √ should return 200
    localist-api-connector
      √ should return an array of four events. {events: [{event: Objects}...]}.
    #buildEvent()
      √ should return an object with properties.
    #locaList()
      √ it should fetch localist event data.
      √ it should have a innerTemplate function.
      √ it should also have a outerTemplate function.
      #innerTemplate()
        √ it should return a valid inner html string
      #outerTemplate()
        √ it should return a valid outer html string
        √ it should also contain the inner html sub-string
```

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
            class="events-listing cwd-events-style"
            data-depts="0"
            data-entries="5"
            data-format="modern_standard"
            data-group="0"
            data-keyword=""
            data-heading=""
        ></div>
  </section>
```

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
