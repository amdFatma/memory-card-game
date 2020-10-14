import Home from "@/pages/Home.vue";

/*describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
}); */

describe("Home component", () => {
  it("a le hook `name`", () => {
    expect(Home.name).toEqual("Home");
  });

  it('a les bons composants', () => {
    expect(typeof Home.components.Card).toEqual('function');
  });
});
