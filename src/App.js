import React, { useState, useEffect } from 'react';
import {
  Box,
  Header,
  Input,
  Text,
  Title,
} from './components/basics'
import Event from './components/event/event.js'
import Login from './components/login.js'

// helper functions

function filterByTerms(allEvents, filterValues) {
  return allEvents.filter(event => filterValues.some(filterValue => ((
    event.name.toLowerCase()).includes(filterValue.toLowerCase())) ||
    event.event_type.toLowerCase().includes(filterValue.toLowerCase()) ||
    (new Date(event.start_time)).toLocaleString("en-CA", {weekday: 'long', month: 'long', day: 'numeric'}).toLowerCase().includes(filterValue.toLowerCase()) ||
    event.speakers.some(speaker => (speaker.name.toLowerCase().includes(filterValue.toLowerCase())))))
}

function groupByDate(list) {
  return list.reduce(function(accum, current) {
    var property = (new Date(current.start_time)).toLocaleString("en-CA", {month: 'long', day: 'numeric'});
    if (!accum[property]) {
      accum[property] = [];
    }
    accum[property].push(current);
    return accum;
  }, {});
}

function App() {
  // state
  const [events, setEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [groupedByDateEvents, setGroupedByDateEvents] = useState({});
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterValues, setFilterValues] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginActive, setLoginActive] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [scroll, setScroll] = useState();

  useEffect(() => {
    document.addEventListener("scroll", e => {
      setScroll(document.scrollingElement.scrollTop);
    })

    async function fetchEvents() {
      fetch('https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }')
        .then(response => response.json())
        .then(data => {
          var allEvents = data.data.events;

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
            filteredEvents = filteredEvents.filter(event => event.permission === "public");
          }
          setActiveEvents(filteredEvents);

          setGroupedByDateEvents(groupByDate(filteredEvents));
        });
    }

    fetchEvents();

    // prevent scroll up each time the hook goes off
    document.scrollingElement.scrollTop = scroll;
  }, [loginActive, filterValues, expandedEvents, loggedIn])


  // handler functions

  function handleFilterChange(e) {
    setInputValue(e.target.value);
    setFilterValues(e.target.value.trim().split(" "));
  }

  function handleEventExpand(e, id) {
    var expandedCopy = [].concat(expandedEvents);
    const index = expandedCopy.indexOf(id);
    if (index > -1) {
      expandedCopy.splice(index, 1);
    } else {
      expandedCopy.push(id);
    }
    setExpandedEvents(expandedCopy);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // hard-coded login details
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
    setLoggedIn(false);
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
            <Input
              button
              onClick={ loggedIn ? handleLogout : handleLogin }
              type="button"
              value={ loggedIn ? "Logout" : "Login" }
            />
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

        <Event
          activeEvents={ activeEvents }
          groupedByDateEvents={ groupedByDateEvents }
          expandedEvents={ expandedEvents }
          events={ events }
          handleEventExpand={ handleEventExpand }
          loggedIn={ loggedIn }
        />
      </Box>
  );
}

export default App;

