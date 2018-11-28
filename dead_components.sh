#!/bin/bash

for fullfile in components/*; do
  # remove .js
  filename=$(basename -- "$fullfile")
  comp_name="${filename%.*}";

  # look for component name
  count=$(grep -oR ${comp_name} --exclude="components/${comp_name}.js" --exclude="templates/components/${comp_name}.hbs" | wc -l);
  if [ "$count" -eq "0" ]; then
    echo "$comp_name";
  fi
done
