import { shallowMount } from '@vue/test-utils';
import ItemCounter from '@/common/components/ItemCounter';

describe('ItemCounter', () => {

  let wrapper, propsData;
  const createComponent = options => {
    wrapper = shallowMount(ItemCounter, options);
  };
  
  beforeEach(() => {
    propsData = {
      product: {},
      range:  {},
      counterClass: "",
      plusClass: "",
      minusClass: ""
    };
  });
  
  afterEach(() => {
    wrapper.destroy();
  });

  it('It sets the initial model value', () => {
    createComponent({ propsData });
    expect(wrapper.find('input').element.value).toBe(propsData.value);
    expect(wrapper.find('input').element.disabled).toBe(propsData.isDisabled);
  });

  it('input type is prop type', () => {
    createComponent({ propsData });
    let textarea = wrapper.find('input');
    expect(textarea.attributes('type')).toBe(propsData.type);
  });

  it('input type is prop type', () => {
    createComponent({ propsData });
    let textarea = wrapper.find('input');
    expect(textarea.attributes('placeholder')).toBe(propsData.placeHolder);
  });

  it('input name is prop name', () => {
    createComponent({ propsData });
    let textarea = wrapper.find('input');
    expect(textarea.attributes('name')).toBe(propsData.name);
  });

});
