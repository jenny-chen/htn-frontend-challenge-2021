import React, { useState, useEffect } from 'react';
import {
  Text,
  EventTypeText,
  Title,
  Header,
  OutsideBox,
  InsideBox,
  FilterInput,
  EventBox,
  Button,
  EventTitle,
  DateHeader,
} from './components/basics/components.js'
import {
  Anchor,
  Form,
  Label,
  Input,
} from './components/basics'
import Login from './components/login.js'

function App() {
  const [events, setEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterValues, setFilterValues] = useState([]);
  const [scroll, setScroll] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginActive, setLoginActive] = useState(false);

  // TODO:
  //   set it so that when logging in, hide everything else
  //   mobile designsssss
  //   rough sketchesss
  //   write up
  //   fix up the colourrsssss pls

  useEffect(() => {
    console.log("USE EFFECT")

    document.addEventListener("scroll", e => {
      let scrolled = document.scrollingElement.scrollTop;
      setScroll(document.scrollingElement.scrollTop)
      console.log(scrolled)
    })

    function groupByDate(list) {
      return list.reduce(function(accum, current) {
        var property = (new Date(current.start_time)).toLocaleString("en-CA", {weekday: 'long', month: 'long', day: 'numeric'});
        if (!accum[property]) {
          accum[property] = [];
        }
        accum[property].push(current);
        return accum;
      }, {});
    }

    function filterByTerms(allEvents, filterValues) {
      return allEvents.filter(event => filterValues.some(filterValue => ((event.name.toLowerCase()).includes(filterValue.toLowerCase())) || event.event_type.toLowerCase().includes(filterValue.toLowerCase())));
    }

    async function fetchEvents() {
      fetch('https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }')
        .then(response => response.json())
        .then(data => {
          var allEvents = data.data.events
          // sort by start time
          var sortedEvents = allEvents.sort((a, b) => (a.start_time - b.start_time))
          setEvents(sortedEvents);
          var filteredEvents = sortedEvents;
          if (filterValues.length !== 0) {
            // allow user to filter based on search terms
            filteredEvents = filterByTerms(allEvents, filterValues);
          }
          // hide private events if not logged in
          if (!loggedIn) {
            filteredEvents = filteredEvents.filter(event => event.permission === "public")
          }
          setActiveEvents(filteredEvents)
        });
    }

    fetchEvents();

    console.log(events);
    // prevent scroll up each time the hook goes off
    document.scrollingElement.scrollTop = scroll;
  }, [filterValues, expandedEvents, loggedIn])

  function handleFilterChange(e) {
    setInputValue(e.target.value);
    setFilterValues(e.target.value.trim().split(" "));
  }

  function handleEventClick(e, id) {
    var expandedCopy = [].concat(expandedEvents);
    const index = expandedCopy.indexOf(id);
    if (index > -1) {
      expandedCopy.splice(index, 1);
    } else {
      expandedCopy.push(id);
    }
    setExpandedEvents(expandedCopy);
  }

  function getEventType(type) {
    switch (type) {
      case "workshop":
        return "Workshop"
      case "activity":
        return "Activity"
      case "tech_talk":
        return "Tech Talk"
      default:
        return;
    }
  }

  var currentDate = -1;

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    console.log("username: ", username)
    console.log("password: ", password)
    if (username === "username" && password === "password") {
      setLoggedIn(true);
    }
  }

  return (
    <OutsideBox>
      <div style={{ height: "15vh" }}>
        <Title>Schedule</Title>
        {loggedIn ? <Text>Welcome {username}!</Text> :
          <Login
            handleUsernameChange={ handleUsernameChange }
            username={ username }
            handlePasswordChange={ handlePasswordChange }
            password={ password }
            handleSubmit={ handleSubmit }
          />
        }
      </div>
      <Header>
        <div>
          <DateHeader>day placeholder</DateHeader>
        </div>
        <FilterInput
          onChange={ handleFilterChange }
          placeholder="Filter schedule by..."
          type="text"
          value={ inputValue }
        />
      </Header>

      <InsideBox>
        {activeEvents.length === 0 && <EventBox><Text>Whoops, it looks like there are no matching events.</Text></EventBox>}
        {activeEvents.map((event, i) => {
          var start = new Date(event.start_time);
          var end = new Date(event.end_time);
          var startTime = start.toLocaleString("en-CA", {hour: 'numeric', minute: '2-digit'});
          var endTime = end.toLocaleString("en-CA", {hour: 'numeric', minute: '2-digit'});
          var dateText;
          if (currentDate !== start.getDate()) {
            currentDate = start.getDate();
            dateText = start.toLocaleString("en-CA", {weekday: 'long', month: 'long', day: 'numeric'});
          }
          return (
            <>
              <EventBox id={event.id} key={event.id} first={i === 0 ? true : false}>
                <a onClick={ (e) => handleEventClick(e, event.id) }>
                  <EventTypeText type={event.event_type}>{getEventType(event.event_type)}</EventTypeText>
                  <EventTitle type={event.event_type}>{event.name}</EventTitle>
                  <Text>{startTime} - {endTime}</Text>
                </a>
              {(expandedEvents.includes(event.id)) &&
                <>
                  <Text>{event.description}</Text>
                  {event.related_events.length > 0 && <Text bold>Related Events:</Text>}
                  {event.related_events.map((relatedEventId, j) => {
                  return (
                    <Anchor href={"#"+relatedEventId}>
                      <Text>{(events.find(eve => {
                        return eve.id === relatedEventId
                        })).name}
                      </Text>
                    </Anchor>
                  )
                  })}
                </>}
              </EventBox>
            </>
          )
        })}
      </InsideBox>
    </OutsideBox>
  );
}

export default App;

