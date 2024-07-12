ARG RUN_MODE=dev

FROM node:16.10 as dev
ADD ./ /app/
WORKDIR /app
RUN npm install --dev
RUN npm install
CMD ["/bin/bash", "./scripts/entrypoint.sh"]


FROM dev