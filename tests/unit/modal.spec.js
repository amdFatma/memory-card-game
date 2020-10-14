import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Modal from "@/components/Modal.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Modal.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      modal: () => "Click to play"
    };

    store = new Vuex.Store({
      getters
    });
  });

  it('Renders "store.getters.modal" in modal', () => {
    const wrapper = shallowMount(Modal, { store, localVue });
    const message = wrapper.find(".Modal__message");
    expect(message.text()).toBe(getters.modal());
  });
});
