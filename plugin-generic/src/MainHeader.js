import React from 'react';

const taskListStyles = {
  padding: '10px',
  margin: '0px',
  color: '#fff',
};
const centerStyle = {
  padding: '10px',
  fontSize: '20px',
};
const tcsMoto = [
  "Leading change",
  "Respect for individual",
  "Integrity",
  "Excellence",
  "Learning and sharing"
];


class CustomTaskListComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {  }
      setInterval(() => {
        this.setState({
          moto: tcsMoto[getRandomInt(tcsMoto.length)]
        });
      },2000);
  }
  
  render() { 
    const moto = this.state.moto; 
      return (
        <div style={centerStyle}>Service Desk Agent Screen</div>
      );
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export default CustomTaskListComponent;
