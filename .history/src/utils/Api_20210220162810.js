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

const devApiUrl = 'https://murmuring-coast-74656.herokuap.com';

export const getCategories = () => sendRequest(devApiUrl + '/categories.json');

export const getPosts = () => sendRequest(devApiUrl + '/posts.json');

export const getPost = (id) => sendRequest(devApiUrl + `/posts/${id}.json`);