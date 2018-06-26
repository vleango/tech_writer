#!/bin/bash

export APP_ENV=test
echo "Setting APP_ENV: $APP_ENV"

export DYNAMODB_HOST_URL=http://db-dynamo-test:8000
echo "Setting DYNAMODB_HOST_URL: $DYNAMODB_HOST_URL"

export ELASTICSEARCH_HOST_URL=http://datastore-es-test:9200
echo "Setting ELASTICSEARCH_HOST: $ELASTICSEARCH_HOST_URL"

./wait-for-it.sh db-dynamo-test:8000 && echo 'db connected!' && \
./wait-for-it.sh datastore-es-test:9200 && echo 'elasticsearch connected!' && \

./test.sh $1
