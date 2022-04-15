/*
 * meow, quick screen recorder to gif
 *
 * https://github.com/rohanrhu/meow
 *
 * Licensed under MIT
 * Copyright (C) 2022, Oğuzhan Eroğlu (https://oguzhaneroglu.com/) <rohanrhu2@gmail.com>
 *
 */

/**
 * @typedef {Map<string, EventListenerOrEventListenerObject>} ComponentElementSingleEventHandlers
 * @typedef {Map<HTMLElement, ComponentElementSingleEventHandlers>} ComponentSingleEvents
 */

class Component {
    constructor(element) {
        /** @type {HTMLElement} */
        this.element = element;

        /** @type {ComponentSingleEvents} */
        this.single_events = new WeakMap();
    }

    /**
     * @param {HTMLElement} element
     * @param {string} event_name
     * @param {EventListenerOrEventListenerObject} handler
     */
    once(element, event_name, handler) {
        if (!this.single_events.has(element))
            this.single_events.set(element, new Map());

        if (this.single_events.get(element).has(event_name)) {
            element.removeEventListener('click', this.single_events.get(element).get(event_name));
            this.single_events.get(element).delete(event_name);
        }

        this.single_events.get(element).set(event_name, handler);
        element.addEventListener('click', handler);
    }
}

module.exports = {
    Component
};