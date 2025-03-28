"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // 함수 안에 함수를 전달 받음
  onMessage: (callback) => {
    electron.ipcRenderer.on("ping", (_event, message) => callback(message));
  }
});
