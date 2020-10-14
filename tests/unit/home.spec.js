import Home from "@/pages/Home.vue";
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home component", () => {
  test("a le hook `name`", () => {
    expect(Home.name).toEqual("Home");
  });

  test("a le composant card", () => {
    expect(typeof Home.components.CardComponent).toEqual("function");
  });
});

describe('Home.vue', () => {
  let actions;
  let store;
  let getters;

  beforeEach(() => {
    actions = {
      setModal: jest.fn()
    };
    getters = {
      isPlaying: () => false
    };
    store = new Vuex.Store({
      state: {},
      getters,
      actions
    });
  });

  test('should dispatch action when created', () => {
    shallowMount(Home, {
      localVue,
      store
    });
    expect(actions.setModal).toHaveBeenCalled();
  });
});
