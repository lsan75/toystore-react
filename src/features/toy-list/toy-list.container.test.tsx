import * as React from 'react';
import { configure, shallow, ShallowRendererProps } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import ToyListContainer from './toy-list.container';
import { Provider } from 'react-redux';
import { store } from '../../store/create.store';

configure({ adapter: new Adapter() });

describe('ToyListContainer', () => {

  const props: ShallowRendererProps = {
    context: { store }
  };

  it('renders without crashing', () => {
    const output = shallow(
      <Provider store={store}>
        <ToyListContainer />
      </Provider>
    ).dive(props);

    expect(shallowToJson(output)).toMatchSnapshot();

  });

});
