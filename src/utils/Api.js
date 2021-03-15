export const sendRequest = (requestUrl, method = 'GET', body = null) => {
    const headers = {
        // 'Content-Type': 'application/json'
    }

    return fetch(requestUrl, {
        method,
        body: body && JSON.stringify(body),
        headers,
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            return res.json().then(error => {
                const e = new Error('beee');
                e.data = error;
                throw e;
            })
        })
};

export const apiUrl = 'https://admin.glazok.tv';

export const getCategories = () => sendRequest(apiUrl + '/categories.json');

export const getPosts = () => sendRequest(apiUrl + '/posts.json');

export const getPost = (id) => sendRequest(apiUrl + `/posts/${id}.json`);