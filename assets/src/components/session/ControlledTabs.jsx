import React, { Component } from 'react';

import { Tab, TabPane } from '../adminComponents/Tabs';

export class TabTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'tab-1',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      activeTab: event.target.id,
    });
  }

  renderDeluxeStyle() {
    return (
      <Tabs>
        <Tab label="Tab 1" key={1}>
          <p>Tab pane content.</p>
        </Tab>
      </Tabs>
    );
  }
  renderTabs() {
    return (
      <Tabs>
        <TabPane>
          <p>Pane 1, some BS.</p>
        </TabPane>
        <TabPane>
          <p>Pane 2, some BS.</p>
        </TabPane>
        <TabPane>
          <p>Pane 3, some BS.</p>
        </TabPane>
      </Tabs>
    )
  }

  onClick(event) {
    const shouldChange = true;
    if (typeof this.props.onClick === 'function') {
      shouldChange = this.props.onClick(event);
    }

    if (shouldChange) {
      this.props.onTabClick(event);
    }
  }


  // Tab - <div onClick={() => { if(typeof props.onClick === 'function') { props.onClick(event)} props.onTabClick(event); }}>

  renderTabtasticUncontrolled() {
    return (
      <UncontrolledTabs>
        <TabContent>
          <Tab tabKey={1} onClick={event => { event.stopPropagtion(); toast.success('hooray'); }}>Label 1</Tab>
          <Tab tabKey={2}>Label 2</Tab>
          <TabPane tabKey={1}>
            <p>Tab Pane Content 1</p>
          </TabPane>
          <TabPane tabKey={2}>
            <p>Tab Pane Content 2</p>
          </TabPane>
        </TabContent>
      </UncontrolledTabs>
    )
  }

  // TabContent (formerly Tabs)
  // - renders nav-tabs-custom, etc containers.
  // - Passes onTabClick to Tab.
  // - Passes isActive boolean to TabPane

  renderTabtasticUncontrolled() {
    return (
      <TabContent
        onTabClick={tabKey => this.setState({ activeTab: tabKey })}
        activeTab={this.state.activeTab}
      >
        <Tab tabKey={1}>Label 1</Tab>
        <Tab tabKey={2}>Label 2</Tab>
        <TabPane tabKey={1}>
          <p>Tab Pane Content 1</p>
        </TabPane>
        <TabPane tabKey={2}>
          <p>Tab Pane Content 2</p>
        </TabPane>
      </TabContent>
    )
  }

  render() {
    return (
      <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
          <Tab label="Tab 1" myKey="tab-1" activeTab={this.state.activeTab === 'tab-1'} handleClick={this.handleClick} />
          <Tab label="Tab 2" myKey="tab-2" activeTab={this.state.activeTab === 'tab-2'} handleClick={this.handleClick} />
          <Tab label="Tab 3" myKey="tab-3" activeTab={this.state.activeTab === 'tab-3'} addClass="pull-right" handleClick={this.handleClick} />
        </ul>
        <div className="tab-content">
          <TabPane
            activeTab={this.state.activeTab === 'tab-1'}
          >Tab 1</TabPane>
          <TabPane
            activeTab={this.state.activeTab === 'tab-2'}
          >Tab 2</TabPane>
          <TabPane
            activeTab={this.state.activeTab === 'tab-3'}
          >Tab 3</TabPane>
        </div>
      </div>
    );
  }
}

