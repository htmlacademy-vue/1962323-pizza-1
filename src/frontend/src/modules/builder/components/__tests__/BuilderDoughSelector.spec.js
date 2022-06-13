import { mount } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import { generateMockStore } from "@/store/mocks";

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  it("component rendered", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });
});
