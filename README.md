# Culinary recipes

## Table of contents
* [Development environment setup](#development-environment-setup)
  * [With Docker](#with-docker)
    * [Prerequisites](#prerequisites)
    * [Services management](#services-management)
    * [Run tests](#run-tests)
    * [Troubleshooting](#troubleshooting)
  * [Without Docker](#without-docker)
    * [Local prerequisites](#local-prerequisites)

## Development environment setup

### With Docker
Docker has been used to provide portable setup for development regardless of operating system and its dependencies. Therefore, it is not necessary to install database servers or any other services locally - you just need to build prepared docker images locally.

Configuration steps ensure separation from the host and all process will happen inside the virtualized environment. Therefore, values within configuration files point either to containers or ports "visible" only inside the virtualized environment.

All Docker images and services for development and test environment are suffixed with `.local` in their names.

#### Prerequisites
* Docker
* docker-compose
* console capable of running shell scripts :)

#### Services management
To initialize whole environment just run the following scripts:
```bash
bin/docker/build
bin/docker/setup
```

Running application should be available under `http://localhost:3000` address.

Bash scripts allowing for management are placed in `bin/docker` directory.

Containers do not need to be rebuilt after each change in codebase. **However, configuration changes (files from `config/settings/` directories) require server restart, so as a result, this can be achieved by containers restart.**

Useful commands for services management:
* `bin/docker/build` rebuilds images
* `bin/docker/start` starts services
* `bin/docker/stop` stops services
* `bin/docker/clean` stops services and removes all related containers, networks and application image
* `bin/docker/status` displays the current state of containers
* `bin/docker/logs` attaches to the logs of all running services while following the outputs
* `bin/docker/bash` opens bash shell 'inside' the application container
* `bin/docker/db_console` - allows to access development database via `psql` tool - should also prompt for password - see `config/settings/development.ts` for development db password

#### Run tests
```bash
bin/docker/run_tests
```

#### Troubleshooting
_What if I encounter `Error: EIO: i/o error, read` error?_

You have run out of disk space on your host computer - free some space before continuing.

### Without Docker
Simply run `bin/setup` to install dependencies and setup database.
