#!/bin/bash
set -eu

DIR=`dirname ./deploy.sh`
java -Xmx800M -jar $DIR/ANCTool-3.0.2.jar
