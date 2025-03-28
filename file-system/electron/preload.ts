import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
  save: (content: string) => {

    ipcRenderer.send("saveMemo", content);
    
  }
})
