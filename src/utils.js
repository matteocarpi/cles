/* eslint-disable import/prefer-default-export */
export const stripHTML = string => string.replace(/(<([^>]+)>)/gi, '')
