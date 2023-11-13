#!/bin/bash

# Check if at least one argument was provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 <version>"
  exit 1
fi

# Save the first argument (the version) to a variable named "version"
version="$1"

SHARED_FOLDER="/usr/src/app/src/shared"
DOCKERFILE="../images/javascript-image/Dockerfile"

echo "building"
cd $SHARED_FOLDER
docker build -t js_box -f $DOCKERFILE .
docker run -d --name jsbox_${version} -p 900${version}:9000 --network peerprep-network \
  -m 500M --memory-reservation 256M --cpus="1" --security-opt="no-new-privileges=true" js_box

# Check if the container is running
if [ $? -ne 0 ]; then
  echo "Failed to run the Docker container"
  exit 1
fi

echo "Successfully running js_box${version} accessible at port 900${version}"