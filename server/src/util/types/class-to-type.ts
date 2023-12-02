/* eslint-disable */
type NonMethodKeys<T> = {
    [P in keyof T]: T[P] extends Function ? never : P
}[keyof T]
export type NonMethods<T> = Pick<T, NonMethodKeys<T>>
