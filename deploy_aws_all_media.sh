#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# sync with sky.fr S3 bucket
aws s3 sync ~/Code/vue/skyl.fr/dist/ s3://skyl.fr
# clear cloud front cache for skyl.fr
aws cloudfront create-invalidation --distribution-id=E3RF73EBXPNUZ --paths "/*" 