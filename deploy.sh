#!/bin/sh

target=staging

while getopts t: flag
do
  case "${flag}" in
    t) target=${OPTARG};;
    *) exit 1
  esac
done

if [ "$target" = "production" ]; then
  echo deploying to production...
  ssh deploy@front.glazok.tv 'cd /home/deploy/glazok-frontend && git pull && yarn && yarn build'
elif [ "$target" = "staging" ]; then
  echo deploying to staging...
  ssh deploy@front.glazok.tv 'cd /home/deploy/glazok-frontend-staging && git pull && yarn && yarn build'
else
  echo "unknown target: $target"
fi

