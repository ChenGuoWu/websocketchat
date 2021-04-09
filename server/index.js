/*
 * @Author: guowu
 * @Date: 2021-04-07 14:09:45
 * @LastEditTime: 2021-04-07 17:05:18
 */
const Ws=require('ws');
((Ws)=>{
    //实例化ws下的serve
    const server=new Ws.Server({port:8888})
    const init=()=>{
        bindEvent()
    }
    let bindEvent=()=>{
       
        server.on('open',handleOpen)
        server.on('close',handleClose)
        server.on('error',handleError)
        //后端多一个connection事件
        server.on('connection',handleConnection)
    }
    let handleOpen=()=>{
        console.log('open')
    };
    let handleClose=()=>{
        console.log('close')
    };
    let handleError=()=>{
        console.log('error')
    };
    let handleConnection=(ws)=>{
        console.log('connection')
        //message事件在connection里监听
        ws.on('message',handleMessage)
    };
    let handleMessage=(date)=>{
        //server.clients可拿到所有客户端链接
        console.log(date)
        server.clients.forEach(item=>{
            //发送数据给所有客户端
            item.send(date)
        })
    }
    init();
})(Ws);