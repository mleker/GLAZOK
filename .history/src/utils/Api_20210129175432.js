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

const devApiUrl = 'https://murmuring-coast-74656.herokuapp.com';

export const getCategories = () => sendRequest(apiUrl + '/categories.json');
export const getPost = (post_id) => sendRequest(apiUrl + '/posts/post_id.json');