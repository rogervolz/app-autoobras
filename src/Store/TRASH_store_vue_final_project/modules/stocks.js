import dataStocks from '../../data/stocks';

const state = {
  dataStocks: []
};

const mutations = {
    'SET_STOCKS' (state, dataStocks) {
        state.dataStocks = dataStocks;
    },
    'RND_STOCKS' (state) {
        state.dataStocks.forEach(stock => {
          stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        });
    }
};

const actions = {
    buyStock: ({commit}, order) => {
        commit('BUY_STOCK', order);
    },
    initStocks: ({commit}) => {
        commit("SET_STOCKS", dataStocks);
    },
    randomizeStocks: ({commit}) => {
        commit('RND_STOCKS');
    }
};

const getters = {
    stocks: state => {
        return state.dataStocks;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
