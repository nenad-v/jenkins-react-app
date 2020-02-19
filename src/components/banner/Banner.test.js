import React from 'react';
import { shallow } from 'enzyme';
import Banner from './Banner';

describe('When I render Banner component', () => {
    it('should render correctly', () => {
        const component = shallow(<Banner />);
        expect(component.html()).toMatchSnapshot();
        expect(component.exists('.Random')).toEqual(true)
    })
})