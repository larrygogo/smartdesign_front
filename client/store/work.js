import { Message } from "element-ui";
export const state = () => ({
  count: 0,
  list: [],
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
  async getWorkList({ state, commit }, { page, pageSize }) {
    return await this.$axios
      .get(`/user/work/list?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        if (res.status === 200 && res.data.code === "0") {
          commit("SET_COUNT", res.data.data.count);
          commit("SET_LIST", res.data.data.rows);
          return { list: res.data.data.rows, count: res.data.data.count };
        } else {
          return { list: [], count: 0 };
        }
      });
  },
};
