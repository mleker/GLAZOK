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


export const getCategories = (apiUrl) => sendRequest(apiUrl + '/categories.json');
export const getPost = (apiUrl) => sendRequest(apiUrl + '/posts/post_id.json');