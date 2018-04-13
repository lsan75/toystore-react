
import * as React from 'react';
import { configure, shallow, mount, ShallowRendererProps, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import ConnectedContainer, { Props } from './toy-list.container';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MockStore, MockStoreCreator } from 'redux-mock-store';
import * as configureStore from 'redux-mock-store';
import { Toy } from './toy';
import { Store } from '../../store/root';
import mockAxios from 'jest-mock-axios';

configure({ adapter: new Adapter() });

describe('ToyListContainer', () => {

  let reactOutput: ReactWrapper<Props>;
  let shallowOutput: ShallowWrapper<Props>;
  let emptyOutput: ReactWrapper<Props>;

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
  const emptyStore: MockStore<Store> = mockStore({
    toyReducer: {
      toyList: [],
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

  beforeEach(() => {
    reactOutput = mount<Props>(
      <Provider store={store}>
        <ConnectedContainer />
      </Provider>
    );

    shallowOutput = shallow<Props>(
      <Provider store={store}>
        <ConnectedContainer />
      </Provider>
    ).dive(props);

    emptyOutput = mount<Props>(
      <Provider store={emptyStore}>
        <ConnectedContainer />
      </Provider>
    );
  });

  afterEach(() => store.clearActions());

  it('renders without crashing', () => {
    const innerProps: Props = shallowOutput.props();

    expect(shallowToJson(shallowOutput)).toMatchSnapshot();
    expect(innerProps.toyList).toEqual([ toy ]);
  });

  it('should get toys', () => {
    mockAxios.mockResponse({ data: [ toy ] });
    let actions = emptyStore.getActions();
    expect(actions).toContainEqual({
      type: 'TOYS_GET_TOYS',
      toyList: [ toy ]
    });

    emptyStore.clearActions();
    emptyOutput.render();
    actions = emptyStore.getActions();
    expect(actions).toEqual([]);
  });

  it('should unselect', () => {
    reactOutput.find('.ToyList__unselect').simulate('click');

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'TOYS_UNSELECT_ALL'
    });
  });

  it('should select a toy', () => {

    reactOutput.find('.ToyComponent').simulate('click');

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'TOYS_SELECT_TOY',
      toy
    });
  });

});
