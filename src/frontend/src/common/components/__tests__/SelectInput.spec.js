import { shallowMount } from '@vue/test-utils';
import SelectInput from '@/common/components/SelectInput';

describe('SelectInput', () => {

  let wrapper, propsData;
  const createComponent = options => {
    wrapper = shallowMount(SelectInput, options);
  };

  beforeEach(() => {
    propsData = {
      value: '1',
      name: 'testName',
      options: [
        {value:"1", name: "option1"}, 
        {value:"2", name: "option2"}
      ]
    };
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it('cheking select\'s value', () => {
    createComponent({ propsData });
    expect(wrapper.find('select').element.value).toBe(propsData.value);
  });

  it('input name is prop name', () => {
    createComponent({ propsData });
    let textarea = wrapper.find('select');
    expect(textarea.attributes('name')).toBe(propsData.name);
  });
});
