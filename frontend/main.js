/*
 * meow, quick screen recorder to gif
 *
 * https://github.com/rohanrhu/meow
 *
 * Licensed under MIT
 * Copyright (C) 2022, Oğuzhan Eroğlu (https://oguzhaneroglu.com/) <rohanrhu2@gmail.com>
 *
 */

const { Meow } = require('./components/Meow/Meow.js');

const MEOW = {};
window.MEOW = MEOW;
MEOW.components = {};

/** @type {Meow} */
MEOW.components.meow = null;

window.addEventListener('DOMContentLoaded', (ev) => {
    MEOW.components.meow = new Meow(document.getElementById('meow'));
});