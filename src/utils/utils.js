export const getImageUrl = (path) => {
    return new URL(`../assets/${path}`, import.meta.url).href;
}

export const pageCalculator = (totalCount, limit) => {
    const lastPage = Math.ceil(totalCount / limit) -1

    const arr = []
    for (let i = 2; i < lastPage; i++) {
        arr.push(i)
    }
    arr.push(lastPage)

    return arr

}