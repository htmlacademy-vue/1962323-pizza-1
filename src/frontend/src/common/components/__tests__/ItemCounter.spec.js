import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  let wrapper, propsData;
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    propsData = {
      product: {},
      range: {},
      counterClass: "",
      plusClass: "",
      minusClass: "",
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input type is prop type", () => {
    createComponent({ propsData });
    let textarea = wrapper.find("input");
    expect(textarea.attributes("placeholder")).toBe(propsData.placeHolder);
  });
});
