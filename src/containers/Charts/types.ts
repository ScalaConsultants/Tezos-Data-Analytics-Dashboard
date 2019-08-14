export interface Config {
    chartType: string,
    label: string,
    title: string
}

export interface Block {
    source: number;
    timestamp: string;
    block_leve: number;
    amount: number;
    counter: number;
    destination: number;
    fee: number;
}

export interface Blockchain {
    blokchain: Array<Block>;
}


export interface EventTarget {
    target: {
        value: string;
    }
}

