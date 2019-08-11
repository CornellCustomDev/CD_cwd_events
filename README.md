# CD_cwd_events

[![Latest Stable Version](https://img.shields.io/packagist/v/cubear/cwd_events.svg?style=flat-square)](https://packagist.org/packages/cubear/cwd_events)

A light weight Drupal module to pull localist and render in a cwd_events block. With Eight options for built in views.

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

## Running the tests

@TODO

### Break down into end to end tests

@TODO

### And coding style tests

@TODO

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
      <div id='events-listing' class='events-listing' ></div>
        <script>
            var settings = {
              'target': 'events-listing',
              'depts':@depts,
              'entries':@entries,
              'format':'@format',
              'group':@group,
              'singleday':@singleday,
              'keyword':'@keyword',
              'addCal': true,
              'heading':''
            };
            if (CWD_LocalList){
              CWD_LocalList.run( settings );
            }else{
              console.warn('ERROR: can not find events build');
            }
         </script>
  </section>
```

## Built With

* [laravel mix](https://github.com/JeffreyWay/laravel-mix) - The babel and sass transpiller

## Versioning

For the versions available, see the [tags on this repository](https://github.com/CU-CommunityApps/CD_cwd_events/tags).

## Authors

* **Richard Marisa** - *Druapl Work* - [richmarisa](https://github.com/richmarisa)
* **Phil Williammee** - *Javascript Work* - [philwilliammee](https://github.com/philwilliammee)

See also the list of [contributors](https://github.com/CU-CommunityApps/CD_cwd_events/graphs/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License v2.0 - see the [LICENSE.md](https://github.com/CU-CommunityApps/CD_cwd_events/blob/master/LICENSE) file for details

## Acknowledgments

* Hat tip to Anthony M. Adinolfi for his work on localist event in Cornell Base theme.
