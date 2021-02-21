import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';
import parts from '../Parts/Parts';
import {} from '../middlewares';
import { LinkData, NodeData } from '../customtypes';
import _ from 'lodash';

const initializers = (() => {
    let diagram: go.Diagram;
    const $ = go.GraphObject.make;

    const getTemplates = () => [
        {
            category: 'Start new Flow',
            template: parts.addTools(diagram, parts.getMessageBox('msg', 'opt1', 'opt2')),
        },
        {
            category: 'Action',
            template: parts.addTools(diagram, parts.getActionBox()),
        },
        {
            category: 'Send Message',
            template: parts.addTools(diagram, parts.getPlainMessageBox('msg2')),
        },
    ];

    const initDiagram = () => {
        diagram = $(
            go.Diagram,
            // "myDiagramDiv",
            {
                allowDrop: true,
                'undoManager.isEnabled': true, // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
                model: $(go.GraphLinksModel, {
                    linkFromPortIdProperty: 'fromPort', // required information:
                    linkToPortIdProperty: 'toPort',
                    linkKeyProperty: 'key',
                }),
            },
        );

        getTemplates().forEach((x) => diagram.nodeTemplateMap.add(x.category, x.template));

        diagram.commandHandler.canCopySelection();
        diagram.commandHandler.canDeleteSelection();
        diagram.commandHandler.canDeleteSelection();

        diagram.nodeTemplate = parts.addTools(diagram, parts.getPlainMessageBox('msg2'));
        diagram.undoManager.isEnabled = true;

        diagram.linkTemplate = $(
            go.Link,
            { curve: go.Link.Bezier, relinkableFrom: true, relinkableTo: true }, // Bezier curve
            $(go.Shape),
            $(go.Shape, { toArrow: 'Standard' }),
        );
        return diagram;
    };

    const getIconTemplate = (item: { category: string; borderColor: string; source: string }) => ({
        category: item.category,
        template: $(
            go.Node,
            'Auto',
            $(go.Shape, 'RoundedRectangle', {
                fill: 'white',
                strokeDashArray: [3, 2],
                stroke: item.borderColor,
                width: 100,
                height: 20,
                strokeWidth: 3,
            }),
            $(
                go.Panel,
                'Horizontal',
                $(go.Picture, { source: item.source }),
                $(go.TextBlock, item.category, { font: '5pt' }),
            ),
        ),
    });

    const initPalette = () => {
        const palette = $(go.Palette, {
            // customize the GridLayout to align the centers of the locationObjects
            layout: $(go.GridLayout, { alignment: go.GridLayout.Location }),
        });

        const paletteItems: { category: string; borderColor: string; source: string }[] = [
            { category: 'Start new Flow', borderColor: 'green', source: './img/startFlow.png' },
            { category: 'Action', borderColor: 'yellow', source: './img/startFlow.png' },
            { category: 'Send Message', borderColor: 'grey', source: './img/startFlow.png' },
        ];

        // the Palette's node template is different from the main Diagram's
        paletteItems.forEach((x) =>
            palette.nodeTemplateMap.add(getIconTemplate(x).category, getIconTemplate(x).template),
        );

        palette.nodeTemplate = $(
            go.Node,
            'Vertical',
            { locationObjectName: 'TB', locationSpot: go.Spot.Center },
            $(go.Shape, { width: 20, height: 20, fill: 'white' }, new go.Binding('fill', 'color')),
            $(go.TextBlock, { name: 'TB' }, new go.Binding('text', 'color')),
        );
        return palette;
    };

    return {
        initDiagram,
        initPalette,
        toJson: () => diagram.model.toJson(),
    };
})();

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */

const FlowChart = ({
    nodeDataArray,
    linkDataArray,
    message,
    save,
    get,
}: {
    nodeDataArray: Array<NodeData>;
    linkDataArray: Array<LinkData>;
    message: string | null | undefined;
    save: Function;
    get: Function;
}) => {
    const useMemoCompare = (value: any, compare: Function) => {
        const previousRef = useRef();
        const previous = previousRef.current;
        const isEqual = compare(previous, value);
        useEffect(() => {
            if (!isEqual) {
                previousRef.current = value;
            }
        });
        return isEqual ? previous : value;
    };

    const theNodeDataArray = useMemoCompare(
        nodeDataArray,
        (prev: Array<NodeData>) => prev && _.isEqual(prev, nodeDataArray),
    );

    const getDiagram = async () => {
        const json = await get();
        return json;
    };

    useEffect(() => {
        getDiagram(); // eslint-disable-next-line
    }, [theNodeDataArray]);

    const handleModelChange = (changes: any) => {
        const jsonStr = initializers.toJson();
        save(jsonStr);
    };
    return (
        <div>
            <span className="diagram-span">
                <ReactDiagram
                    initDiagram={initializers.initDiagram}
                    divClassName="diagram-component"
                    skipsDiagramUpdate={true}
                    linkDataArray={linkDataArray}
                    nodeDataArray={(() => {
                        console.log(theNodeDataArray);
                        return theNodeDataArray;
                    })()}
                    onModelChange={handleModelChange}
                />
            </span>
            <span className="palette-span">
                <ReactPalette
                    initPalette={initializers.initPalette}
                    divClassName="palette-component"
                    nodeDataArray={[
                        { key: 1, category: 'Start new Flow' },

                        { key: 2, category: 'Action' },
                        { key: 3, category: 'Send Message' },
                    ]}
                />
            </span>
        </div>
    );
};
export default FlowChart;
