export const state = () => ({
  templates: [],
  covers: [],
});

export const mutations = {
  SET_TEMPLATES: (state, templates) => {
    state.templates = templates;
  },
  SET_COVERS: (state, covers) => {
    state.covers = covers;
  },
};

export const actions = {
  getAutoRender({ commit }, form) {
    this.$axios.post("/template/render/auto", form).then((res) => {
      if (res.status === 200 && res.data.code === "0") {
        commit("SET_TEMPLATES", res.data.data.templates);
        commit("SET_COVERS", res.data.data.covers);
      }
    });
  },
};
