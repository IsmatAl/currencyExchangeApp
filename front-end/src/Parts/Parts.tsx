import * as go from 'gojs';

const $ = go.GraphObject.make;

const getMessage = (propName: string) =>
    $(
        go.Panel,
        'Auto',
        {
            width: 100,
            minSize: new go.Size(NaN, 50),
            defaultStretch: go.GraphObject.Horizontal,
        },
        $(go.Shape, 'RoundedRectangle', {
            stroke: '#f1f0f0',
            fill: '#f1f0f0',
        }),
        $(
            go.TextBlock,
            'Click to add text',
            {
                editable: true,
                font: '10pt',
                alignment: go.Spot.TopLeft,
                margin: 3,
            },
            new go.Binding('text', propName).makeTwoWay(),
        ),
    );

const getPort = (from: boolean, to: boolean, portId: string, props: object = {}) =>
    $(go.Shape, 'Circle', {
        ...props,
        maxSize: new go.Size(10, 10),
        fromLinkable: from,

        toLinkable: to,
        toMaxLinks: 1,
        portId: portId,
        margin: 2,
        stroke: 'grey',
        fill: 'grey',
    }).copy();

const getOption = (propName: string, portId = 'out') =>
    $(
        go.Panel,
        'Auto',
        $(go.Shape, 'RoundedRectangle', {
            stroke: '#0f83ff',
            fill: 'transparent',
        }),
        $(
            go.Panel,
            'Horizontal',
            $(
                go.TextBlock,
                'Add an option',
                { stroke: '#0f83ff', editable: true },
                new go.Binding('text', propName).makeTwoWay(),
            ),
            getPort(true, false, portId),
        ),
    );

const getHeader = (color: string, headerTxt: string) =>
    $(go.TextBlock, headerTxt, {
        font: '10pt',
        alignment: go.Spot.TopLeft,
        stretch: go.GraphObject.Horizontal,
        background: color,
        toLinkable: true,
        portId: 'header',
        toSpot: go.Spot.Left,
    });

const getMessageBox = (msg: string, opt1: string, opt2: string) => {
    return $(
        go.Panel,
        'Auto',
        $(go.Shape, { stroke: '#eff2f6', fill: 'transparent' }),
        $(
            go.Panel,
            'Vertical',
            getHeader('#dfe6ed', 'Send Message'),
            $(
                go.Panel,
                'Table',
                { defaultAlignment: go.Spot.Left },
                $(go.RowColumnDefinition, { column: 0, width: 150 }),
                $(
                    go.Panel,
                    'Auto',
                    { row: 1, column: 0, alignment: go.Spot.Right, margin: new go.Margin(5, 5, 5, 0) },
                    getMessage(msg),
                ),
                $(
                    go.Panel,
                    'Auto',
                    { row: 2, column: 0, alignment: go.Spot.Right, margin: new go.Margin(5, 5, 5, 0) },
                    getOption(opt1, 'opt1'),
                ),
                $(
                    go.Panel,
                    'Auto',
                    { row: 3, column: 0, alignment: go.Spot.Right, margin: new go.Margin(5, 5, 5, 0) },
                    getOption(opt2, 'opt2'),
                ),
            ),
        ),
    );
};

const getActionBox = () =>
    $(
        go.Panel,
        'Auto',
        $(go.Shape, { stroke: '#ffe395', fill: 'transparent' }),
        $(
            go.Panel,
            'Vertical',
            getHeader('#fff7e2', 'Action'),
            $(
                go.Panel,
                'Table',
                { defaultAlignment: go.Spot.Left },
                $(go.RowColumnDefinition, { column: 0, width: 150 }),
                $(
                    go.Panel,
                    'Auto',
                    { row: 1, column: 0, alignment: go.Spot.Center, margin: new go.Margin(5, 5, 5, 5) },
                    // action content
                    $(
                        go.Panel,
                        'Vertical',

                        $(
                            go.Panel,
                            'Spot',
                            {
                                isClipping: true,
                            },
                            $(go.Shape, 'Circle', {
                                width: 30,
                                height: 30,
                                alignment: go.Spot.TopRight,
                                fill: 'red',
                            }),
                            $(go.Picture, './imgs/action.png', { width: 50, height: 50 }),
                        ), // not working
                        $(
                            go.Panel,
                            {
                                click: () => alert('Editing Action'),
                                cursor: 'pointer',
                                width: 120,
                                height: 30,
                            },
                            $(go.TextBlock, 'Click to edit in the sidebar', {
                                font: '1pt',
                                alignment: go.Spot.Center,
                                stroke: 'lightgrey',
                            }),
                        ),
                    ),
                ),
            ),
        ),
        getPort(true, false, 'out', {
            alignment: go.Spot.RightCenter,
        }),
    );

const getPlainMessageBox = (msg: string) => {
    return $(
        go.Panel,
        'Auto',
        $(go.Shape, { stroke: '#eff2f6', fill: 'transparent' }),
        $(
            go.Panel,
            'Vertical',
            getHeader('#dfe6ed', 'Send Message'),
            $(
                go.Panel,
                'Table',
                { defaultAlignment: go.Spot.Left },
                $(go.RowColumnDefinition, { column: 0, width: 150 }),
                $(
                    go.Panel,
                    'Auto',
                    { row: 1, column: 0, alignment: go.Spot.Right, margin: new go.Margin(25, 20, 25, 0) },
                    getMessage(msg),
                ),
            ),
        ),
    );
};

const addTools = (diagram: go.Diagram, box: go.Panel) =>
    $(go.Node, 'Auto', box, {
        // define a tooltip for each node
        toolTip: $(
            go.Adornment,
            'Spot',
            { background: 'transparent' },
            $(go.Placeholder),
            $(
                go.Panel,
                'Auto',
                {
                    alignment: go.Spot.TopLeft,
                    alignmentFocus: go.Spot.BottomLeft,
                },
                $(go.Shape, {
                    fill: 'lightblue',
                    stroke: 'lightgrey',
                }),
                $(
                    go.Panel,
                    'Horizontal',
                    { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.BottomLeft },
                    $(
                        'Button',
                        {
                            margin: 2,
                            click: () => {
                                diagram.commandHandler.copySelection();
                                diagram.commandHandler.pasteSelection();
                            },
                        },
                        $(go.TextBlock, 'Copy'),
                    ),
                    $(
                        'Button',
                        {
                            margin: 2,
                            click: () => {
                                diagram.commandHandler.deleteSelection();
                            },
                        },
                        $(go.TextBlock, 'Delete'),
                    ),
                ),
            ),
        ),
    });

export default {
    getMessageBox: (msg: string, opt1: string, opt2: string) => getMessageBox(msg, opt1, opt2),
    getMessage: (msg: string) => getMessage(msg),
    getOption: (optTxt: string, portId = 'out') => getOption(optTxt, portId),
    getActionBox: () => getActionBox(),
    getPort: (from: boolean, to: boolean, portId: string, props: object = {}) => getPort(from, to, portId, props),
    getPlainMessageBox: (msg: string) => getPlainMessageBox(msg),
    addTools: (diagram: go.Diagram, box: go.Panel) => addTools(diagram, box),
};
