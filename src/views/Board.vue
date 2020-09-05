<template>
  <div>
    <div id="editor">
      <h2
        id="init_head"
        class="init_head"
        contenteditable="true"
        data-text="Untitled"
        autofocus
        @paste="autoSave"
        @input="autoSave"
      ></h2>
    </div>
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
              level: 6,
              text: "<mark class ='cdx-marker'>Guide/</mark>",
            },
            type: "header",
          },
          {
            data: {
              items: [
                "<mark class ='cdx-marker'><b>Click anywhere to add content</b></mark>",
                "<mark class ='cdx-marker'><b>Hit tab for block types</b></mark>",
                "<mark class ='cdx-marker'><b>Saved automatically on typing! </b></mark>",
                "<mark class ='cdx-marker'><b>Ctrl/Cmd + S to force save</b></mark>",
              ],
              style: "ordered",
            },
            type: "list",
          },
        ],
        version: "2.18.0",
      };
      if (this.boards.find((el) => el.key === this.$route.params._slug)) {
        return {
          data: this.boards.find((el) => el.key === this.$route.params._slug)
            .data,
          meta: this.boards.find((el) => el.key === this.$route.params._slug)
            .meta,
        };
      } else {
        return {
          data: tempdata,
          meta: {
            name: "Untitled",
          },
        };
      }
    },
    boardMeta() {
      return { name: this.boardData.meta.name };
    },
    /*  giveEndpoint() {}, */
  },
  metaInfo() {
    return {
      title: this.boardMeta.name,
    };
  },
  methods: {
    autoSave() {
      this.upStatus = "updating";
      this.$store.commit("setBoard", {
        id: this.$route.params._slug,
        status: this.upStatus,
      });
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.editor.save().then((data) => {
          const head = document.getElementById("init_head");
          this.boardMeta.name = data.blocks[0].data.text;
          db.ref(
            `/Users/${this.user.data.uid}/Boards/${this.$route.params._slug}`
          )
            .update({
              meta: {
                name: head.innerText,
                stamp: Date.now(),
              },
              data: data,
            })
            .then(() => {
              this.isSaved = true;
              this.upStatus = "updated";
              this.$store.commit("setBoard", {
                id: this.$route.params._slug,
                status: this.upStatus,
              });
            });
        });
      }, 1000);
    },
  },
  created() {
    this.editor = new EditorJS({
      autofocus: true,
      holder: "editor",
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
            endpoint: endpoint /* "http://localhost:3000/get-preview" */, // Your backend endpoint for url data fetching
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
      data: this.boardData.data,
      logLevel: "ERROR",
      onChange: () => {
        this.autoSave();
      },
    });

    if (this.boards.find((el) => el.key === this.$route.params._slug)) {
      this.isSaved = true;
      this.upStatus = "updated";
      this.$store.commit("setBoard", {
        id: this.$route.params._slug,
        status: this.upStatus,
      });
    } else {
      this.$store.commit("setBoard", {
        id: this.$route.params._slug,
        status: "init",
      });
    }
  },
  mounted() {
    const head = document.getElementById("init_head");
    head.innerHTML = this.boardData.meta.name;
    this._keyListener = function(e) {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.autoSave();
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this._keyListener);
  },
};
</script>

<style lang="scss" scoped></style>
