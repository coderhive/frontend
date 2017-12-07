import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import React from 'react';
import NavBar from '../components/nav/Navbar';
import {shallow, mount} from 'enzyme';

describe('Tests the navbar component', () => {
    const wrapper = shallow(
        <NavBar
            onSubmit={() => {}}
            user={[]}
        />
    );
    it('should have three menu items - and no other direct children', () => {
        // console.log('>>>>>>>>>>', wrapper.children(), '<<<<<<<<<<')
        expect(wrapper.find('MenuItem')).toHaveLength(3);
        expect(wrapper.children()).toHaveLength(3);
    })
});