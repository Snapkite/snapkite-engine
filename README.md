# Snapkite Engine

Snapkite Engine gives you filtered stream of photos posted publicly on Twitter.

It can do 2 (either or both) things with those photos:

1. Send them to a socket connection and allow all your clients to receive them in real-time.
2. Store them in MongoDB and retrieve later with [Snapkite API Server](https://github.com/fedosejev/snapkite-api-server.git) or your own application.

__Please note__: Snapkite Engine depends on filters that are maintained in a [separate repository](https://github.com/fedosejev/snapkite-filters.git).

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

## Configure

You can configure Snapkite Engine by editing `config.json`.

#### `application.pushTweets`

Send tweets to client?

Expects `true` or `false`.

#### `application.storeTweets`

Store tweets in a MongoDB collection?

Expects `true` or `false`.

#### `application.pushKeywords`

Send keyword stats to client?

Expects `true` or `false`.

#### `application.trackKeywords`

Which keywords should we ask Twitter to track for us?

Expects a string of keywords separated by a single whitespace, e.g.: `selfie london`

Read this for more details: https://dev.twitter.com/streaming/overview/request-parameters#track

#### `application.twitter.api`

Twitter API keys that Twitter provides you with. You can find them [here](https://apps.twitter.com/).

#### `application.twitter.filters`

Configure each filter individually.

#### `application.database`

MongoDB connection configuration.

#### `application.socket`

Socket configuration.

## Filters

[Everything you need to know](https://github.com/fedosejev/snapkite-engine/tree/master/filters) about Snapkite filters.

## MongoDB

### Install

1. Install MongoDB: http://docs.mongodb.org/manual/installation/
2. Open `mongo` shell and create database:

  ```
  use snapkite;
  ```
3. Create capped `tweet` collection, 100MB in size, with maximum number of documents of 5000:
  ```javascript
  db.createCollection('tweet', { capped: true, size: 100000000, max: 5000});
  ```

  Read more about capped collections in MongoDB: http://docs.mongodb.org/manual/core/capped-collections/

4. Create `keyword` collection:
  ```javascript
  db.createCollection('keyword');
  ```

5. Insert the only document needed:
  ```javascript
  db.keyword.insert({ data: {} });
  ```

### Manipulate

Here is the list of helpful `mongo` shell commands.

#### Show number of tweets stored

`db.tweet.count();`

#### Show all `tweet` collection stats

`db.tweet.stats();`

#### Show latest 5 tweets

`db.tweet.find().sort({_id:-1}).limit(5).pretty();`

#### Show keywords stored

`db.keyword.findOne().data;`

#### Show sorted list of all keywords without their counters

`Object.keys(db.keyword.findOne().data).sort();`

#### Delete `tweet` collection

`db.tweet.drop();`

#### Delete `snapkite` database

```javascript
use snapkite;
db.drop();
```

## Run

`npm start`

## Powered By

* [Snapkite.com](http://snapkite.com)
* [Selfie.how](http://selfie.how)

## License

Snapkite is released under the MIT license.

This software comes with NO WARRANTY, expressed or implied.
