import { JSDOM } from "jsdom";

const jsdom = new JSDOM(`<body></body>`);
/* eslint-disable no-undef */
global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
