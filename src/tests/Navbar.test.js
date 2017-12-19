import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import React from 'react';
import NavBar from '../components/nav/Navbar';
import {shallow, mount} from 'enzyme';

const submitFn = jest.fn();

describe('Tests the navbar component', () => {
    const wrapper = shallow(
        <NavBar
            onSubmit={() => {}}
            user={[]}
            match={{path: '/'}}
        />
    );


    it('should have four menu items - and no other direct children', () => {
        expect(wrapper.find('MenuItem')).toHaveLength(3);
        expect(wrapper.children()).toHaveLength(3);
    });

    it('should have a first child with a FUNCTION type and ONE child of its own', () => {
        expect(wrapper.childAt(0)).toHaveLength(1);
        expect(typeof wrapper.childAt(0).type()).toBe('function');
    });

    it('should have a an IMAGE of size TINY with a 20px top margin', () => {
        expect(wrapper.childAt(0).childAt(0).prop('as')).toEqual('img');
        expect(wrapper.childAt(0).childAt(0).prop('size')).toEqual('tiny');
        expect(wrapper.childAt(0).childAt(0).prop('style')['marginTop']).toEqual('20px');
    });

    it('should have a second child with a FUNCTION type and ONE child of its own', () => {
        expect(wrapper.childAt(1)).toHaveLength(1);
        expect(typeof wrapper.childAt(1).type()).toBe('function');
    });

    it('should have a third child with a FUNCTION type and ONE child of its own', () => {
        expect(wrapper.childAt(2)).toHaveLength(1);
        expect(typeof wrapper.childAt(2).type()).toBe('function');
    });

    it('should have two options under login - LOGIN and SIGN UP - both of which are FUNCTIONS', () => {
        expect(wrapper.childAt(2).childAt(0).children().children()).toHaveLength(2);
        expect(typeof wrapper.childAt(2).childAt(0).children().childAt(0).type()).toBe('function');
        expect(typeof wrapper.childAt(2).childAt(0).children().childAt(0).type()).toBe('function');
    });

});
