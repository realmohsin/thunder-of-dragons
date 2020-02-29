#!/bin/bash

export PGPASSWORD='Mohsinr6'

echo "Configuring thunder_of_dragons"

dropdb -U node_user thunder_of_dragons
createdb -U node_user thunder_of_dragons

psql -U node_user thunder_of_dragons < ./bin/sql/account.sql
psql -U node_user thunder_of_dragons < ./bin/sql/generation.sql
psql -U node_user thunder_of_dragons < ./bin/sql/dragon.sql
psql -U node_user thunder_of_dragons < ./bin/sql/trait.sql
psql -U node_user thunder_of_dragons < ./bin/sql/dragonTrait.sql
psql -U node_user thunder_of_dragons < ./bin/sql/accountDragon.sql

node ./bin/insertTraits.js

echo "thunder_of_dragons configured"