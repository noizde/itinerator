// npm components
var React = require('react/addons');

var _ = require('underscore');

// stores
var ChunkStore = require('./stores/ChunkStore');

var Itinerator = React.createClass({
  getInitialState: function(){
    return {
      currentUser: {
        prefs: {}
      },
      itinerary: [],
      hideEarlyBuffer: true,
      hidePrepareBuffer: true
    }
  },
  _updateItinerary: function() {
    var itinerary = ChunkStore.chunks;
    this.setState({
      itinerary: _.sortBy(itinerary, 'time')
    });
  },
  componentDidMount: function() {
    ChunkStore.bind('chunkCreated', this._updateItinerary);
  },
  updateInput: function(field) {
    return function(e){
      var newState = {};
      newState[field] = e.target.value;
      this.setState(newState, function(){
        // console.log(this.state)
      });
    }.bind(this);
  },
  sampleActivity: function() {
    var chunk = {
      label: 'Hackathon',
      location: 'Kenneth\'s House',
      time: '1800',
      earlyBuffer: 60,
      prepareBuffer: 20
    };
    this.setPreferences();
    ChunkStore.planActivity(chunk);
  },
  sampleActivity2: function() {
    var chunk = {
      label: 'Movie',
      location: 'Tagaytay',
      time: '2000',
      earlyBuffer: 60,
      prepareBuffer: 20
    };
    this.setPreferences();
    ChunkStore.planActivity(chunk);
  },
  planActivity: function() {
    var chunk = {
      label: this.state.label,
      location: this.state.location,
      time: this.state.time,
      earlyBuffer: this.state.earlyBuffer,
      prepareBuffer: this.state.prepareBuffer
    };
    ChunkStore.planActivity(chunk);
    this.setPreferences();
  },
  setPreferences: function() {
    var newState = {
      currentUser: {
        prefs: {
          prepareBuffer: 20,
          earlyBuffer: 10
        }
      }
    };
    this.setState(newState);
  },
  toggleHideEarlyBuffer: function() {
    this.setState({
      hideEarlyBuffer: !this.state.hideEarlyBuffer
    })
  },
  toggleHidePrepareBuffer: function() {
    this.setState({
      hidePrepareBuffer: !this.state.hidePrepareBuffer
    })
  },
  render: function() {
    return (
      <div id="main">
        <h1 id="header">Let's go somewhere!</h1>
        <br/>
        <div id="creation">
          <div>What is the event?</div> 
          <input value={this.state.label} placeholder="Party" onChange={this.updateInput('label')} type="text"/>

          <div>Where are you going?</div> 
          <input value={this.state.location} placeholder="BGC" onChange={this.updateInput('location')} type="text"/>

          <div>What time is your activity?</div> 
          <input value={this.state.time} placeholder="1800" onChange={this.updateInput('time')} type="text"/>

          {(this.state.currentUser.prefs.earlyBuffer && this.state.hideEarlyBuffer) ?
            <div onClick={this.toggleHideEarlyBuffer}>---</div>
          : 
            <div>
              <div>How early do you want to be? {this.state.currentUser.prefs.earlyBuffer && (<button onClick={this.toggleHideEarlyBuffer}>[Hide]</button>)} </div> 
              <input value={this.state.earlyBuffer} onChange={this.updateInput('earlyBuffer')} type="text"/>
              <span>&nbsp;minutes</span>
            </div>
          }

          {(this.state.currentUser.prefs.earlyBuffer && this.state.hidePrepareBuffer) ?
            <div onClick={this.toggleHidePrepareBuffer}>---</div>
          : <div>
              <div>How long will it take for you to prepare? {this.state.currentUser.prefs.earlyBuffer && (<button onClick={this.toggleHidePrepareBuffer}>[Hide]</button>)} </div>
              <input value={this.state.prepareBuffer} onChange={this.updateInput('prepareBuffer')} type="text"/>
              <span>&nbsp;minutes</span>
            </div>
          }

          <br/>
          <br/>
          <button className="button" onClick={this.planActivity}> Create Activity </button>
          <br/>
          <br/>
          <button className="button" onClick={this.sampleActivity2}> Sample Activity 1</button>
          <br/>
          <button className="button" onClick={this.sampleActivity}> Sample Activity 2 </button>

          <br/>

        </div>

        <div id="itinerary">
          <div>Itinerary:</div>
          {this.state.itinerary.length ? (
            <ul>
              {this.state.itinerary.map(function(i){
                return  (
                  <li className="chunk" key={i.label}>
                    <div>{i.label}</div>
                    {i.location && (<div>Location: {i.location}</div>)}
                    <div>Time: {i.time}</div>
                    {i.duration && (<div>Duration: {i.duration}</div>)}
                    
                  </li>
                )
              }.bind(this))}
            </ul>
          ) : 
            <div>None yet.</div>
          }
        </div>
      </div>
    );
  }
});
module.exports = Itinerator;