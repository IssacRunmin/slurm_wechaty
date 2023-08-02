//import { Wechaty }  from 'wechaty';
const express = require('express')
const { WechatyBuilder } = require('wechaty')
const app = express()
const name = 'wechaty-puppet-wechat4u';
const bot = WechatyBuilder.build({
  name: 'Wechat4Slurm',
  puppet: name, 
});

// 设置一个预定义的 token
const TOKEN = 'YOUR_TOKEN'

// 监听 /send 路径的 GET 请求
app.get('/send', async (req, res) => {
  // 从查询参数中获取 token、用户 ID 和消息内容
  const token = req.query.token
  const userId = req.query.userId
  const message = req.query.message
  console.log(userId)
  console.log(message)
  // 检查 token 是否有效
  if (token !== TOKEN) {
    console.log('Invalid token')
    return
  }

  // 查找用户
  const contact = await bot.Contact.find({ name: userId })
  console.log('fin contact')
  // 发送消息
  if (contact) {
    await contact.say(message)
    res.send('Message sent')
  } else {
    // using alias:
    const contact = await bot.Contact.find({ alias: userId })
    console.log('fin contact2')
    if (contact) {
      await contact.say(message)
      res.send('Message sent')
    }
    else {
      res.send('User not found')
    }
  }
})

bot.on('scan', (qrcode, status) => {
  // 在控制台打印二维码
  require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://wechaty.js.org/qrcode/',
    encodeURIComponent(qrcode),
  ].join('');
  console.log(qrcodeImageUrl);
})

bot.on('login', async user => {
  console.log(`User ${user} logged in`)
  const contactList = await bot.Contact.findAll()
  // console.log('Bot Contact List: ' + contactList.map(contact => contact.payload.name).join(', '))
})

bot.on('friendship', async friendship => {
  try {
    console.log(`received friend event.`);
    switch (friendship.type()) {
      // 1. New Friend Request
      case bot.Friendship.Type.Receive:
        // Get the contact object associated with the friendship
        const contact = friendship.contact();
        // Get the hello message sent with the friend request
        const hello = friendship.hello();
        // output the alias:
        const name = contact.name();
        const match = /我是(?:.+的)?(.+)/.exec(hello) || /(.+)/.exec(hello);
        let alias = match ? match[1] : name;
        
        // Check if the extracted alias is not longer than 4 characters
        if (alias.length > 4) {
          alias = name;
        }
        // Set the alias for the new friend
        await contact.alias(alias);
        // Accept the friend request
        await friendship.accept();
        const res_alias = await contact.alias();
        if (res_alias) {
          console.log("alias set success")
        }
        else{
          await contact.alias(name);
          // res_alias = await contact.alias();
        }
        await contact.say(`您好，我是usslab服务器微信机器人！很高兴认识你。您的微信名是${name}，昵称是${alias}。服务器可以使用slurm+mail-user来进行作业自动化通知，请使用\n\`--email-user=${name}\`\n指定微信号。玩得开心🥳！有问题及时联系管理员`);
        break;
      // 2. Friend Ship Confirmed
      case bot.Friendship.Type.Confirm:
        console.log(`friend ship confirmed`);
        break;
    }
  } catch (e) {
    console.error(e);
  }
});

// 启动 Wechaty 和 Express
async function main() {
  await bot.start()
  app.listen(5700, () => {
    console.log('Listening on port 5700')
  })
}

main()

