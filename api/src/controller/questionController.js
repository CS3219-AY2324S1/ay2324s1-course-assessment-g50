const JsonResponse = require('../common/jsonResponse')
const question = require('../db/mongodb/models/question')

// --------------------------------------- Service logic -------------------------------------------

// Add question to repo
async function addQuestion(req, res) {
    // Create a question model
    const { qid, title, description, categories, complexity } = req.body
    const newQuestion = new question({ qid, title, description, categories, complexity })

    // If question title already exisits, return fail
    const dbQuestion = await question.find({qid: qid}).catch(err => {
        return JsonResponse.fail(500, err).send(res)
    })
    if (dbQuestion.length > 0) {
        return JsonResponse.fail(400, 'This question already exisits in repo').send(res)
    }

    // Save model to DB:
    await newQuestion.save().then(savedQuestion => {
        return JsonResponse.success(201, savedQuestion).send(res)
    }).catch(err => {
        return JsonResponse.fail(500, 'Failed to add question').send(res)
    })
}

// Get questions by filter
async function getQuestions(req, res) {
    // Get filtered info:
    const { qid, title, description, categories, complexity } = req.query
    // Filer constructor:
    const filter = {}
    if (qid) {
        filter.qid = qid
    }
    if (title) {
        filter.title = title
    }
    if (description) {
        filter.description = description
    }
    if (categories) {
        filter.categories = categories;
    }
    if (complexity) {
        filter.complexity = complexity;
    }
    // Get target questions by filtering options:
    await question.find(filter).then(targetQuestions => {
        return JsonResponse.success(200, targetQuestions).send(res)
    }).catch(err => {
        return JsonResponse.fail(500, 'Failed to get question').send(res)
    })
}

// Update question
async function updateQuestion(req, res) {
    // Get target update info
    const {  title, description, categories, complexity } = req.body
    const id = req.params.id
    // Update question by Id
    await question.findOneAndUpdate( { qid: id }, { title, description, categories, complexity }, { new: true }).then(updatedQuestion => {
        if (!updatedQuestion) {
            return JsonResponse.fail(404, 'Question not found').send(res)
        }
        return JsonResponse.success(201, updatedQuestion).send(res)
    }).catch(err => {
        return JsonResponse.fail(500, 'Failed to update question').send(res)
    })
}

// Delete question from repo
async function deleteQuestion(req, res) {
    // Delete question by id
    const id = req.params.id
    await question.findOneAndDelete({ qid: id }).then(deletedQuestion => {
        if (!deletedQuestion) {
            return JsonResponse.fail(404, 'Question not found').send(res)
        }
        return JsonResponse.success(204, 'Deletion Successful').send(res)
    }).catch(err => {
        return JsonResponse.fail(500, 'Failed to delete question').send(res)
    })
}

module.exports = { addQuestion, getQuestions, updateQuestion, deleteQuestion }