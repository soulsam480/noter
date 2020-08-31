<template>
  <div class="container-fluid">
    <br />
    <button
      :hidden="!isSaved"
      class="btn btn-sm btn-danger"
      @click="deleteBoard"
    >
      Delete
    </button>
    <div id="editor" @keydown.ctrl.enter="setData"></div>
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
      isSaved: false,
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
              text: "Title",
            },
            type: "header",
          },
          {
            data: {
              level: 6,
              text: "Add more content by clicking wherever you want!!",
            },
            type: "header",
          },
          {
            data: {
              level: 6,
              text: "Save changes ctrl/cmd + enter",
            },
            type: "header",
          },
        ],
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
    setData() {
      this.editor.save().then((data) => {
        console.log(data);
        db.ref(
          `/Users/${this.user.data.uid}/Boards/${this.$route.params._slug}`
        )
          .set({
            meta: {
              name: data.blocks[0].data.text,
            },
            data: data,
          })
          .then(() => {});
      });
    },
    deleteBoard() {
      db.ref(`/Users/${this.user.data.uid}/Boards/${this.$route.params._slug}`)
        .remove()
        .then(() => {
          this.$router.replace({ path: "/boards" });
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
          config: {
            placeholder: "Add a list!",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
          config: {
            placeholder: "Add a checklist !",
          },
        },

        code: {
          class: CodeTool,
          shortcut: "CMD+SHIFT+C",
          config: {
            placeholder: "Add a code block!",
          },
        },
        linkTool: Link,
      },
      data: this.boardData,
    });
    if (this.boards.find((el) => el.key === this.$route.params._slug)) {
      this.isSaved = true;
    }
  },
};
</script>

<style lang="scss" scoped></style>
