/* eslint-disable import/prefer-default-export */
export const stripHTML = string => string.replace(/(<([^>]+)>)/gi, '')

export const searchInText = (string, input) =>
  string.toLowerCase().includes(input)

export const searchMultiFields = (fields = [], input) => {
  const fullString = fields.join('')

  return searchInText(fullString, input)
}
