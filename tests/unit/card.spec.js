import Card from "@/components/Card.vue";

describe("Card component", () => {
  test("a le hook `name`", () => {
    expect(Card.name).toEqual("Card");
  });

  test("a le hook methods", () => {
    expect(typeof Card.methods).toEqual("object");
  });
});
