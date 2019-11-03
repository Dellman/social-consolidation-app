import React from 'react';
import { shallow, configure } from 'enzyme';
import ReactDOM from 'react-dom';
import CheckUser from '../CheckUser';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CheckUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("get users", () => {
  it("should get the slack users", async () => {
    const wrapper = shallow(<CheckUser />);
    const data = await wrapper.instance().getSlackUsers();
    expect(data.length).toBeGreaterThan(0);
  });

  it("should get an empty array", async () => {
    const wrapper = shallow(<CheckUser />);
    const data = await wrapper.instance().getSlackUsers("random string");
    expect(data.length).toBe(0);
  });
});

describe("check if user exists", () => {
  it("should return an object with data about the user", async () => {
    const wrapper = shallow(<CheckUser />);
    const data = await wrapper.instance().checkSlackUser("ellmantdaniel");
    expect(Object.keys(data).length).toBeGreaterThan(0);
  });

  it("should return an empty object", async () => {
    const wrapper = shallow(<CheckUser />);
    const data = await wrapper.instance().checkSlackUser("non-existant user name");
    expect(Object.keys(data).length).toBe(0);
  });
});