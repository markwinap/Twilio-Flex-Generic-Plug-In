/*
 * Note: This is Component is INCOMPLETE and will not function as is.
 * Complete the challenges marked with ✏️ to fix it!
 */

import React from 'react';
import { withTheme, withTaskContext } from '@twilio/flex-ui';
import styled from "react-emotion";
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

const grey_dark = "#4b5a6b";
const snow_host = "https://dev76321.service-now.com/";

const priority = {
  "1 - Critical": {color: "red"},
  "2 - High": {color: "orange"},
  "3 - Moderate": {color: "yellow"},
  "4 - Low": {color: "teal"},
  "5 - Planning": {color: "grey"},
};
const severity = {
  "1 - High": {color: "red"},
  "2 - Medium": {color: "orange"},
  "3 - Low": {color: "teal"}
};
class CustomCRM extends React.Component {
  constructor() {
    super();
    this.state = { result: [], loading: false, url: ""};
    this.renderList = this.renderList.bind(this);
    this.clearUrl = this.clearUrl.bind(this);
  }
  componentDidMount(){
    console.log("MOUNTED!!!!!!!!!!!!")
    const { task } = this.props;
    
    console.log(task)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    console.log("UPDUPDATED!!!!!!!!!!!!")
  }
  renderList() {
    const {result } = this.state;
    const listItems = result.map((ticket) =>
    <Item>
      <Item.Content>
        <Item.Header as='a' href={ snow_host + 'nav_to.do?uri=/incident.do?sys_id=' + ticket.sys_id} target="_blank">{ticket.number} - {ticket.short_description}</Item.Header>
        <Item.Meta>
          <span className='cinema' >{ticket.assignment_group.display_value} - {ticket.assigned_to.display_value}</span>
        </Item.Meta>
        <Item.Description>{ticket.description}</Item.Description>
        <Item.Extra>
          <Label color={severity[ticket.severity].color}>Severity - {ticket.severity}</Label>
          <Label color={severity[ticket.impact].color}>Impact - {ticket.impact}</Label>
          <Label color={priority[ticket.priority].color}>Priority - {ticket.priority}</Label>
          <Label >State - {ticket.state}</Label>
          <Label >CI - {ticket.cmdb_ci.display_value}</Label>
          <Label >Subcategory - {ticket.subcategory}</Label>
          <Label color="black">Created - {ticket.sys_created_on}</Label>
          <Label color="black">Updated - {ticket.sys_updated_on}</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
    );
    return (
      <Item.Group divided>{listItems}</Item.Group>
    );
  }
  clearUrl(){
    console.log("CLEANED")
    this.setState({ url: "" });
  }
  async getSnow(url) {
    this.setState({ url: url });
    try {
      let getData = await fetch(url,
      {
        method: 'get',
        headers:
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic YWRtaW46TUB4cGF5bmUzMg=='
        }
      }).then(function(response) {
        return response.json();
      }).catch(e => {console.log(e)}).then(function(myJson) { return myJson;});
      console.log(getData)
      this.setState({ result: getData.result });
    } catch (error) {
      console.log(error);
    }
  }
  async getSnowLong(url) {
    this.setState({ url: url });
    try {
      let getUser = await fetch(url,
      {
        method: 'get',
        headers:
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic YWRtaW46TUB4cGF5bmUzMg=='
        }
      }).then(function(response) {
        return response.json();
      }).catch(e => {console.log(e)}).then(function(myJson) { return myJson;});
      console.log(getUser)
      if(getUser.result.length > 0){
        try {
          let getData = await fetch(snow_host + 'api/now/table/incident?sysparm_query=caller_id.sys_id=' + getUser.result[0].sys_id + '^assignment_group=d625dccec0a8016700a222a0f7900d06^stateIN1,2,3^ORDERBYnumber&sysparm_display_value=true&sysparm_limit=20&sysparm_fields=severity,assigned_to,incident_state,sys_id,assignment_group,short_description,description,subcategory,caller_id,sys_updated_on,sys_created_on,opened_at,number,state,cmdb_ci,impact,business_service,priority',
          {
            method: 'get',
            headers:
            {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic YWRtaW46TUB4cGF5bmUzMg=='
            }
          }).then(function(response) {
            return response.json();
          }).catch(e => {console.log(e)}).then(function(myJson) { return myJson;});
          console.log(getData)
          this.setState({ result: getData.result });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { task } = this.props;
    const {loading, url } = this.state;
    console.log(loading)
    let content;
    if (!task || !task.attributes) {
      content = <Canvas><CRMContainer>
      <HeaderLine><Header>
        <span>Custom CRM</span>
      </Header></HeaderLine>
      <LargeCaption>
        No task selected
      </LargeCaption>
    </CRMContainer></Canvas>
    } 
    else if(task.attributes.vip){
      let tempUrl = snow_host + 'api/now/table/incident?sysparm_query=caller_id.sys_id=' + task.attributes.caller_id + '^assignment_group=d625dccec0a8016700a222a0f7900d06^stateIN1,2,3^ORDERBYnumber&sysparm_display_value=true&sysparm_limit=20&sysparm_fields=severity,assigned_to,incident_state,sys_id,assignment_group,short_description,description,subcategory,caller_id,sys_updated_on,sys_created_on,opened_at,number,state,cmdb_ci,impact,business_service,priority';
      if(url != tempUrl){
        this.getSnow(tempUrl);
      }      
      content = this.renderList();
    } 
    else if(task.attributes.channelSid){
      let tempUrl2 = snow_host + 'api/now/table/sys_user?sysparm_query=u_slack_id=' + task.attributes.name;
      if(url != tempUrl2){
        this.getSnowLong(tempUrl2);
      }      
      content = this.renderList();
    }
    else if (!task.attributes.account_data) {
      content = <Canvas><CRMContainer>
      <HeaderLine><Header>
        <span>Custom CRM</span>
      </Header></HeaderLine>
      <LargeCaption>
        No account data found
      </LargeCaption>
    </CRMContainer></Canvas>;
    }
    else {
      content = this.renderList();
    }
    return <MiniCan>
      {content}
    </MiniCan>;
  }
}



const Value = styled("div")`
  color: ${grey_dark /* ✏️ Challenge 4/5: replace 'black' with some theme color, e.g. color.base8 */};
`;
const MiniCan = styled("div")`
  height: 100%;
  min-height: 100%;
  margin: 0px;
  display: flex;
  flex-direction: row;
  flex-grow:1;
  flex-shrink:1;
  height: auto;
  border-left-color: ${props => props.theme.AgentDesktopView.ContentSplitter.borderColor};
  border-left-width: 1px;
  border-left-style: solid;
`;
const HeaderLine = styled("div")`
  border-style: solid;
  border-width: 0px 0px 4px;
  border-color: rgb(25, 118, 210);
`;

const Header = styled("div")`
  font-size: 10px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0px 12px 4px;
`;

const LargeCaption = styled("div")`
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  margin: 34px 20px 10px;
`;

const ProfilePhoto = styled("img")`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  margin-bottom:34px;
  margin-left:12px;
  margin-right:12px;
  margin-top:0px;
`;

const Canvas = styled("div")`
  height: 100%;
  min-height: 100%;
  margin: 0px;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-grow:1;
  flex-shrink:1;
  align-items: center;
  justify-content: center;
  height: auto;
  border-left-color: ${props => props.theme.AgentDesktopView.ContentSplitter.borderColor};
  border-left-width: 1px;
  border-left-style: solid;
`;
//${props => props.theme.TaskCanvas.Container.background}
const CRMContainer = styled("div")`
  color: ${grey_dark /* ✏️ Challenge 5/5: replace 'black' with some theme color, e.g. calculated.textColor */};
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-grow:1;
  flex-shrink:1;
  justify-content: center;
  vertical-align:baseline;
  -webkit-box-align:center;
  -webkit-box-pack:center;
  max-width: 100%;
`;

export default withTaskContext(withTheme(CustomCRM));
