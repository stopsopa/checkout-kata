# Original challenge

https://github.com/brightsg/checkout-kata

# Requirements

- node version [.nvmrc](./.nvmrc)
- docker or podman

Link to code coverage: https://stopsopa.github.io/checkout-kata/coverage/

# Description

There are two implementations of checkout process:

- Ver1 - in memory implementation using in memory rules -> [src/ver1/README.md](src/ver1/)

- Ver2 - implementation using database rules [src/ver2/README.md](src/ver2/)

follow these readme files for details

# Technical decisions

Entire solution was designed to make it as simple as possible.

So in this project I use native node.js typesctripping to run \*.ts files directly.

Typescript compiler is used only for typechecking.

Above makes entire codebase very clear and easy to follow. (That is at least my hope).

Database is ran using podman (it should work with docker but I don't have setup to check - but I believe it should work ;) ). Wrapper shell script should handle both. (edit: it seems to be working with docker in github actions)

Intilially I thought that it will be good to create universal Checkout class implementation and separate Rules finder into swappable separate class. But then once all was build I've realised it would be more readable to absorbe entire logic into [src/interfaces/AbstractCheckout.ts](src/interfaces/AbstractCheckout.ts), it's just easier to follow.

From now on any implementation can be created by extending that abstract class and on that level it can be decided what could be reused and what should be reimplemented.

And this is the way two above implementations were created.

Tests drive both implementations pretty much through the same test cases against two differend implementations of AbstractCheckout.ts pulling rules from two different sources.

# Setup

```

npm install
npm run docker:up
  # give it a while

# then
npm run db:migrate
npm run db:fixtures

# then run tests
npm run tests

```

# Dev commands

see `scripts` section in [package.json](package.json)

```

npm run check
  # typescript checks

npm run style:check
  # check formatting

npm run style:fix
  # fix formatting

npm run style:list
  # list files with formatting issues

npm run coverage:server
  # open coverage in default browser

npm run server
  # start server - not really used

npm run db:generate
  # generate db migration

npm run db:migrate
  # run db migration

npm run db:fixtures
  # load db fixtures

```
