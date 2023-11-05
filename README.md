# MetaPhoto Photo Library

## Overwiew

Software Developer Technical Test

- Node
- Express
- React

Highlights:

- [x] Data enrichment
- [x] Filtering
- [x] Pagination
- [x] Caching
- [x] Sales pitch generation using OpenAI API
- [x] Azure build pipeline
- [x] Jest unit tests for BL class

There are trade-offs given a limited timeframe, see [Side Note](#side-note) section.

## Client

Provided React.js client consists of a single page with a form where all query parameters [listed here](#externalapiphotos) can be set.

To generate a sales pitch for a photo, press "Get Creative!" button

## API

API Gateway supports three endpoints:

- /externalapi/photos
- /externalapi/photos/{id}
- /externalapi/ai/photo-pitch/{id}

External data is being cached in memory respecting `max-age`. If the external server does not provide `cache-control` header, a default configurable TTL will be used

### /externalapi/photos

Returns a paginated list of enriched photoes.

Supported query string parameters:
| Parameter | Description |
| --------- | ----------- |
| title | filter by a fragment of a Photo title |
| album.title | filter by a fragment of an Album title |
| album.user.email | Exact match of a User's email |
| offset | Pagination offset |
| limit | The number of records returned |

Notes:

- filtering is case insensitive
- if a pagination parameter is missing, a configurable default value will be used

Sample output of /externalapi/photos?offset=5&limit=1:

```json
{
  "page": {
    "offset": 5,
    "limit": 2,
    "total": 5000
  },
  "data": [
    {
      "id": 6,
      "title": "accusamus ea aliquid et amet sequi nemo",
      "url": "https://via.placeholder.com/600/56a8c2",
      "thumbnailUrl": "https://via.placeholder.com/150/56a8c2",
      "album": {
        "id": 1,
        "title": "quidem molestiae enim",
        "user": {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        }
      }
    }
  ]
}
```

### /externalapi/photos/{id}

Returns an array of exactly one photo object in the same format, or 404 Not Found.

Search query string parameters are ignored

### /externalapi/ai/photo-pitch/{id}

Generates a salling pitch using Photo, Album, and User data.

Returns a simple json containing a selling pitch:

```json
{
  "text": "Selling pitch text"
}
```

Using gpt-4 model, titles get translated from Latin to English and being used as a source of sales pitch phrase along with User name, Company name, City, and Catchphrase.

Since images have nothing to categorize, image categorization would be boring to implement. Text is much more fun, having not very meaningful input data, for example:

_Discover Leanne Graham's masterpiece artwork, "It is reprehensible to leave cowardice", a shining jewel in her innovative album, "Indeed, the Nuisance Exists." This cutting-edge art piece from Gwenborough blends sophisticated multi-layered neural-net illustrations with profound traces of the undefined. It is fascinating how Graham has captured the undefinable essence within each layer, challenging and bewitching the visual senses. Romaguera-Crona is proud to provide this high-profile art piece. Here's your golden opportunity to own Graham's genius. Embrace the nuance, live the courage it demands, and let "It is reprehensible to leave cowardice" be the centerpiece of your collection._

## Build & Run

### Requirements:

- Node.js 16x+

### Folder structure:

```
root
 - photo-library/
 - photo-library-ui/
```

`photo-library` is Express.js API gateway

`photo-library-ui` is a simple React.js client based on [Vite bundler](https://vitejs.dev)

### Running API Gateway

```
cd photo-library
npm install
npm start
```

This will start API Gateway on port 3000

#### Configuration

| Environment Variable | Description    | Notes                                         |
| -------------------- | -------------- | --------------------------------------------- |
| OPENAI_API_KEY       | OpenAI API Key | _Required!_                                   |
| PORT                 | HTTP port      | default: 3000                                 |
| API_BASE_URL         | HTTP port      | default: https://jsonplaceholder.typicode.com |
| DEFAULT_OFFSET       | HTTP port      | default: 0                                    |
| DEFAULT_LIMIT        | HTTP port      | default: 25                                   |
| DEFAULT_CACHE_TTL    | HTTP port      | default: 60 (seconds)                         |
| CACHE_CHECK_PERIOD   | HTTP port      | default: 30 (seconds)                         |

Configuration can be provided using `.env` file as well.

Nothe that `.env` is excluded from source control.

### Running Client Locally

```
cd photo-library-ui
npm install
npm run dev
```

This will start the Client in dev mode. It can be accessed at [http://localhost:5173/](http://localhost:5173/)

The Client expects API gateway to run on port 3000

To avoid running two processes the Client can be built:

```
npm run build
```

That will copy built artifacts into API Gateway `static` folder so Express could serve them

## Side note

Due to time constraints here are some thoughts and concerns.

### JSON format

Output JSON format is not exactly what was asked for, and there are two reasons behind that:

1. Pagination
2. Uniform output (a client always expects a paginated array even querying for a single item)

### Caching and Filtering

This solution is far from being ideal because it uses in-memory cache (better than no cache) and in-memory filtering. That is perfectly fine for the amounts of data we deal with but is not scalable.

Ideally, expecting a big number of records, we would use a local copy of the external data stored in some sort of a document database with full-text search capabilities like ElasticSearch or MongoDB. But that raises even more concerns:

- how stale records get purged and refreshed?
- how new records get ingested?
- does typicode.com support pagination (at least)?

and so on...

### Documentation

It would be great to have OpenAPI / Swagger document or at least Postman or Insomnia request collection

### Client error handling

The client does not display HTTP errors

### Test Coverage

Due to time constraints only the main business logic is covered by unit tests
