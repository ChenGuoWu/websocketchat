<!--
 * @Author: guowu
 * @Date: 2021-04-07 10:36:07
 * @LastEditTime: 2021-04-09 12:54:29
-->
<template>
  <div class="home">
    <el-upload :http-request="uploadRequest" action="" :show-file-list="false">
      <el-button size="small" type="primary">上传头像</el-button>
    </el-upload>
    <div class="home_input">
      <el-input v-model="input" placeholder="请输入内容"></el-input
      ><el-button type="primary" @click="submit" class="home_btn"
        >点击发送</el-button
      >
    </div>
    <div class="content">
      <div
        v-for="item in msgList"
        :key="item.id"
        :class="[item.username == username ? 'ceshi' : '']"
      >
        <div>
          <img :src="item.url" />
          {{ item.username }}---------- {{ item.time }}
          <div class="content_show">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 实例websocket
import { mapState } from "vuex";
const ws = new WebSocket("ws://10.48.202.34:8888");
export default {
  name: "Home",
  data() {
    return {
      input: "",
      msgList: [],
      url: "",
    };
  },
  computed: {
    ...mapState("user", ["username"]),
  },
  mounted() {
    let that = this;
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        that.submit();
      }
    });
    ws.addEventListener("open", this.handlewsOpen.bind(this));
    ws.addEventListener("close", this.handlewsClose.bind(this));
    ws.addEventListener("error", this.handlewsError.bind(this));
    ws.addEventListener("message", this.handlewsMessage.bind(this));
  },
  components: {},
  methods: {
    //排序处理
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    //数据处理同步url
    urlandle(date) {
      let res = [];
      //取出username分类的数组
      let usernameList = [
        ...Array.from(new Set(date.map((item) => item.username))),
      ];
      console.log(usernameList);
      usernameList.forEach((item) => {
        let temp = date.filter((item2) => {
          return item2.username == item;
        });
        let url;
        for (let i = temp.length - 1; i >= 0; i--) {
          if (
            temp[i].url !=
            "https://img0.baidu.com/it/u=613519496,878879917&fm=26&fmt=auto&gp=0.jpg"
          ) {
            console.log(temp[i].url);
            url = temp[i].url;
            break;
          }
        }
        console.log(url);
        temp.map((item) => {
          if (url) {
            item.url = url;
          }
        });
        res = res.concat(temp);
      });
      console.log(res);
      let sortRes = res
        .map(item => {
          item.time = new Date(item.time).getTime();
          return item;
        })
        .sort(this.compare("time"));
        let newRes=sortRes.map(item=>{
          item.time=new Date(item.time).dateFormat("yyyy/mm/dd hh:ff:ss");
          return item;
        })
      return newRes;
    },
    uploadRequest(params) {
      //废弃方案 需要数据库 ws.send(params.file); 改为转为base64 一起发送
      const reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result;
        console.log(this.url);
      };
      reader.readAsDataURL(params.file);
    },
    handlewsOpen(e) {
      console.log("open", e);
      console.log(ws.readyState);
    },
    handlewsClose(e) {
      console.log("close", e);
    },
    handlewsError(e) {
      console.log("error", e);
    },
    //接受服务端的信息
    handlewsMessage(e) {
      console.log("message", e);
      if (typeof e.data == "string") {
        if (!(JSON.parse(e.data).username == this.username)) {
          this.$message('您有一条新消息');
     
        }
        this.msgList.push(JSON.parse(e.data));
        this.msgList.map((item) => {
          item.url = item.url
            ? item.url
            : "https://img0.baidu.com/it/u=613519496,878879917&fm=26&fmt=auto&gp=0.jpg";
        });
        console.log(this.msgList);
        this.msgList = this.urlandle(this.msgList);
      }
      //废弃方案 需要数据库
      // if (e.data instanceof Blob) {
      //   this.url = window.URL.createObjectURL(e.data);
      // }
    },
    submit() {
      console.log(this.url);
      //send方法去发送
      ws.send(
        JSON.stringify({
          id: new Date().getTime(),
          content: this.input,
          username: this.username,
          time: new Date().dateFormat("yyyy/mm/dd hh:ff:ss"),
          url: this.url,
        })
      );
      this.input = "";
      this.url = "";
      //关闭连接
      // ws.close()
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 500px;
  width: 1000px;
  overflow-y: auto;
  border: 1px solid black;
  padding: 5px;
  .ceshi {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    > div {
      width: 45%;
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .content_show {
    text-indent: 50px;
    margin-top: 10px;
  }
}
.home_input {
  width: 30%;
  display: flex;
  margin-bottom: 30px;
}
</style>