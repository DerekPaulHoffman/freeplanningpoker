import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import * as sessionActions from 'Actions/session';

// Templates
import Cards from 'Components/Cards/Cards.jsx';
import Card from 'Components/Card/Card.jsx';

//Sockets
import * as Sockets from 'Utilities/api.js';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: 'no timestamp yet',
            messageArray: [],
            roomUsers: [],
            showVotes: false,
        };
    }

    componentWillMount() {
        const roomId = this.props.match.params.id;
        Sockets.joinRoom(roomId);
    }

    componentDidMount() {
        Sockets.readRoomUsers((roomUsers) => {
            this.readRoomUsers(roomUsers)
        });

        Sockets.readMessage((message, theUser) => {

            console.log(this.state.roomUsers);
            var foundIndex = this.state.roomUsers.findIndex(x => x.id == theUser);
            this.state.roomUsers[foundIndex].vote = message
            this.forceUpdate();
        });
    }

    readRoomUsers = (roomUsers) => {
        console.log('readRoomUsers', roomUsers);

        this.setState({
            roomUsers: roomUsers,
        });
    }


    emitOnClick = (numberVal) => {
        Sockets.sendMessage(numberVal, this.props.session.room);
    }

    showVotes = () => {
        this.setState({
            showVotes: !this.state.showVotes,
        });
    }

    render() {
        const { session } = this.props;
        return (
            <div>
                <div className="col-xs-6">
                    <h1>Welcome to the {session.room} room</h1>
                </div>                
                <Cards emitOnClick={this.emitOnClick} />
                <button
                    onClick={this.showVotes}
                >
                    show votes
				</button>
                <ul className="card-list col-xs-12">
                    {
                        this.state.roomUsers.map((roomUser, index) => {
                            return (
                                <div key={index + 1}>
                                    <Card cardName={roomUser.userName} cardReady={(roomUser.message) != '' && 'readyToFlip'} className={(roomUser.vote && this.state.showVotes) != '' && 'card--flipped'} number={roomUser.vote}/>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state };
}

export default withRouter(connect(mapStateToProps)(Room));