const JsonResponse = require('../common/jsonResponse');
const conversation = require('../db/models/conversation');

// Add New conversation
async function addConversation(req, res) {
    const { matchId, senderId, receiverId } = req.body;

    try {
        const filter = { matchId };
        const update = {
            matchId,
            members: [senderId, receiverId]
        };

        const options = {
            upsert: true, // If document does not exist, create it
            new: true, 
            useFindAndModify: false 
        };

        const savedConversation = await conversation.findOneAndUpdate(filter, update, options);
        
        return JsonResponse.success(201, savedConversation).send(res);
    } catch (err) {
        return JsonResponse.fail(500, err).send(res);
    }
}

// Get conversation
async function getConversation(req, res) {
    const { matchId } = req.params

    const fetchedConversation = await conversation.findOne({
        matchId: matchId,
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res)
    })
    return JsonResponse.success(200, fetchedConversation).send(res)
}


module.exports = { addConversation, getConversation };