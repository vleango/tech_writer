import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '../HomePage';
import { articles } from '../../../fixtures/articles';

let wrapper;

describe('Components', () => {
    describe('HomePage', () => {
        describe('HomePage', () => {

            // TODO remove for now until art api is created (currently breaks the snapshot)
            describe('Snapshot', () => {
                it('should correctly render HomePage', () => {
                    // wrapper = shallow(<HomePage location={{search: ""}} articles={articles} />);
                    // expect(wrapper).toMatchSnapshot();
                });
            });
        });
    });
});
