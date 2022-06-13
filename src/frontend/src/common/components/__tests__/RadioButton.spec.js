import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  let wrapper, propsData;
  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  beforeEach(() => {
    propsData = {
      value: "testValue",
      name: "testName",
      selectedValue: "",
      type: "radio",
      labelClass: "labelClass",
      inputClass: "inputClass",
    };
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("input value is prop value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("input class is prop class", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.className).toBe(propsData.inputClass);
  });

  it("label class type is prop class", () => {
    createComponent({ propsData });
    expect(wrapper.find("label").element.className).toBe(propsData.labelClass);
  });

  it("radio input type is prop type", () => {
    createComponent({ propsData });
    let textarea = wrapper.find("input");
    expect(textarea.attributes("type")).toBe(propsData.type);
  });

  it("radio input name is prop name", () => {
    createComponent({ propsData });
    let textarea = wrapper.find("input");
    expect(textarea.attributes("name")).toBe(propsData.name);
  });
});
