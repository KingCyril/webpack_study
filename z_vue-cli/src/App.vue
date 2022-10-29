<template>
  <div>
    <h1>Hello App</h1>
    <ElButton type="primary" @click="handleClick">按钮</ElButton>
    <hr />
    <ul>
      <router-link class="mar" to="/home">Home</router-link>
      <router-link to="/About">About</router-link>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
import ElButton from "element-plus";
export default {
  name: "App",
  components: {
    ElButton,
  },
  setup() {
    function handleClick() {
      console.log("fetch begin");
      fetch(
        "https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city="
      )
        .then((response) => response.json())
        .then((data) => console.log("fetch end:", data));
    }

    return {
      handleClick,
    };
  },
};
</script>

<style>
h1 {
  color: pink;
}
.mar {
  margin-right: 20px;
}
</style>