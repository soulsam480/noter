<template>
  <div class="container-fluid">
    <p>Board</p>
    <button class="btn btn-info">
      get data
    </button>
    <div id="editor" @keydown.ctrl.enter="getData"></div>
  </div>
</template>

<script>
import { db } from "../firebase/index";
import EditorJS from "@editorjs/editorjs";
import { mapGetters } from "vuex";
const Checklist = require("@editorjs/checklist");
const Header = require("@editorjs/header");
const Link = require("@editorjs/link");
const List = require("@editorjs/list");
const CodeTool = require("@editorjs/code");
export default {
  name: "Board",
  data() {
    return {
      preData: null,
      editor: null,
    };
  },
  computed: {
    ...mapGetters({ user: "giveUser", boards: "boards" }),
    boardData() {
      const tempdata = {
        blocks: [
          {
            data: {
              level: 2,
              text: "This is another Heading",
            },
            type: "header",
          },
          {
            data: {
              text: "Add more content by clicking wherever you want!!",
            },
            type: "paragraph",
          },
        ],
        time: 1598655538181,
        version: "2.18.0",
      };
      if (this.boards.find((el) => el.key === this.$route.params._slug)) {
        return this.boards.find((el) => el.key === this.$route.params._slug)
          .data;
      } else {
        return tempdata;
      }
    },
  },
  methods: {
    getData() {
      this.editor.save().then((data) => {
        db.ref(
          `/Users/${this.user.data.uid}/Boards/${this.$route.params._slug}`
        )
          .set(data)
          .then(() => {
            console.log("yoyo");
          });
      });
    },
  },
  created() {
    this.editor = new EditorJS({
      holderId: "editor",
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
          config: {
            placeholder: "Header",
          },
          shortcut: "CMD+SHIFT+H",
        },
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L",
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        code: {
          class: CodeTool,
          shortcut: "CMD+SHIFT+C",
        },

        linkTool: Link,
      },
      data: this.boardData,
    });
  },
};
</script>

<style lang="scss" scoped></style>
