#!/bin/sh
sed -i -- "s|SEITANREPLACEME|$BACKEND_URL|g" /static/js/*
nginx -g "daemon off;"
