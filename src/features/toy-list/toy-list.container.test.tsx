
import * as React from 'react';
import { configure, shallow, ShallowRendererProps, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import ConnectedContainer, { Props } from './toy-list.container';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MockStore, MockStoreCreator } from 'redux-mock-store';
import * as configureStore from 'redux-mock-store';
import { Toy } from './toy';
import { Store } from '../../store/root';

configure({ adapter: new Adapter() });

describe('ToyListContainer', () => {

  const toy: Toy = {
    title: 'toy',
    icon: 'ballon',
    price: 10
  };

  const mockStore: MockStoreCreator<Store> = configureStore<Store>([ thunk ]);
  const store: MockStore<Store> = mockStore({
    toyReducer: {
      toyList: [ toy ],
      counter: 0
    },
    authReducer: {
      isConnected: false,
      isOpened: false,
      isError: false
    }
  });
  const props: ShallowRendererProps = {
    context: { store }
  };

  it('renders without crashing', () => {
    const output: ShallowWrapper<Props> = shallow<Props>(
      <Provider store={store}>
        <ConnectedContainer />
      </Provider>
    ).dive(props);

    const innerProps: Props = output.props();

    expect(shallowToJson(output)).toMatchSnapshot();
    expect(innerProps.toyList).toEqual([ toy ]);

  });

});
