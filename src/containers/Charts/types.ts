export interface Config {
    chartType:string,
    label: string,
    title: string
}

export interface State {
    blokchain: Array<string>;
}


export interface EventTarget {
    target: {
        value:string;
    }
}