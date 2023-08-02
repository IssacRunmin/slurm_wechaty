# SLURM Smail via Wechaty

Wechaty bot, send slurm job notice to wechat users

微信机器人，根据slurm作业状态发送给对应的微信用户

TODO:

- [ ] Security: with https webhook for hiding token 
- [ ] HA: high availability

## Key Functions

1. Accept, set alias, and send the message automatically
   自动加好友，根据验证消息设置昵称（目前有bug）并发送信息；
2. Send wechat message when webhook get
   根据URL访问自动发送相应的消息
3. Smail: Slurm job message process
   处理Slurm job发送的消息，生成对应的webhook请求

效果图：

(TBC)

## Requirements

1. Node.js version 16+
2. NPM version 7+

## Install

```shell
# setup npm source if necessary
$ npm config set registry https://registry.npmmirror.com/
$ npm config set disturl https://npm.taobao.org/dist
$ npm config set puppeteer_download_host https://npm.taobao.org/mirrors
$ git clone https://github.com/IssacRunmin/slurm_wechaty
$ cd slurm_wechaty
$ npm install
# or install the following manually:
# $ npm install qrcode-terminal --save
# $ npm install wechaty 
# using wechat puppet for UOS/web login
# $ npm install wechaty-puppet-wechat4u --save
# $ npm install express
$ export WECHATY_PUPPET=wechaty-puppet-wechat4u
```

## Usage

```shell
$ node index.js
# login to wechat via scanning QR code
```

Test on: Another application (shell)

```shell
$ cd # [path/to/slurm_wechaty]
$ ./send_msg.sh 'WechatName' 'Message'
$ smail -s 'Message' 'WechatName'
```

## Reference:

- [使用UOS微信桌面版协议登录，wechaty免费版web协议重放荣光](https://wechaty.js.org/2021/04/13/wechaty-uos-web/)