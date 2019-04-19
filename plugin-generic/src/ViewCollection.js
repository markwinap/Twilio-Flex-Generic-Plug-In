import React, { Component } from 'react';
import { withTheme } from '@twilio/flex-ui';
import styled from "react-emotion";

class SampleView extends Component {

    render() {
        return (
            <div>
                <Canvas>
                <Container>
                    <HeaderLine>
                        <Header>
                            <Value>Pikachu #025</Value>
                        </Header></HeaderLine>
                    <Photo alt="" src="https://thumbs.gfycat.com/IdealPeacefulAmericanbittern-max-1mb.gif"></Photo>
                    <Label>Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokémon mistook the intensity of its charge</Label>
                </Container>
                </Canvas>
                
            </div>
        );
    }
}

const Label = styled("h1")`
  color: ${'color.base7'};
  letter-spacing: 2px;
  padding-top: 15px;
`;

const Value = styled("div")`
  color: ${'color.base8' };
`;

const HeaderLine = styled("div")`
  border-style: solid;
  border-width: 0px 0px 4px;
  border-color: rgb(25, 118, 210);
`;

const Container = styled("div")`
  color: ${props => props.theme.calculated.textColor}};
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


const Photo = styled("img")`
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
  width:100%;
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
  background-color: ${props => props.theme.TaskCanvas.Container.background};
`;

export default withTheme(SampleView)