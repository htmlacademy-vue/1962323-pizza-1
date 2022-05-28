import { shallowMount } from '@vue/test-utils';
import TextInput from '@/common/components/TextInput';

describe('TextInput', () => {

  let wrapper, propsData;
  const createComponent = options => {
    wrapper = shallowMount(TextInput, options);
  };

  beforeEach(() => {
    propsData = {
      value: 'testValue',
      name: 'testName',
      type: 'text',
      placeHolder: 'Введите текст',
      isDisabled: true
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
