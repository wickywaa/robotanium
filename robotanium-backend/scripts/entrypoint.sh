#!/bin/bash

npm run typeorm -- -d ./src/providers/Database.Provider migration:run -t each
npm run start
