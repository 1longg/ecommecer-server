export const selectData = (data: string[]) => {
    return Object.fromEntries(data.map(item => [item, 1]))
}
export const unSelectData = (data: string[]) => {
    console.log(data)
    return Object.fromEntries(data.map(item => [item, 0]))
}