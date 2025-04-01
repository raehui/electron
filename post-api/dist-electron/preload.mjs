"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  // main process 에 get-posts 요청을 한다.
  // invoke 은 promise 을 리턴
  getPosts: () => electron.ipcRenderer.invoke("get-posts"),
  // main process 에 add-post 요청을 하면 매개변수에 전달된 추가할 글정보를 전달한다.
  addPost: (newPost) => electron.ipcRenderer.invoke("add-post", newPost),
  deletePost: (id) => electron.ipcRenderer.invoke("delete-post", id)
});
