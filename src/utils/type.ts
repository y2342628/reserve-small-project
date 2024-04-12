const getType = (val:any) => Object.prototype.toString.call(val).slice(8, -1)

export const isString = (val:any) => getType(val) === 'String'

export const isNumber = (val:any) => getType(val) === 'Number'

export const isArray = (val:any) => Array.isArray(val)

export const isObject = (val:any) => getType(val) === 'Object'

export const isBoolean = (val:any) => getType(val) === 'Boolean'

export const isFunction = (val:any) => getType(val) === 'Function'

export const isNull = (val:any) => val === null

export const isUnderfined = (val:any) => val === undefined

export const isEmpty = (val:any) => isNull(val) || isUnderfined(val)

// 是否箭头函数
export const isArrowFunction = (fun:any) => fun.prototype === undefined

export const isEmptyObject = (val:any) =>
  isObject(val) && Object.keys(val).length === 0
