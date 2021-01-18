<template>
  <div class="container  ">
    <br />
    <br />
    <div
      class="row d-flex landing justify-content-center align-items-center py-5"
    >
      <div class="col-sm-6 text-center">
        <img class="landing_image" src="../assets/icon.png" alt="" />
      </div>
      <div class="col-sm-6 ">
        <h1>
          <b>Noter</b>
          <span class=" version">
            <a href="https://github.com/soulsam480/noter" target="_blank"
              ><u>v {{ version }}</u></a
            >
          </span>
        </h1>
        <h5 class="text-muted">
          Create notes/boards in multiple blocks in realtime sync with all your
          devices.
        </h5>
        <br />
        <h6>
          <button class="n-btn" data-toggle="modal" data-target="#loginModal">
            Login / Signup
          </button>
          to Explore
        </h6>
      </div>
    </div>
    <br />
    <br />

    <h2 class="text-center ">
      <b>Features</b>
    </h2>
    <br />
    <div class="row">
      <div class="col-lg-3">
        <p class="feat-heading text-center">
          <u>Fast</u>
        </p>
        <p>
          Noter is built with Vue, and it caches data after first visit. So when
          you come back it opens faster than ever.
        </p>
      </div>
      <div class="col-lg-3">
        <p class="feat-heading text-center">
          <u>Free</u>
        </p>
        <p>
          Noter is built with free services and will be free forever. This won't
          be monetized ever.
        </p>
      </div>
      <div class="col-lg-3">
        <p class="feat-heading text-center">
          <u>Open Source</u>
        </p>
        <p>
          The source code is hosted on github. Everything is
          <a href="https://github.com/soulsam480/noter" target="_blank"
            ><u>there</u>
          </a>
          if you need it.
        </p>
      </div>
      <div class="col-lg-3">
        <p class="feat-heading text-center">
          <u>Realtime</u>
        </p>
        <p>
          Noter uses Firebase Realtime Database, So everything is synced in
          realtime irrespective of your device.
        </p>
      </div>
    </div>
    <br />
    <br />
    <h2 class="text-center ">
      <b>In action</b>
    </h2>
    <br />
    <img class="noter-action" src="../assets/noter.gif" alt="noter action" />

    <br /><br />
    <h2 class="text-center ">
      <b>News</b>
    </h2>
    <br />
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <ul>
          <li>
            Download the experimental Desktop app for windows 10
            <a
              class="n-btn sm"
              href="https://github.com/soulsam480/noter/releases/download/v0.6.0.beta/Noter.Setup.0.5.0.exe"
              >here</a
            >
          </li>
        </ul>
      </div>
    </div>
    <br /><br /><br />
    <br />
    <footer class="text-center">
      <p>
        ©
        <a href="https://sambitsahoo.com" target="_blank"
          ><u>Sambit Sahoo</u></a
        >
        2021, MIT License
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      version: '',
    };
  },
  async mounted() {
    await fetch(
      ' https://api.github.com/repos/soulsam480/noter/releases/latest',
      {
        method: 'get',
      },
    )
      .then((res) => res.json())

      .then((dat) => {
        console.log(dat);
        this.version = dat.tag_name;
      });
  },
  components: {},
});
</script>
<style lang="scss" scoped>
a {
  color: black;
}
.version {
  padding-left: 10px;
  font-size: 40%;
  a {
    color: grey !important;
  }
}
.container {
  padding-bottom: 100px;
}
$main: #127e9a;
$border: #cccccc;
.main {
  color: $main;
}
.feat-heading {
  font-size: 20px;
  font-weight: bold;
  color: $main;
  margin-bottom: 10px;
  border-bottom: 1px solid $border;
  padding-bottom: 10px;
  & + p {
    line-height: 22px;
    padding: 0 20px;
    text-align: center;
  }
}
.landing {
  @media (max-width: 788px) {
    text-align: center;
    .col-sm-6:nth-child(2) {
      padding-top: 20px;
    }
  }
  .col-sm-6:nth-child(2) {
    h1 {
      font-size: 45px;
      color: $main;
    }
  }
}
.col-lg-3 {
  @media (min-width: 992px) {
    &:not(:last-child) {
      border-right: 1px solid $border;
    }
  }
}
.img {
  width: 20px;
  vertical-align: middle;
}
.landing_image {
  width: 250px;
}
.noter-action {
  width: 800px;
  max-width: 100%;
  display: block;
  text-align: center;
  margin: auto;
}
</style>
