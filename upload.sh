#!/bin/bash

if [ -z "$1" ]; then
  echo "Missing commit message"
  exit 1
fi

git add .
git commit -m "$1"
git push -u origin main


