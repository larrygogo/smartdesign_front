export const state = () => ({
  list: [],
  count: 0,
});

export const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_COUNT: (state, count) => {
    state.count = count;
  },
};

export const actions = {
  async getList({ state, commit }, { page = 1, pageSize = 10 }) {
    return await this.$axios
      .get(`/pub/template/list?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        if (res.status === 200 && res.data.code === "0") {
          commit("SET_LIST", res.data.data.rows);
          commit("SET_COUNT", res.data.data.count);
          return { list: res.data.data.rows, count: res.data.data.count };
        } else {
          return { list: [], count: 0 };
        }
      });
  },
  async createTemplate({}, { name, filepath, tag }) {
    return await this.$axios.post("/template/create", {
      name,
      filepath,
      tag,
    });
  },
  async delete({}, { id, bothResource }) {
    return await this.$axios.post("/template/delete", { id, bothResource });
  },
};
