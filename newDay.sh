#!/bin/bash

# Check if the number of arguments provided is correct
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <dayNum>"
    exit 1
fi

dayNum=$1
folder_name="day-${dayNum}"

# Create a new folder
mkdir "$folder_name"

# Create data.txt and test-data.txt files
touch "${folder_name}/data.txt"
touch "${folder_name}/test-data.txt"

# Create day-{dayNum}-part-1.ts and day-{dayNum}-part-2.ts files
touch "${folder_name}/day-${dayNum}-part-1.ts"
touch "${folder_name}/day-${dayNum}-part-2.ts"

# Update package.json "run" script
sed -e "s/\"run\":.*/\"run\": \"tsc \&\& node dist\/${folder_name}\/day-${dayNum}-part-1.js\",/" package.json