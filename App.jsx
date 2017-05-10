import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';

class MessageData extends React.Component {
  render() {
  
    return <tr><td colSpan="2">{this.props.msgInfo['action_time']}</td><td>{this.props.msgInfo['from']}</td><td colSpan="2">{this.props.msgInfo['message_text']}</td></tr>;
  }
}



class MsgDataRow extends React.Component {

  render() {

    var rows = [];
    
    var profileLogins = Object.keys(this.props.products);
  
    var inputList = this.props.products[this.props.profileId]['messages'];
    inputList.forEach(function(product) { 
    rows.push(<MessageData msgInfo={product} />);
     
     
    
     
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Who Wrote Message</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}



class ProfileMsgHistory extends React.Component {
    constructor() {

        super();
       
         this.state = {
            items: {},
            found :0
          }
    }
    componentDidMount() {
      getHistory().then(data => {

      this.setState({
        items: data.data,found:1
      });
    })
.catch(error => {
 
      throw error;
    })
      

    }
    render() {

     if(this.state.found==1){
          return (
            <div>
            
             
             
              <MsgDataRow products={this.state.items} profileId ={this.props.profileId}/>
           
            </div>
          );
        }else{
          return null;
        }
    }
}


const getHistory = () => {
  return fetch('http://ww4.shaadi.com/api/messages/tSH34845954?&fieldset=messages&type=unified&recipient_ids=3SH68344993&cut_off_criteria=&status=all&access_token=6E7D2DA6D3953058DB75714AC400B5841493371934|tSH34845954|') 
    .then(response => {
      return response.json()
        .then(({data}) =>  ({data}));
    })
    .catch(error => {
      throw error;
    })
};

ReactDOM.render(
  <ProfileMsgHistory profileId={'3SH68344993'} />,
  document.getElementById('container')
);
