class JsonResponse {
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    static success(code, data) {
        return new JsonResponse(code, 'success', data);
    }

    static fail(code, data) {
        return new JsonResponse(code, 'fail', data);
    }

    static custom(code, msg, data) {
        return new JsonResponse(code, msg, data);
    }

    send(res) {
        res.status(this.code).json({
            code: this.code,
            msg: this.msg,
            data: this.data,
        });
    }
}

module.exports = JsonResponse;