export interface ITemplateResult {
    id: string
    width: number
    height: number
    description: string
    layers: ILayer[]
    previews: string[]
}

export interface ILayer {
    id: string
    type: string
    parameters: string[]
}