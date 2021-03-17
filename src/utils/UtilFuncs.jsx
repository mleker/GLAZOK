export const debounce = (fn, ms) => {
    let timer;
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

export const replaceSpacesWithUnderscore = (text) => text.replace(/ /g, "_");