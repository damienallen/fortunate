# fortunate
A simple web app for epigrams


## Setup

The development environment is built around docker, alleviating the need to manage python and node versions.

The only system dependecy is docker (compose).


### Build

Build images for frontend and backend:

```bash
docker compose build
```

### Database

The database can be populated from [fortune-mod's dat files](https://github.com/shlomif/fortune-mod/tree/master/fortune-mod/datfiles):

```bash
docker compose run --rm service python -m fortunate.populate
```

However, this can take some time, so a faster option is to use the populated sample database:

```bash
cp sample_sqlite.db sqlite.db
```

## Use

Run the application locally:

```bash
docker compose up
```

View the app: [localhost:5173](http://localhost:5173)

Or check out the api:  [localhost:8000/docs](http://localhost:8000/docs)