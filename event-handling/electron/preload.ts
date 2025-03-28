import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('api', {
  // 이 코드 전체는 Renderer 프로세스
  // api 로 부터 전달받은 함수가 여기에 전달된다. 
  onGreet: (callback: (msg: string) => void) => {
    console.log("preload.ts 에 onGreet() 함수가 호출됨");
    // greet 이라는 이벤트가 발생해야 callback 실행되고 electron 에서 msg 가 전달되고
    // mian 프로세스에서 발생하는 이벤트에 귀 기울이기
    ipcRenderer.on("greet", (_event, msg) => {
      console.log("ipcRenderer 에 gteet 이벤트가 발생함");
      callback(msg);
    });
  },
  sendGreet : (msg:string) =>{
    // renderer 프로세스에서 "greetFromReact" 이벤트 발생 시키면서 문자열 전달
    // 이벤트 발생 시키기
    ipcRenderer.send("greetFromReact", msg);
  }
})
