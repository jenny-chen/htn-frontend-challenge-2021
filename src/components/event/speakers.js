import React from 'react';
import {
  Image,
  Text,
} from '../basics';

function Speakers({ event }) {
  return (
    event.speakers.length > 0 &&
      <Text><strong>Speakers:</strong>
        {event.speakers.map((speaker, speakerIndex) => {
          var name = speakerIndex === 0 ? " "+speaker.name : ", "+speaker.name;
          return (
            <>
              {speaker.profile_pic && <Image src={speaker.profile_pic} alt={"profile picture of "+speaker.name} />}
              {name}
            </>
          )
        })}
      </Text>
  )
}

export default Speakers
