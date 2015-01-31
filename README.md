# Snapkite

Snapkite gives you filtered stream of mobile photos posted publicly on Twitter.

Works together with:
* [Snapkite Filters](https://github.com/fedosejev/snapkite-filters.git)
* [Snapkite API Server](https://github.com/fedosejev/snapkite-api-server.git)

## Dependencies

* MongoDB
* [Snapkite Filters](https://github.com/fedosejev/snapkite-filters.git)

## Install

1. `git clone https://github.com/fedosejev/snapkite.git`
2. `cd snapkite`
3. `npm install`
4. `cp example.config.json config.json`
5. Add your Twitter API keys to `config.json`
6. Change default MongoDB config in `config.json` as needed
7. Clone filters: `git clone https://github.com/fedosejev/snapkite-filters.git`
8. Copy sample config and change list of adult keywords as needed: `cp snapkite-filters/is-adult-content/example.config.json snapkite-filters/is-adult-content/config.json`

## Run

`npm start`

## Powered By

[Snapkite.com](http://snapkite.com)

## License

Snapkite is released under the MIT license.
