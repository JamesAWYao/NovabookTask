# Novabook Test

## Description
Novabook's tech test written using the [Nest framework](https://github.com/nestjs/nest).

## Project setup

This project uses a locally running SQLserver instance in docker. To use this you will need to have the following installed:
* [docker engine](https://docs.docker.com/engine/install/)
* [sqlcmd](https://learn.microsoft.com/en-us/sql/tools/sqlcmd/sqlcmd-utility?view=sql-server-ver16&tabs=go%2Clinux&pivots=cs1-bash)

First install the required node modules
```bash
$ npm install
```
Then start the local sqlserver docker instance
```bash
$ npm run startSQL
```
Then use `sqlcmd` to add the database table definitions
```bash
$ npm run makeTables
```
The project can now be started with the following command
```bash
$ npm run start
```
## Notes about choices
I chose to make this using the NestJS framework because I like the modular design this encourages.

## Further Development
Some ideas have been left unmade dueto the scope of this work. The following could be explored for a more complete project:
1.  Injecting config using the nest framework to make passing config cleaner and easier to scale
2. Using an event sourced database would make everything easier to audit which would be good as payments are involved
3. As this was just a tech test, unit / acceptance / e2e tests have been omitted which obviously would be better for reducing change-fail rate for real production code
