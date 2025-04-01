
// main.ts 에서 이 파일을 import 해야 동작이 준비된다.
import axios from "axios";
import { ipcMain } from "electron";
import { Post } from "./types";

// renderer 에서 "get-posts" 를 invoke 하면 실행할 함수 등록
ipcMain.handle("get-posts", async()=>{
    const response = await axios.get<Post[]>("http://localhost:9000/v1/posts");
    // 여기서 리턴해주는 responds.date 는 Post[] type 이다.
    return response.data;
});

// async 함수의 매개변수(_event, 전달한 데이터)
ipcMain.handle("add-post", async(_event, newPost)=>{
    const response = await axios.post<Post>("http://localhost:9000/v1/posts", newPost);
    return response.data;
});

ipcMain.handle("delete-post", async(_event, id)=>{
    const response = await axios.delete<Post>("http://localhost:9000/v1/posts/"+id);
    return response.data;
});

