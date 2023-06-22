import express from 'express'
import { getDb } from '../data/database.js'



const localStorageKey = 'jwt-key';
const router = express.Router()
const db = getDb() 

router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.channels)
})


///GET FRÅN ID
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
  
    if (!isNaN(id)) {
      await db.read();
      const channel = db.data.channels.find((c) => c.id === id);
      if (channel) {
        const channelMessages = channel.channelMessages || [];
        res.send(channelMessages);
      } else {
        res.status(404).send('Channel not found.');
      }
    } else {
      res.status(400).send('Invalid id.');
    }
  });
  

  
///LÄGG TILL CHANNEL
router.post('/', async (req, res) => {
    let addChannel = req.body

    await db.read()
    addChannel.id = Math.floor(Math.random() * 100000)
    db.data.channels.push(addChannel)
    await db.write()
    res.send({ id: addChannel.id })
})



///DELETE CHANNEL 
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)

    if (isNaN(id) || id < 0) {
        res.sendStatus(400)
        return;
    }
    await db.read();
    const index = db.data.channels.findIndex(channel => channel.id === id);
    if(index === -1) {
        res.sendStatus(404)
        return;
    }

    db.data.channels.splice(index, 1);
    await db.write()
    res.sendStatus(200);
})


// LÄGG TILL MEDDELANDE
router.post('/:channelId/channelMessages', async (req, res) => {
  const channelId = parseInt(req.params.channelId);
  const newMessage = req.body;

  await db.read();
  const channelIndex = db.data.channels.findIndex((c) => c.id === channelId);
  if (channelIndex === -1) {
    res.status(404).send('Kanalen hittades inte.');
    return;
  }

  newMessage.id = Math.floor(Math.random() * 100000);
  db.data.channels[channelIndex].channelMessages.push(newMessage);
  await db.write();
  
  res.send({ id: newMessage.id });
});



///DELETE CHANNEL MESSAGE
router.delete('/:channelId/channelMessages/:messageId', async (req, res) => {
  const channelId = parseInt(req.params.channelId);
  const messageId = parseInt(req.params.messageId);

  await db.read();
  const channelIndex = db.data.channels.findIndex((c) => c.id === channelId);
  if (channelIndex === -1) {
    res.status(404).send('Kanalen hittades inte.');
    return;
  }

  const channel = db.data.channels[channelIndex];
  const messageIndex = channel.channelMessages.findIndex(
    (m) => m.id === messageId
  );
  if (messageIndex === -1) {
    res.status(404).send('Meddelandet hittades inte.');
    return;
  }

  channel.channelMessages.splice(messageIndex, 1);
  await db.write();

  res.sendStatus(200);
});




///PUT CHANNELSMESSAGES

router.put('/:channelId/channelMessages/:messageId', async (req, res) => {
  const channelId = parseInt(req.params.channelId);
  const messageId = parseInt(req.params.messageId);
  const updatedMessage = req.body;


  ///kollar om kanalen ens finns först, om inte 404
  await db.read();
  const channelIndex = db.data.channels.findIndex((c) => c.id === channelId);
  if (channelIndex === -1) {
    res.status(404).send('Kanalen hittades inte.');
    return;
  }

  //här letar vi efter meddelanden efter id, om inte 404
  const channel = db.data.channels[channelIndex];
  const messageIndex = channel.channelMessages.findIndex((m) => m.id === messageId);
  if (messageIndex === -1) {
    res.status(404).send('Meddelandet hittades inte.');
    return;
  }


  //om allt stämmer så kopieras det nmya värdet in i databasen med det nya vädet.
  channel.channelMessages[messageIndex] = { ...channel.channelMessages[messageIndex], ...updatedMessage };
  await db.write();

  res.sendStatus(200);
});


export default router