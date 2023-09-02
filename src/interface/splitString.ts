export const splitString = (string: string, separator: number) => {
    if (string.length > separator) {
        return `${string.split('').splice(0, separator).join('')}...`
    }
    else return string
}