import { ipcRenderer, contextBridge } from 'electron'

// 여기는 renderer 프로세스 = 화면 구성하는 프로세스
// App.tsx 에서 window.api.onLoad 와 같은 코드를 사용하게 해줌
contextBridge.exposeInMainWorld('api', {  
  // widow.api.save()
  save:(content:string)=>{
    console.log("save!");
    // main 프로세스에 이벤트를 발생시키면서 저장할 문자열을 전달한다.
    ipcRenderer.send("saveMemo",content);
    
  },
  load:()=>{
    ipcRenderer.send("loadMemo");
  },
  onLoad:(callback:(a:string)=>void)=>{
    // 이 이벤트는 여기에 실행의 흐림이 와야 등록이 된다.
    ipcRenderer.on("loaded", (_event, content)=>{
      callback(content); // textarea  에 입력한 내용

    });
  },
  // 비동기 처리
  // invoke 은 작업을 하고 바로 받아올 수 있다. + handle(주목)
  load2:()=> {
    return ipcRenderer.invoke("loadMemo2");
  },

  load3:() => ipcRenderer.invoke("loadMemo3"),
  onSave: (callback: ()=> string)=>{
    ipcRenderer.on("saveContent", (_event, data)=>{
      // 현재까지 입력한 문자열 읽어오기
      // callback 함수로 저장된 내용 불러오기
      const content = callback();
      // 콘솔에 출력하기
      console.log("현재까지 입력한 문자열: "+content);
      data.content = content;
      // main 프로세스 이벤트 발생 시키면서 전달하기
      ipcRenderer.send("saveContent", data);
    })
  }
  
})
