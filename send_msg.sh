#!/bin/bash

# 设置变量
USER_ID=$1
MESSAGE=$2
TOKEN="YOUR_TOKEN"
URL="http://localhost:5700/send"

# 发送请求
curl -G "${URL}" \
     --data-urlencode "userId=${USER_ID}" \
     --data-urlencode "message=${MESSAGE}" \
     --data-urlencode "token=${TOKEN}"

