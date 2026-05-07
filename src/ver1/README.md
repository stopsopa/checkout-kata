This directory contains first simpler implementation of checkout class where we will just inject finite and static set of rules.

It's not really usable implementation because I assume more realistic scenario we would have any arbitrary number of rules in database
and I assume we wouldn't load them all into server memory.

So it would be good to delegate at least the part of rules elimination logic to database.

```

/bin/bash ts.sh --test src/ver1/ver1.test.ts

```