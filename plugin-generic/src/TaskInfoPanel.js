/*
 * Note: This is Component is INCOMPLETE and will not function as is.
 * Complete the challenges marked with ✏️ to fix it!
 */

import React from 'react';
import { withTheme, withTaskContext } from '@twilio/flex-ui';
import styled from "react-emotion";
import { Card, Icon, Button } from 'semantic-ui-react'

// OwlCRM URL for loading profile images
const CRM_baseurl = 'https://owlcrm.herokuapp.com/';

const grey_dark = "#4b5a6b";
const snow_host = "https://dev76321.service-now.com/";

const vip = (
    <a>
      <Icon name='user' />
      16 Friends
    </a>
  )

  
class CustomCRM extends React.Component {
  render() {
    const { task } = this.props;
    console.log("CARDDDDD", task);

       
    let content;
    if(task.attributes.vip){
      content = <Card fluid>
      <Card.Content header='⚠ VIP EMAIL' />
      <Card.Content meta={task.attributes.subject} />
      <Card.Content description={task.attributes.body} />
      <Card.Content extra>
        <Icon name='mail' />
        {task.attributes.name + " - " + task.attributes.email}
      </Card.Content>
      {
        task.attributes.number ? <Card.Content extra><Button basic fluid color='red' href={snow_host + 'nav_to.do?uri=/incident.do?sys_id=' + task.attributes.sys_id} target="_blank">{task.attributes.number}</Button></Card.Content> : <div/>
      }
    </Card>
    }
    else if(task.attributes.from){
      content = <Card fluid>
      <Card.Content header='Phone Call' />
      <Card.Content meta={task.attributes.from} />
      <Card.Content description={task.attributes.name} />
    </Card>
    }
    else if(task.attributes.channelSid){
      content = <Card fluid>
      <Card.Content header='Chat' />
      <Card.Content meta={task.attributes.channelSid} />
      <Card.Content description={task.attributes.name} />
    </Card>
    }
    else {
      content = <Card fluid>
        <Card.Content header='OTHER' />
      </Card>
    }

    return <div>
      {content}
    </div>;
  }
}

const Label = styled("h1")`
  color: ${grey_dark /*
                    * ✏️ Challenge 3/5: 
                    * Replace 'black' with some theme color, e.g. color.base7
                    * color: ${props => props.theme.??? };
                    */};
  letter-spacing: 2px;
  padding-top: 15px;
`;

const Value = styled("div")`
  color: ${grey_dark /* ✏️ Challenge 4/5: replace 'black' with some theme color, e.g. color.base8 */};
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

//export default withTaskContext(withTheme(CustomCRM));
export default withTaskContext(CustomCRM);