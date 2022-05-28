import { mount } from '@vue/test-utils';
import BuilderSizeSelector from '@/modules/builder/components/BuilderSizeSelector';
import { generateMockStore } from '@/store/mocks';

describe('BuilderSizeSelector', () => {
  let wrapper;
  let store;

  const createComponent = options => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  it('component rendered', () => {
    createComponent({store});
    expect(wrapper.exists()).toBeTruthy();
  });

});
