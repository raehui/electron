"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  // 이 코드 전체는 Renderer 프로세스
  // api 로 부터 전달받은 함수가 여기에 전달된다. 
  onGreet: (callback) => {
    console.log("preload.ts 에 onGreet() 함수가 호출됨");
    electron.ipcRenderer.on("greet", (_event, msg) => {
      console.log("ipcRenderer 에 gteet 이벤트가 발생함");
      callback(msg);
    });
  },
  sendGreet: (msg) => {
    electron.ipcRenderer.send("greetFromReact", msg);
  }
});
