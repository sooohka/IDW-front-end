#!/bin/zsh
source ./sonartoken
sonar-scanner \
  -Dsonar.projectKey=idw \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=$SONARTOKEN