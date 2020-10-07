<template>
  <div>
    <VEmojiPicker v-if="isCover" @select="selectEmoji" />
    <Tooltip :dat="dat" v-if="isTooltip" />
    <!--     main editor container
 -->
    <div class="board-cover" :style="coverBg"></div>
    <div id="editor">
      <button class="n-btn board-cover-change" @click="getgrad">
        Change Cover
      </button>
      <h1 class="board-icon" id="init_cover">
        <span
          @click="togEmoji"
          @mouseenter="showTooltip($event, 'Change Icon')"
          @mouseleave="isTooltip = false"
        >
          {{ boardData.meta.cover }}
        </span>
      </h1>
      <h2
        id="init_head"
        class="init_head"
        contenteditable="true"
        data-text="Untitled"
        @paste="autoSave"
        @input="autoSave"
        @mouseenter="showTooltip($event, 'Change Title')"
        @mouseleave="isTooltip = false"
      ></h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tooltip from "@/components/Tooltip.vue";
import { db } from "../firebase/index";
import EditorJS from "@editorjs/editorjs";
import endpoint from "@/miscred/prelink";
// eslint-disable-next-line
import { Board, User } from "@/ entities/models";
import VEmojiPicker from "v-emoji-picker";
import { randgen } from "@/helpers/randgen";
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
const SimpleImage = require("@editorjs/simple-image");

//todo adding interface and types for the Vue 2 Options API. It's better to move to Vue 3 😫
interface Data {
  editor: null | EditorJS;
  isSaved: boolean;
  timeout: null | number;
  upStatus: string;
  dat: object;
  isTooltip: boolean;
  tempdata: object;
  isCover: boolean;
  cover: string;
  coverBg: object;
}
interface Computed {
  boardData: Board;
  user: User;
  boards: Board[];
}
interface Methods {
  showTooltip: (event: MouseEvent, text: string) => void;
  autoSave: () => void;
  selectEmoji: (emoji: any) => void;
  togEmoji: () => void;
  getgrad: () => void;
}
// todo using types in the instance
export default Vue.extend<Data, Methods, Computed>({
  name: "Board",

  //todo Data =========================================
  data() {
    return {
      editor: null,
      isSaved: false,
      timeout: null,
      upStatus: "",
      dat: {},
      isTooltip: false,
      isCover: false,
      cover: "",
      coverBg: {},
      tempdata: {
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
      },
    };
  },
  components: {
    Tooltip,
    VEmojiPicker,
  },

  //todo computed ================================================
  computed: {
    user() {
      return this.$store.getters.giveUser as User;
    },
    boards() {
      return this.$store.getters.boards;
    },
    //@ts-ignore
    boardData() {
      if (this.boards.find((el: any) => el.key === this.$route.params._slug)) {
        return {
          //@ts-ignore
          data: this.boards.find(
            (el: Board) => el.key === this.$route.params._slug
          ).data,
          //@ts-ignore
          meta: this.boards.find(
            (el: Board) => el.key === this.$route.params._slug
          ).meta,
        };
      } else {
        return {
          // @ts-ignore
          data: this.tempdata,
          meta: {
            name: "Untitled",
            cover: "🔰",
            coverBg: {
              background:
                "linear-gradient(90deg, #71f7bd 25%, #e2a8f7 50%, #8077e5 75%)",
            },
          },
        };
      }
    },
  },
  metaInfo() {
    return {
      //@ts-ignore
      title: `${this.boardData.meta.cover}  ${this.boardData.meta.name}`,
    };
  },

  //todo methods =====================================
  methods: {
    getgrad() {
      const colors = randgen();
      this.coverBg = {
        background: `linear-gradient(90deg, ${colors[1]} 25%, ${colors[2]} 50%, ${colors[3]} 75%)`,
      };
      this.autoSave();
    },
    togEmoji() {
      this.isCover = !this.isCover;
    },
    selectEmoji(emoji): void {
      this.cover = emoji.data;
      this.autoSave();
      this.isCover = false;
    },
    showTooltip(event: MouseEvent, text: string) {
      this.isTooltip = true;
      this.dat = {
        text: text,
        left: event.pageX,
        top: event.pageY,
      };
      setTimeout(() => {
        this.isTooltip = false;
      }, 1000);
    },
    autoSave() {
      this.upStatus = "updating";
      this.$store.commit("setBoard", {
        id: this.$route.params._slug,
        status: this.upStatus,
      });
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        //@ts-ignore
        this.editor.save().then((data: object) => {
          const head = document.getElementById("init_head") as HTMLElement;
          //?opt
          /*           if (data === undefined) {
           */ db.ref(
            `/Users/${this.user.data.uid}/Boards/${this.$route.params._slug}`
          )
            .update({
              meta: {
                // @ts-ignore
                name: head.innerText,
                stamp: Date.now(),
                cover: this.cover,
                coverBg: this.coverBg,
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
          //?opt
          /*    } else {
            db.ref(
              `Users/${this.user.data.uid}/Boards/${this.$route.params._slug}`
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
              })
              .catch((err) => {
                console.log(err);
              });
          } */
        });
      }, 1000);
    },
  },
  //todo created =====================================
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
            endpoint: endpoint,
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
        image: SimpleImage,
      },
      data: this.boardData.data,
      //@ts-ignore
      logLevel: "ERROR",
      onChange: () => {
        this.autoSave();
      },
    }) as EditorJS;

    if (this.boards.find((el: any) => el.key === this.$route.params._slug)) {
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
  //todo mounted ===================================
  mounted() {
    //todo checking for those boards whoch don't have a cover image \\// for backwards compatibility
    if (
      Object.keys(this.coverBg).includes("background") ||
      this.boardData.meta.coverBg === undefined ||
      this.coverBg === undefined
    ) {
      //todo if they don't have one assign one
      const colors = randgen();
      this.coverBg = {
        background: `linear-gradient(90deg, ${colors[1]} 25%, ${colors[2]} 50%, ${colors[3]} 75%)`,
      };
      this.autoSave();
    } else {
      //todo or load from data
      this.coverBg = this.boardData.meta.coverBg;
    }
    // ?---------------------------------------------
    //todo checking for the boards which don't have a cover icon  \\// backwards cmpatibility
    if (
      this.boardData.meta.cover === "" ||
      this.boardData.meta.cover === undefined ||
      this.cover === undefined
    ) {
      //todo if they don't have one assign one
      this.cover = "🔰";
      this.autoSave();
    } else {
      // todo or load from data
      this.cover = this.boardData.meta.cover;
    }

    //todo syncing the board title
    const head = document.getElementById("init_head") as HTMLElement;
    head.innerHTML = this.boardData.meta.name;
    //@ts-ignore
    this._keyListener = (e) => {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.autoSave();
      }
    };
    //@ts-ignore
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy() {
    //@ts-ignore
    document.removeEventListener("keydown", this._keyListener);
    //@ts-ignore
    this.editor.destroy();
  },
});
</script>

<style lang="scss" scoped>
// ** borad styles
.init_head {
  position: relative;
  max-width: 650px;
  margin: 0 auto;
  padding: 1em 0;
  margin-bottom: -0.9em;
  line-height: 1.5em;
  outline: none;
  font-weight: bold;
  &:empty:not(:focus):before {
    position: absolute;
    content: attr(data-text);
    color: grey;
  }
}
.board-icon {
  position: relative;
  max-width: 650px;
  margin: 0 auto;
  padding: 2rem 0 1.5rem 0;
  margin-bottom: -0.9em;
  line-height: 1.5em;
  outline: none;
  font-size: 50px;
  span {
    cursor: pointer;
  }
  &:empty:not(:focus):before {
    position: absolute;
    content: attr(data-text);
    color: grey;
  }
}
.board-cover {
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 7rem 0;
}
#editor {
  padding: 8rem 0;
  position: relative;
  z-index: 10;
}
.board-cover-change {
  position: absolute;
  top: 10rem;
  right: 0;
  padding: 5px 10px;
  font-size: 11px;
  z-index: 11;
}
</style>
