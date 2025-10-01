import {PUBLIC_SISKO_EXAM_API} from "$env/static/public"

export const questionGetList = async () => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        }
    });
}

export const questionGet = async (id) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question/${id}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        }
    });
}

export const questionPost = async (question) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(question)
    });
}

export const questionPatch = async (question) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question/${question.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(question)
    });
}

export const questionDelete = async (id) => {
    return await fetch(`${PUBLIC_SISKO_EXAM_API}/question/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
        }
    });
}