# Novabook Test

## Description
Novabook's tech test written using the [Nest framework](https://github.com/nestjs/nest).

## Project setup

This project uses a locally running SQLserver instance in docker. To use this you will need to have the following installed:
* [Node JS](https://nodejs.org/en)
* [docker engine](https://docs.docker.com/engine/install/)
* [sqlcmd](https://learn.microsoft.com/en-us/sql/tools/sqlcmd/sqlcmd-utility?view=sql-server-ver16&tabs=go%2Clinux&pivots=cs1-bash)

First navigate a shell/terminal to the root of the project and install the required node modules
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

Please [email me](mailto:james@jamesyao.co.uk) if you encounter any difficulty starting this service at 

Once you have run these, remember to clean up the process and docker instance!

## Notes 
I chose to make this using the NestJS framework because I like the modular design this encourages.
I chose to use SQL with Docker to emulate connecting to a regular SQL database.
I am just using console logs for observability/logging due to scope
I have made a private GitHub repostiory for this task (so as not to leak anything) should you decide you want to see the repo, please email me and I can grant access.

## Assumptions
* I am assuming taxPosition to be the tax payments minus the sales tax (positive means in credit) 
* Any item and transaction collisions will ignore the later item
* All tax calculations are rounded down where necessary, and this is not per-item not in total
* For patching iff the invoice/transaction exists the corresponding transaction date will be updated
* If the Item referred to in the patch exists it will be updated and if not it will be created
* Patching still requires a valid invoice and item ID to work correctly

## Further Development
Some ideas have been left unmade dueto the scope of this work. The following could be explored for a more complete project:
1. Injecting config using the nest framework to make passing config cleaner and easier to scale
2. Extending above, connection secrets (such as the sqlserver password) have been hardcoded in where they absolutely should never be for a real project
3. Using an event sourced database would make everything easier to audit which would be good as payments are involved, especially when dates are being updated
4. As this was just a tech test, unit / acceptance / e2e tests have been omitted which obviously would be better for reducing change-fail rate for real production code
5. An injectable Logger to replace `console.log`s would be nice
