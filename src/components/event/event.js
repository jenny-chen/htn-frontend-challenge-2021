import React from 'react';
import {
  Box,
  DateHeader,
  EventBox,
  EventTitle,
  Header,
  Text,
} from '../basics'
import Speakers from './speakers.js';
import RelatedEvents from './relatedEvents.js';

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

function Event({
  activeEvents,
  events,
  expandedEvents,
  groupedByDateEvents,
  handleEventExpand,
  loggedIn
}) {
  return (
    Object.keys(groupedByDateEvents).map((day, dayIndex) => {
    return (
      <>
        <Header>
          <DateHeader>{day}</DateHeader>
        </Header>
        <Box inside>
          {activeEvents.length === 0 &&
            <EventBox>
              <Text>Whoops, it looks like there are no matching events.</Text>
            </EventBox>
          }
          {groupedByDateEvents[day].map((event, eventIndex) => {
            var start = new Date(event.start_time);
            var end = new Date(event.end_time);

            var startTime = start.toLocaleString("en-CA", {hour: 'numeric', minute: '2-digit'});
            var endTime = end.toLocaleString("en-CA", {hour: 'numeric', minute: '2-digit'});
            var longDate = (new Date(event.start_time)).toLocaleString("en-CA", {weekday: 'long', month: 'long', day: 'numeric'});
            return (
              <EventBox id={event.id} key={event.id} first={eventIndex === 0 ? true : false}>
                <a href="/#" onClick={ (e) => handleEventExpand(e, event.id) }>
                  {/* Basic information; thumbnail-esque */}
                  <Text type={event.event_type}>{getEventType(event.event_type)}</Text>
                  <EventTitle type={event.event_type}>{event.name}</EventTitle>
                  <Text bold>{longDate}</Text>
                  <Text>{startTime} - {endTime}</Text>
                </a>
                {/* Detailed information to show when expanded*/}
                {(expandedEvents.includes(event.id)) &&
                  <>
                    <Speakers event={ event }/>
                    <Text>{event.description}</Text>
                    <RelatedEvents
                      event={ event }
                      events={ events }
                      loggedIn={ loggedIn }
                    />
                  </>
                }
              </EventBox>
            )
          })}
        </Box>
      </>
    )
  }))
}

export default Event
