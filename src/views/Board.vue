<template>
  <div>
    <br />
    <button
      :hidden="!isSaved"
      class="btn btn-sm btn-danger"
      @click="deleteBoard"
    >
      Delete
    </button>
    <span class="float-right">
      <span class="upstatus" style="color:green" v-if="upStatus === 'updated'">
        ✓ Updated</span
      >
      <span class="upstatus" v-if="upStatus === 'updating'">Updating</span>
    </span>
    <div @input="autoSave" id="editor" @keyup.ctrl.enter="autoSave"></div>
  </div>
</template>

<script>
import endpoint from "../miscred/prelink";
import { db } from "../firebase/index";
import EditorJS from "@editorjs/editorjs";
import { mapGetters } from "vuex";
const Checklist = require("@editorjs/checklist");
const Header = require("@editorjs/header");
const Link = require("@editorjs/link");
const List = require("@editorjs/list");
const CodeTool = require("@editorjs/code");
const InlineCode = require("@editorjs/inline-code");
const Table = require("@editorjs/table");
const Embed = require("@editorjs/embed");
const Quote = require("@editorjs/quote");
const Marker = require("@editorjs/marker");
export default {
  name: "Board",
  data() {
    return {
      editor: null,
      isSaved: false,
      timeout: null,
      upStatus: "",
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
              text:
                "<mark class ='cdx-marker'>Add more content by clicking wherever you want!! </mark>",
            },
            type: "header",
          },
          {
            data: {
              level: 5,
              text:
                "<mark class='cdx-marker'>Data is saved automatically. ctrl/cmd + enter to force save</mark>",
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
    boardMeta() {
      return { name: this.boardData.blocks[0].data.text };
    },
  },
  metaInfo() {
    return {
      title: `Board ${this.boardMeta.name}`,
    };
  },
  methods: {
    autoSave() {
      this.upStatus = "updating";
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.editor.save().then((data) => {
          this.boardMeta.name = data.blocks[0].data.text;
          db.ref(
            `/Users/${this.user.data.uid}/Boards/${this.$route.params._slug}`
          )
            .set({
              meta: {
                name: data.blocks[0].data.text,
              },
              data: data,
            })
            .then(() => {
              this.upStatus = "updated";
            });
        });
      }, 3000);
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
        linkTool: {
          class: Link,
          config: {
            endpoint: endpoint, // Your backend endpoint for url data fetching
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        embed: Embed,
        quote: Quote,
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
      },
      data: this.boardData,
      logLevel: "ERROR",
    });
    if (this.boards.find((el) => el.key === this.$route.params._slug)) {
      this.isSaved = true;
      this.upStatus = "updated";
    }
  },
};
</script>

<style lang="scss" scoped></style>
