const JsonResponse = require('../common/jsonResponse');
const question = require('../db/models/question');

// --------------------------------------- Service logic -------------------------------------------

// Add question to repo
async function addQuestion(req, res) {
    // Create a question model
    const { title, description, categories, complexity } = req.body;
    const newQuestion = new question({ title, description, categories, complexity });

    // If question title already exists, return fail
    const dbQuestion = await question.find({ title: title }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    });
    if (dbQuestion.length > 0) {
        return JsonResponse.fail(400, 'This question already exists in repo').send(res);
    }

    // Save model to DB
    await newQuestion.save().then(savedQuestion => {
        return JsonResponse.success(201, savedQuestion).send(res);
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    });
}

// Get questions by filter
async function getQuestions(req, res) {
    // Get Filter, sort and page info
    const { keyword, topicSlugs, complexity, sort, page, pageSize } = req.query;

    /* Filter constructor */
    const filter = {};
    // Build keyword filter
    if (keyword) {
        const regex = new RegExp(keyword, 'i');
        filter.$or = [
            { title: { $regex: regex } },
        ];
    }
    // Build topic filter
    if (topicSlugs) {
        const topicArray = decodeURIComponent(topicSlugs).split(',')
        filter.categories = { $all: topicArray };
    }
    // Build Complexity Filter
    if (complexity) {
        filter.complexity = complexity;
    }

    /* Sorting constructor */
    const sortOptions = {};
    if (sort) {
        if (sort.startsWith('-')) {
            // Sort in descending order
            sortOptions[sort.substring(1)] = -1;
        } else {
            // Sort in ascending order
            sortOptions[sort] = 1;
        }
    }

    /* Calculate pagination options */
    const pageNumber = parseInt(page) || 1; // Default to page 1
    const itemsPerPage = parseInt(pageSize) || 50; // Default to 50 items per page
    const skip = (pageNumber - 1) * itemsPerPage;

    /* Get target questions by filtering options, pagination, and sorting logic */
    await question.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(itemsPerPage)
        .then(targetQuestions => {
            return JsonResponse.success(200, targetQuestions).send(res);
        })
        .catch(err => {
            return JsonResponse.fail(500, err).send(res);
        });
}

// Update question
async function updateQuestion(req, res) {
    // Get target update info
    const { title, description, categories, complexity } = req.body;
    const id = req.params.id;

    // If the same question title as a question of a different id, return fail
    const dbQuestion = await question.find({ title }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    });
    const duplicates = dbQuestion.filter(q => q._id.valueOf() !== id);
    if (duplicates.length > 0) {
        return JsonResponse.fail(400, 'Another question of the same title already exists').send(res);
    }

    // Update question by Id
    await question.findByIdAndUpdate(id, { title, description, categories, complexity }, { new: true }).then(updatedQuestion => {
        if (!updatedQuestion) {
            return JsonResponse.fail(404, 'Question not found').send(res);
        }
        return JsonResponse.success(201, updatedQuestion).send(res);
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    });
}

// Delete question from repo
async function deleteQuestion(req, res) {
    // Get target question info
    const id = req.params.id;
    // Delete question by id
    await question.findByIdAndDelete(id).then(deletedQuestion => {
        if (!deletedQuestion) {
            return JsonResponse.fail(404, 'Question not found').send(res);
        }
        return JsonResponse.success(204, 'Deletion Successful').send(res);
    }).catch(err => {
        return JsonResponse.fail(500, err).send(res);
    });
}

// Get total question count
async function getTotalQuestionCount(req, res) {
    try {
        const totalQuestionCount = await question.countDocuments({});
        return JsonResponse.success(200, totalQuestionCount).send(res);
    } catch (err) {
        return JsonResponse.fail(500, err).send(res);
    }
}

module.exports = { addQuestion, getQuestions, getTotalQuestionCount, updateQuestion, deleteQuestion };