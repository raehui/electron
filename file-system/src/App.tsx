
import { useEffect, useRef, useState } from 'react'
// bootstrap css 로딩
import "bootstrap/dist/css/bootstrap.css"

declare global {
  interface Window {
    api: {
      save: (content: string) => void,
      load: () => void,
      onLoad: (callback:(content:string) => void) => void
    }
  }
}

function App() {

  const areaRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState<string>("");
  useEffect(()=>{
    window.api.onLoad((savedContent:string)=>{
      setContent(savedContent);
    });
  },[])

  return (
    <div className="container">
      <h1>메모장 입니다.</h1>
      {/* onChange 의 함수 */}
      <textarea name="content" className='form-control mb-2' style={{height:"300px"}} ref={areaRef}></textarea>
      <button className='btn btn-success me-2' onClick={() => {
        // 입력한 문자열
        const content = areaRef.current?.value; 
        // ???
        window.api.save(content || "");
        alert("저장 했습니다!");
      }}>저장</button>
      <button className='btn btn-primary' onClick={()=>{
        window.api.load();
      }}>불러오기</button>
    </div>


  )
}

export default App
