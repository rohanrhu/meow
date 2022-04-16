/*
 * meow, quick screen recorder to gif
 *
 * https://github.com/rohanrhu/meow
 *
 * Licensed under MIT
 * Copyright (C) 2022, Oğuzhan Eroğlu (https://oguzhaneroglu.com/) <rohanrhu2@gmail.com>
 *
 */

const { ipcRenderer } = require('electron');

const { Component } = require('../Component.js');

class Meow extends Component {
    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        super(element);

        this.elRecordBtn = this.element.getElementsByClassName('Meow_frame_recordBtn')[0];
        this.once(this.elRecordBtn, 'click', (event) => {
            event.stopPropagation();
            this.startRecording();
        });
    }

    startRecording() {
        console.log('startRecording()');
        ipcRenderer.send('startRecording');
    }
    
    stopRecording() {
        console.log('stopRecording()');
    }
}

module.exports = {
    Meow,
    default: Meow
};