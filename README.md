![Snapkite Engine logo](https://github.com/Snapkite/snapkite-engine/blob/master/snapkite-engine-logo.png)

# Snapkite Engine

**Snapkite Engine gives you filtered stream of photos posted publicly on Twitter.**

It can do 2 (either or both) things with those photos:

1. Send them to a socket connection and allow all your clients to receive them in real-time.
2. Store them in MongoDB and retrieve later with [Snapkite API Server](https://github.com/snapkite/snapkite-api-server.git) or your own application.

## Examples

* [Snapterest.com](http://snapterest.com)
* [Map.Snapkite.com](http://map.snapkite.com)

## Warning

Public stream of photos provided by Twitter contains explicit and adult content. You can filter out this content to an extent, but you can't guarantee that it's 100% filtered.

## Dependencies

* MongoDB must be installed if you choose to store tweets.

## Install

1. `git clone https://github.com/snapkite/snapkite.git`
2. `cd snapkite-engine`
3. `npm install`
4. `cp example.config.json config.json`
5. Add your Twitter API keys to `config.json`
6. Change default MongoDB config in `config.json`

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

Expects a string of keywords separated by a single whitespace or comma, e.g.: `selfie london` or `selfie,london`

Read this for more details: https://dev.twitter.com/streaming/overview/request-parameters#track

#### `application.excludeKeywords`

Which keywords should be ignored?

Expects a string of keywords separated by a comma, e.g.: `exclude,these,keywords`

#### `application.filters`

List of Snapkite filters that this application should use. You can find the list of all available filters [here](https://github.com/snapkite/snapkite-engine/tree/master/filters/README.md).

#### `application.twitter.api`

Twitter API keys that Twitter provides you with. You can find them [here](https://apps.twitter.com/).

#### `application.database`

MongoDB connection configuration.

#### `application.socket`

Socket configuration.

## Filters

[Everything you need to know](https://github.com/snapkite/snapkite-filters/blob/master/README.md) about Snapkite filters.

## MongoDB

### Install

1. Install MongoDB: http://docs.mongodb.org/manual/installation/
2. Open `mongo` shell and create database:

  ```
  use snapkite;
  ```
3. Create capped `tweet` collection, 100MB in size, with maximum number of documents of 5000:
  ```javascript
  db.createCollection('tweet', {capped: true, size: 100000000, max: 5000});
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

## License

Snapkite is released under the MIT license.

This software comes with NO WARRANTY, expressed or implied.
