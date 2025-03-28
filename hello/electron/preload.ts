import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
  // 함수 안에 함수를 전달 받음
  onMessage : (callback : (msg: string)=> void) =>{
    ipcRenderer.on("ping", (_event, message)=> callback(message));
  }
})
