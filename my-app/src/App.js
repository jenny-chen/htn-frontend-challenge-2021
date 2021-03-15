import React, { useState, useEffect } from 'react';
import {
  Anchor,
  Box,
  DateHeader,
  EventBox,
  EventTitle,
  Form,
  Header,
  Input,
  Label,
  Text,
  Title,
} from './components/basics'
import Login from './components/login.js'

function App() {
  const [events, setEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [groupedByDateEvents, setGroupedByDateEvents] = useState({});
  const [activeDay, setActiveDay] = useState([]);
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterValues, setFilterValues] = useState([]);
  const [scroll, setScroll] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginActive, setLoginActive] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // TODO:
  //   set it so that when logging in, hide everything else
  //   mobile designsssss
  //   rough sketchesss
  //   write up
  //   fix up the colourrsssss pls

  useEffect(() => {
    document.addEventListener("scroll", e => {
      let scrolled = document.scrollingElement.scrollTop;
      setScroll(document.scrollingElement.scrollTop)
      console.log(scrolled)
    })

    function groupByDate(list) {
      return list.reduce(function(accum, current) {
        // var property = (new Date(current.start_time)).toLocaleString("en-CA", {weekday: 'long', month: 'long', day: 'numeric'});
        var property = (new Date(current.start_time)).toLocaleString("en-CA", {month: 'long', day: 'numeric'});
        if (!accum[property]) {
          accum[property] = [];
        }
        accum[property].push(current);
        return accum;
      }, {});
    }

    function filterByTerms(allEvents, filterValues) {
      return allEvents.filter(event => filterValues.some(filterValue => ((
        event.name.toLowerCase()).includes(filterValue.toLowerCase())) ||
        event.event_type.toLowerCase().includes(filterValue.toLowerCase()) ||
        (new Date(event.start_time)).toLocaleString("en-CA", {weekday: 'long', month: 'long', day: 'numeric'}).toLowerCase().includes(filterValue.toLowerCase())))
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

          setGroupedByDateEvents(groupByDate(filteredEvents))
        });
    }

    fetchEvents();

    console.log(events);
    // prevent scroll up each time the hook goes off
    document.scrollingElement.scrollTop = scroll;
  }, [loginActive, filterValues, expandedEvents, loggedIn])

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
    if (username === "username") {
      setUsernameError(false);
      if (password === "password") {
        setLoggedIn(true);
        setLoginActive(false);
        setPasswordError(false);
      } else {
        setPasswordError(true);
      }
    } else {
      setUsernameError(true);
      setPasswordError(true);
    }
  }

  function handleCancel(e) {
    setLoginActive(false);
    setUsernameError(false);
    setPasswordError(false);
  }

  function handleLogin(e) {
    setLoginActive(true);
  }

  function handleLogout(e) {
    setLoginActive(false);
  }

  return (
    loginActive ?
      <Login
        handleUsernameChange={ handleUsernameChange }
        username={ username }
        handlePasswordChange={ handlePasswordChange }
        password={ password }
        handleSubmit={ handleSubmit }
        handleCancel={ handleCancel }
        usernameError = { usernameError }
        passwordError = { passwordError}
      />
      :
      <Box outside>
        <Box top>
          <Title>Schedule</Title>
          <Box login loggedIn={ loggedIn }>
            {loggedIn ?
              <Input
                button
                onClick={ handleLogout}
                type="button"
                value="Logout"
              />
              :
              <Input
                button
                onClick={ handleLogin }
                type="button"
                value="Login"
              />
            }
          </Box>
        </Box>
        {loggedIn && <Text bold>Welcome {username}!</Text>}
        <Header filter>
          <Input
            filter
            onChange={ handleFilterChange }
            placeholder="Filter schedule by..."
            type="text"
            value={ inputValue }
          />
        </Header>

        {Object.keys(groupedByDateEvents).map((day, i) => {
          return (
            <>
              <Header>
                <DateHeader>{day}</DateHeader>
              </Header>
              <Box inside>
                {activeEvents.length === 0 && <EventBox><Text>Whoops, it looks like there are no matching events.</Text></EventBox>}
                {groupedByDateEvents[day].map((event, j) => {
                  var start = new Date(event.start_time);
                  var end = new Date(event.end_time);
                  var startTime = start.toLocaleString("en-CA", {hour: 'numeric', minute: '2-digit'});
                  var endTime = end.toLocaleString("en-CA", {hour: 'numeric', minute: '2-digit'});
                  var longDate = (new Date(event.start_time)).toLocaleString("en-CA", {weekday: 'long', month: 'long', day: 'numeric'});
                  var dateText;
                  if (currentDate !== start.getDate()) {
                    currentDate = start.getDate();
                    dateText = start.toLocaleString("en-CA", {weekday: 'long', month: 'long', day: 'numeric'});
                  }
                  return (
                    <>
                      <EventBox id={event.id} key={event.id} first={j === 0 ? true : false}>
                        <a onClick={ (e) => handleEventClick(e, event.id) }>
                          <Text type={event.event_type}>{getEventType(event.event_type)}</Text>
                          <EventTitle type={event.event_type}>{event.name}</EventTitle>
                          <Text bold>{longDate}</Text>
                          <Text>{startTime} - {endTime}</Text>
                        </a>
                      {(expandedEvents.includes(event.id)) &&
                        <>
                          <Text>{event.description}</Text>
                          {event.related_events.length > 0 && <Text bold>Related Events:</Text>}
                          {event.related_events.map((relatedEventId, j) => {
                            var targetEvent = (events.find(eve => {
                              return eve.id === relatedEventId
                            }))
                            if (!loggedIn && targetEvent.permission === "private") {
                              return
                            } else {
                              return (
                                <Anchor href={"#"+relatedEventId}>
                                  <Text>{targetEvent.name}</Text>
                                </Anchor>
                              )
                            }
                          })}
                        </>}
                      </EventBox>
                    </>
                  )
                })}
              </Box>
            </>
          )
        })}
      </Box>
  );
}

export default App;

