#!/bin/sh
sed -i -- "s|REPLACEME|$BACKEND_URL|g" /static/js/*
nginx -g "daemon off;"
