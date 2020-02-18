import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('When I render App component', () => {
    it('should render correctly', () => {
        const component = shallow(<App />);
        expect(component.html()).toMatchSnapshot();
        expect(component.exists('.App')).toEqual(true)
    })
})