FROM node

ENV APP=/home/app
WORKDIR $APP

COPY . $APP

RUN yarn install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && yarn dev