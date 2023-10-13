const JsonResponse = require('../common/jsonResponse')
const question = require('../db/models/question')

// --------------------------------------- Service logic -------------------------------------------

// Add question to repo
async function addQuestion(req, res) {
    // Create a question model
    const { title, description, categories, complexity } = req.body
    const newQuestion = new question({ title, description, categories, complexity })

    // If question title already exisits, return fail
    const dbQuestion = await question.find({title: title}).catch(err => {
        return JsonResponse.fail(500, err).send(res)
    })
    if (dbQuestion.length > 0) {
        return JsonResponse.fail(400, 'This question already exisits in repo').send(res)
    }

    // Save model to DB:
    await newQuestion.save().then(savedQuestion => {
        return JsonResponse.success(201, savedQuestion).send(res)
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res)
    })
}

// Get questions by filter
async function getQuestions(req, res) {
    // Get filtered info:
    const { title, description, categories, complexity } = req.query
    // Filer constructor:
    const filter = {}
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
        return JsonResponse.fail(500, err).send(res)
    })
}

// Update question
async function updateQuestion(req, res) {
    // Get target update info
    const { title, description, categories, complexity } = req.body
    const id = req.params.id

    // If same question title as question of different id, return fail
    const dbQuestion = await question.find({title}).catch(err => {
        return JsonResponse.fail(500, err).send(res)
    })
    const duplicates = dbQuestion.filter(q => q._id.valueOf() !== id)
    if (duplicates.length > 0) {
        return JsonResponse.fail(400, 'Another question of the same title already exists').send(res)
    }

    // Update question by Id
    await question.findByIdAndUpdate(id, { title, description, categories, complexity }, { new: true }).then(updatedQuestion => {
        if (!updatedQuestion) {
            return JsonResponse.fail(404, 'Question not found').send(res)
        }
        return JsonResponse.success(201, updatedQuestion).send(res)
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res)
    })
}

// Delete question from repo
async function deleteQuestion(req, res) {
    // Get target question info
    const id = req.params.id
    // Delete question by id
    await question.findByIdAndDelete(id).then(deletedQuestion => {
        if (!deletedQuestion) {
            return JsonResponse.fail(404, 'Question not found').send(res)
        }
        return JsonResponse.success(204, 'Deletion Successful').send(res)
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res)
    })
}

module.exports = { addQuestion, getQuestions, updateQuestion, deleteQuestion }