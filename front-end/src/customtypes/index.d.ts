export type State = {
    router: any;
    exchangeRates: ExchangeRates;
    diagram: Diagram;
};

export type ExchangeRates = {
    rates: Array<Rate>;
    fetchState: { inFlight: boolean };
    message?: string | null;
    error?: string | null;
};

export type Diagram = {
    nodeDataArray: Array<NodeData>;
    linkDataArray: Array<LinkData>;
    fetchState: { inFlight: boolean };
    message?: string | null;
    error?: string | null;
};

export type NodeData = { key: number; category: string; msg?: string; opt1?: string; opt2?: string; msg2?: string };
export type LinkData = { from: number; to: number; fromPort: string; toPort: string; key: number };

export type Rate = {
    localId?: number;
    id?: number;
    currency: string;
    code: string;
    rate: number;
    inFlight?: boolean;
    status?: string;
};
