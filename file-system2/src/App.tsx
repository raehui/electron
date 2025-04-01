import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useRef } from 'react'

// 타입 스크립트 지원
declare global {
  // api 의 type 을 미리 정의하고
  type ApiType = {
    save: (a: string) => void,
    load: () => void,
    // ???
    onLoad: (callback: (a: string) => void) => void,
    load2: () => Promise<string>, // 문자 데이터를 담고 있는 Promise 객체를 리턴하는 함수
    load3: () => Promise<string>,
    onSave: (callback: () => string) => void
  }

  interface Window {
    api: ApiType // 정의된 type 을 사용하기
  }
}

function App() {
  // callback 함수로 특정 시점에 동작된다.
  useEffect(() => {
    // 함수를 call 하면서 함수를 전달
    window.api.onLoad((content) => {
      // 전달 받은 내용을 textarea value 값으로 넣어주기
      areaRef.current!.value = content;
    });

    window.api.onSave(()=>{
      // 이 함수가 만일 호출되면 현재까지 입력한 문자열를 리턴해준다.
      return areaRef.current!.value;
    });
  }, [])

  const areaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className='container'>
      <h1>Memo App</h1>
      <textarea ref={areaRef} className='form-control mb-2' style={{ height: "300px" }}></textarea>
      <button className='btn btn-success me-2' onClick={() => {
        // 입력한 내용
        const content = areaRef.current!.value;
        // api 를 이용해서 저장하기
        window.api.save(content);

      }}>저장</button>
      <button className='btn btn-primary me-2' onClick={() => {
        window.api.load();
      }}>불러오기</button>

      {/* 요청과 동시에 응답을 받아오겠음 / 비동기와 invoke, handle */}
      <button className='btn btn-info me-2' onClick={async () => {
        // Promise 객체를 이용해서 저장된 문자열을 읽어온다.
        const content = await window.api.load2();
        areaRef.current!.value = content;
      }}>불러오기2</button>

      <button className='btn btn-info ' onClick={async () => {
        // Promise 객체를 이용해서 저장된 문자열을 읽어온다.
        const content = await window.api.load3();
        areaRef.current!.value = content;
      }}>불러오기3</button>

    </div>
  )
}

export default App
