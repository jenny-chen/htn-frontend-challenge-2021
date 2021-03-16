import React from 'react';
import {
  Anchor,
  Text,
} from '../basics';

function RelatedEvents({ event, events, loggedIn, relatedEvents }) {
  return (
    event.related_events.length > 0 &&
      <>
        <Text bold>Related Events:</Text>
        {event.related_events.map((relatedEventId, relatedEventIndex) => {
          var targetEvent = (events.find(eve => {
            return eve.id === relatedEventId
          }))
          if (loggedIn || targetEvent.permission === "public") {
            return (
              <Anchor href={"#"+relatedEventId}>
                <Text>{targetEvent.name}</Text>
              </Anchor>
            )
          }
          return ""
        })}
      </>
  )
}

export default RelatedEvents
