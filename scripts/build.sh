#!/usr/bin/env bash

clear
rm -rf dist
echo "🛠️ Building..."

yarn tsc \
&& rsync -avm --include='*/' --include="*.css" --include='*/**.css' --exclude='*' src/ dist/ \
&& echo "✔️ Built!"
