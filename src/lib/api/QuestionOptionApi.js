import {PUBLIC_SISKO_EXAM_API} from "$env/static/public"

export const questionOptionGetList = async () => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question-option`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        }
    });
}

export const questionOptionGet = async (id) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question-option/${id}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        }
    });
}

export const questionOptionPost = async (questionOption) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question-option`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(questionOption)
    });
}

export const questionOptionListPost = async (questionOption) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question-option/all`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(questionOption)
    });
}

export const questionOptionPatch = async (questionOption) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question-option/${questionOption.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(questionOption)
    });
}

export const questionOptionDelete = async (id) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question-option/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
        }
    });
}