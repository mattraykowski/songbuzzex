import React, { Component } from 'react';
import classNames from 'classnames';

export const renderChildren = (children, activeTab) =>
  React.Children.map(children, child => {
    if (child.type.displayName === 'TabPane' && child.key === activeTab) {
      return React.cloneElement(child, {
        activeTab: true,
      });
    }
    return child;
  });

export class Tabs extends Component {
  constructor(props) {
    super(props);
    /* If one of the labels has a property 'active' set to true
     * find it's position in the labels array.
     */
    let index = props.labels.findIndex(element => element.active === true);
    /* If none of the labels have an the active property set to true
     * then find the first element in the labels array.
     */
    if (index < 0) {
      index = 0;
    }
    /* activeTab will set witch tabs content will be displayed when the component is rendered.
     * activeTab also sets the active class on the tab for UI display.
     */
    this.state = { activeTab: props.labels[index].key };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    this.setState({ activeTab: event.target.id });
  }

  render() {
    const { addClass, labels, children } = this.props;

    return (
      <div className="nav-tabs-custom">
        <ul className={classNames('nav', 'nav-tabs', addClass)}>
          {labels.map(obj =>
            <Tab
              key={obj.key}
              myKey={obj.key}
              label={obj.label}
              activeTab={this.state.activeTab === obj.key}
              handleClick={this.handleClick}
              addClass={obj.addClass}
            />,
          )}
        </ul>
        <div className="tab-content">
          {renderChildren(children, this.state.activeTab)}
        </div>
      </div>
    );
  }
}

export const Tab = ({ addClass, activeTab, myKey, handleClick, label }) =>
  <li className={classNames(addClass, { active: activeTab })}>
    <a id={myKey} tabIndex="0" role="button" onClick={handleClick}>{label}</a>
  </li>;

export const TabPane = ({ activeTab, children }) =>
  <div className={classNames('tab-pane', { active: activeTab })}>{children}</div>;
