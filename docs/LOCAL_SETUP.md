# Local Setup

## macOS

```sh
git clone REMOTE-URL data-science-wiki
cd data-science-wiki
make doctor
make setup
make preview
```

Install Node 22 with nvm or the official Node installer if `make doctor` reports an older version.

Stop the preview server with `Ctrl-C`. If port 8080 is busy, run:

```sh
PORT=8090 make preview
```
