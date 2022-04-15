/*
 * meow, quick screen recorder to gif
 *
 * https://github.com/rohanrhu/meow
 *
 * Licensed under MIT
 * Copyright (C) 2022, Oğuzhan Eroğlu (https://oguzhaneroglu.com/) <rohanrhu2@gmail.com>
 *
 */

const util = require('util');
const path = require('path');
const fs = require('fs');
const { execFile, spawn, ChildProcess } = require('child_process');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');

/** @type {BrowserWindow} */
var win;

/** @type {ChildProcess} */
var recProc = null;

var is_recording = false;

var temp_gif_path = path.resolve(path.join(__dirname, '.meow.gif'));

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        transparent: true,
        frame: false,
        center: true,
        icon: path.resolve(path.join(__dirname, 'assets/meow.png')),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('frontend/main.html');
};

const startRecording = () => {
    console.log('startRecording()');

    recProc = execFile(path.resolve(path.join(__dirname, 'bin/ffmpeg')), [
        '-f',
        'gdigrab',
        '-framerate',
        '15',
        '-offset_x',
        win.getPosition()[0],
        '-offset_y',
        win.getPosition()[1],
        '-video_size',
        win.getSize().join('x'),
        '-show_region',
        '1',
        '-i',
        'desktop',
        '-filter_complex',
        '[0:v] fps=15,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1',
        temp_gif_path,
        '-y'
    ]);

    is_recording = true;

    recProc.on('exit', (code, signal) => {
        const save_path = dialog.showSaveDialogSync(win, {
            title: 'Save GIF to',
            filters: [{name: 'GIF', extensions: ['gif']}]
        });

        if (save_path) {
            fs.copyFileSync(temp_gif_path, save_path);
            spawn('explorer.exe', ['/select,', save_path], {
                detached: true,
                stdio: ['ignore']
            });
        }

        fs.unlinkSync(temp_gif_path);

        recProc.kill('SIGTERM');
        win.focus();
    });

    win.minimize();
};

const stopRecording = () => {
    is_recording = false;
    recProc.kill('SIGKILL');
};

ipcMain.on('startRecording', (event) => {
    startRecording();
});

app.whenReady().then(() => {
    createWindow();

    win.on('focus', () => {
        if (!is_recording)
            return;

        stopRecording();
    });
});