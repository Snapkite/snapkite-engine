# Snapkite Engine

Snapkite Engine gives you filtered stream of photos posted publicly on Twitter.

It can do 2 (either or both) things with those photos:

1. Send them to a socket connection and allow all your clients to receive them in real-time.
2. Store them in MongoDB and retrieve later with [Snapkite API Server](https://github.com/fedosejev/snapkite-api-server.git) or your own application.

Please note that Snapkite Engine depends on filters that are maintained in a [separate repository](https://github.com/fedosejev/snapkite-filters.git).

## Warning

Public stream of photos provided by Twitter contains explicit and adult content. You can filter out this content to an extent, but you can't guarantee that it's 100% filtered.

## Dependencies

* If you choose to store photos then you will need MongoDB running.
* As part of installation process, you will install [Snapkite Filters](https://github.com/fedosejev/snapkite-filters.git).

## Install

1. `git clone https://github.com/fedosejev/snapkite.git`
2. `cd snapkite-engine`
3. `npm install`
4. `cp example.config.json config.json`
5. Add your Twitter API keys to `config.json`
6. Change default MongoDB config in `config.json` as needed
7. Clone [Snapkite Filters](https://github.com/fedosejev/snapkite-filters.git): `git clone https://github.com/fedosejev/snapkite-filters.git` into `snapkite-engine/` directory
8. Configure `isAdultContent` filter: copy sample config file and change list of adult keywords as needed: `cp snapkite-filters/is-adult-content/example.config.json snapkite-filters/is-adult-content/config.json`

## Run

`npm start`

## Powered By

* [Snapkite.com](http://snapkite.com)
* [Selfie.how](http://selfie.how)

## License

Snapkite is released under the MIT license.

This software comes with NO WARRANTY, expressed or implied.
