import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostDraw from './components/PostDraw';
import Lobby from './components/Lobby';
import LandingPage from './components/LandingPage';
import Settings from './components/Settings';
import DrawingCanvas from './components/DrawingLobby/DrawingCanvas';
import Chat from './components/Chat/Chat';
import About from './components/About';
import FreeDraw from './components/RoomModes/FreeDraw';
import Error from './components/Error';

import socket, {initSocket} from './socket';


class Routes extends Component {
  componentDidMount() {
    initSocket(socket)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/?:roomId' component={LandingPage} />
          <Route exact path='/settings' component={Settings} />
          <Route path='/canvas' component={DrawingCanvas} />
          <Route path='/chat' component={Chat} />
          <Route path='/lobby' component={Lobby} />
          <Route path='/postdraw' component={PostDraw} />
          <Route path='/about' component={About} />
          <Route path='/freeDraw' component ={FreeDraw} />
          <Route path='/error' component={Error} />
        </Switch>
      </div>
    );
  }
}

export default(Routes);