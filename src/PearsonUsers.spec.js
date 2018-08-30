import React from "react";
import { shallow } from "enzyme";
import { PearsonUsers } from "./PearsonUsers";
import { INITIAL_USERS } from './Constants';
import { User } from './User';

describe("PearsonUsers", () => {
  let component;

  beforeEach(() => {
    PearsonUsers.prototype.jsonList = jest.fn();
    component = shallow(<PearsonUsers />);
    component.setState({
      users: INITIAL_USERS
    });
  });

  it("PersonUsers should render successfully", () => {
    expect(component).toMatchSnapshot();
  });

  it("Header should render properly", () => {
    const userHeader = component.find(".users-header");
    expect(userHeader.text()).toEqual("Pearson User Management");
  });

  it("User should render properly", () => {
    expect(component.find(User).length).toEqual(3);
  });

  it("removeDuplicateUsers should work properly", () => {
    const users = INITIAL_USERS;
    users.concat(INITIAL_USERS[0]);
    expect(component.instance().removeDuplicateUsers(users)).toEqual(INITIAL_USERS);
  });
});
