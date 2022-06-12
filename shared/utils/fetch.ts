import { isServer, PORT } from '../constants/env';

type FetchContext = {
    basePath: string;
};

const context: FetchContext = {
    basePath: '',
};

const initializeFetch = (basePath: string) => {
    context.basePath = basePath;
};

const getFetchUrl = (url: string) => {
    if (isServer) {
        return url.startsWith('/') ? `http://localhost:${PORT}${url}` : url;
    }

    return url.startsWith('/') ? context.basePath + url : url;
};

const envAwareFetch = (url: string, options?: Partial<RequestInit>) => {
    const fetchUrl = getFetchUrl(url);
    return fetch(fetchUrl, options).then((res) =>
        res.text().then(function (text) {
            return text ? JSON.parse(text) : {};
        })
    );
};

export { envAwareFetch as fetch, initializeFetch };
