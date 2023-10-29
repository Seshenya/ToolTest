export type Developer = Record<string, DeveloperData>

export type DeveloperData = {
    name: string,
    role: string,
    resume: string,
    github: string,
    description: string,
    skills: string[],
    contact: {
        mail: string,
    },
    image: string
}