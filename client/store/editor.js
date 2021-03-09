export const state = () => ({
  tab: "1",
  count: 1,
  currentIndex: -1,
  editIndex: -1,
  templateScale: 100,
  tools: {
    layers: false,
  },
  // 以下是模板属性
  id: null,
  src: "",
  name: "未命名作品",
  width: 1280,
  height: 720,
  background: "#ffffff",
  layers: [],
  saved: true,
  layerTag: {
    mainText: "",
    subText: "",
    actionText: "",
    mainImage: "",
  },
});

export const mutations = {
  setEditIndex: (state, editIndex) => {
    state.editIndex = editIndex;
    state.saved = false;
  },
  setTab: (state, tab) => {
    state.tab = tab;
  },
  initTemplate: (state) => {
    // 编辑器状态
    state.tab = "1";
    state.count = 1;
    state.editIndex = -1;
    state.currentIndex = -1;
    state.templateScale = 100;
    state.tools = {
      layers: false,
    };

    // 模板信息
    state.id = null;
    state.src = "";
    state.name = "未命名作品";
    state.width = 1280;
    state.height = 720;
    state.background = "#ffffff";
    state.layers = [];
    state.saved = true;
  },
  loadTemplate: (state, template) => {
    // 编辑器状态
    state.tab = "1";
    state.count = 1;
    state.editIndex = -1;
    state.currentIndex = -1;
    state.templateScale = 100;
    state.tools = {
      layers: false,
    };

    // 模板信息
    state.id = template._id || null;
    state.src = template.src;
    state.name = template.name;
    state.width = template.width;
    state.height = template.height;
    state.background = template.background;
    state.layers = template.layers.map((item) => {
      item["className"] = "";
      return item;
    });
    state.saved = true;
  },
  changeLayer: (state, { index, attr, value }) => {
    state.saved = false;
    if (attr === "value") {
      state.layers[index].value = value;
    } else if (attr === "name") {
      state.layers[index].name = value;
    } else if (attr === "className") {
      console.log(state.layers[index]);
      state.layers[index].className = value;
    } else {
      state.layers[index].style[attr] = value;
    }
  },
  addLayer: (state, layer) => {
    state.saved = false;
    state.layers.push(layer);
    state.currentIndex = state.layers.length - 1;
    state.count++;
  },
  deleteLayer: (state, index) => {
    state.saved = false;
    const newLayerTag = { ...state.layerTag };
    console.log(state.layers[index]._id);
    if (state.layers[index]._id) {
      for (let item in state.layerTag) {
        console.log(state.layerTag[item]);
        if (state.layers[index]._id === state.layerTag[item]) {
          newLayerTag[item] = "";
        }
      }
      state.layerTag = newLayerTag;
    }
    state.currentIndex = -1;
    state.layers.splice(index, 1);
  },
  moveLayer: (state, { top, left, index }) => {
    state.saved = false;
    state.layers[index].style.top = top;
    state.layers[index].style.left = left;
  },
  changeLayerSize: (state, { width, height, index }) => {
    state.saved = false;
    if (state.layers[index].type === "text") {
      state.layers[index].style.width = width;
    } else {
      state.layers[index].style.width = width;
      state.layers[index].style.height = height;
    }
  },
  editLayer: (state, index) => {
    state.tab = "1";
    state.currentIndex = index;
  },
  setTemplate: (state, { attr, value }) => {
    if (attr !== "saved") {
      state.saved = false;
    } else {
      state.saved = value;
    }
    if (attr === "id") {
      state.id = value;
    } else if (attr === "name") {
      state.name = value;
    } else if (attr === "src") {
      state.src = value;
    } else if (attr === "width") {
      state.width = value;
    } else if (attr === "height") {
      state.height = value;
    } else if (attr === "scale") {
      state.templateScale = value;
    } else if (attr === "background") {
      state.background = value;
    } else if (attr === "currentIndex") {
      state.currentIndex = value;
    } else if (attr === "editIndex") {
      state.editIndex = value;
    } else if (attr === "layersTool") {
      state.tools.layers = value;
    } else if (attr === "count") {
      state.count = value;
    } else if (attr === "layers") {
      state.layers = value;
    }
  },
  setLayerTag(state, layerTag) {
    state.layerTag = layerTag;
  },
  setLayerTagItem(state, attr, value) {
    if (attr === "mainText") {
      state.layerTag.mainText = value;
    } else if (attr === "subText") {
      state.layerTag.subText = value;
    } else if (attr === "actionText") {
      state.layerTag.actionText = value;
    } else if (attr === "mainImage") {
      state.layerTag.mainImage = value;
    }
  },
};

export const actions = {
  async getTemplate({ commit }, id) {
    const res = await Promise.all([
      await this.$axios.get("/template/info?id=" + id),
      await this.$axios.get("/template/layerTag?id=" + id),
    ]);
    if (res[0].status === 200 && res[0].data.code === "0") {
      commit("loadTemplate", res[0].data.data);
    } else {
      commit("initTemplate");
    }
    if (res[1].status === 200 && res[1].data.code === "0") {
      const { mainText, subText, actionText, mainImage } = res[1].data.data;
      commit("setLayerTag", { mainText, subText, actionText, mainImage });
    } else {
      commit("setLayerTag", {
        mainText: "",
        subText: "",
        actionText: "",
        mainImage: "",
      });
    }
    return res;
  },
  async saveTemplate({ state, commit }) {
    const template = {
      id: state.id,
      src: state.src,
      name: state.name,
      width: state.width,
      height: state.height,
      background: state.background,
      layers: state.layers,
    };
    const res = await this.$axios.post("/template/save", template);
    commit("setTemplate", { attr: "saved", value: true });
    commit("setTemplate", { attr: "id", value: res.data.data.id });
    return res;
    // if (res.status === 200 && res.data.code === "0") {
    //   commit("loadTemplate", res.data.data);
    // } else {
    //   commit("initTemplate");
    // }
  },
  async render({ state }, filename) {
    const template = {
      width: state.width,
      height: state.height,
      background: state.background,
      layers: state.layers,
    };
    return await this.$axios
      .post("/template/render", { template }, { responseType: "arraybuffer" })
      .then((file) => {
        let content = file.data;
        // 组装a标签
        let elink = document.createElement("a");
        // 设置下载文件名
        elink.download = filename + ".png";
        elink.style.display = "none";
        let blob = new Blob([content], { type: "application/zip" });
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
      });
  },
  async getFontFile({ state, commit }, { fontName, index }) {
    const layer = state.layers[index];
    const value = layer.value;
    return await this.$axios.get(
      `/template/fontfile?fontName=${fontName}&text=${value}`
    );
  },
  setLayerTag({ commit, state }) {
    return this.$axios.post("/template/layerTag", {
      id: state.id,
      mainText: state.layerTag.mainText,
      subText: state.layerTag.subText,
      actionText: state.layerTag.actionText,
      mainImage: state.layerTag.mainImage,
    });
  },
};
