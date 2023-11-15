const JsonResponse = require('../common/jsonResponse');
const message = require('../db/models/message');

async function addMessage(req, res) {
    const { conversationId, sender, text } = req.body;
    const newMessage = new message({ conversationId, sender, text });
    await newMessage.save().then(savedMessage => {
        return JsonResponse.success(201, savedMessage).send(res);
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    })
}


async function getMessages(req, res) {
    const { conversationId } = req.params;
    if (!conversationId) {
        return JsonResponse.fail(500, "ConversationId Id not found in the session").send(res);
    }

    const fetchedMessages = await message.find({ conversationId: conversationId }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    })
    return JsonResponse.success(200, fetchedMessages).send(res);
}

module.exports = { addMessage, getMessages };