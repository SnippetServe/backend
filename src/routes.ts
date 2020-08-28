import {post} from "./controller/Post";
import {put} from "./controller/Put";
import {delet} from "./controller/Delete";
import {get} from './controller/Get'


//sample routes
export const AppRoutes = [
    {
        path: "/get",
        method: "get",
        action: get
    },
    {
        path: "/post",
        method: "post",
        action: post
    },
    {
        path: "/put",
        method: "put",
        action: put
    },
    {
      path: "/delete",
      method: "delete",
      action: delet
  }
];