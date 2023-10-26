export const removeNullData = (object: object) => {
    Object.keys(object).forEach(key => {
        if(object[key] === null) delete object[key]
    })
    return object
}

export const updateNestedObjectParser = (object: object) => {
    const finalObject = {}
    Object.keys(object).forEach(key => {
        if(typeof object[key] === 'object' && !Array.isArray(object[key])){
            const response = updateNestedObjectParser(object[key])
            Object.keys(response).forEach(key2 => {
                finalObject[`${key}.${key2}`] = response[key2]
            })
        }
    })
    return finalObject
}