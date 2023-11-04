const JsonResponse = require('../common/jsonResponse');
const message = require('../db/models/message');

async function addMessage(req, res) {
    const roomId = req.session.roomId;
    if (!roomId) {
        return JsonResponse.fail(500, "Room Id not found in this session").send(res);
    }
    const { userId, message, timestamp } = req.body;
    const newMessage = new message({ userId, roomId, message, timestamp });
    await newMessage.save().then(savedMessage => {
        return JsonResponse.success(201, savedMessage).send(res);
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    })
}


async function getMessages(req, res) {
    const roomId = req.session.roomId;
    if (!roomId) {
        return JsonResponse.fail(500, "Room Id not found in the session").send(res);
    }

    const messages = await message.find({ roomId: roomId }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    })
    return JsonResponse.success(200, messages).send(res);
}

module.exports = { addMessage, getMessages };