import _ from "lodash"

export const getInfoData = (field: Array<string> = [], object: object = {}) => {
    return _.pick(object, field)
}