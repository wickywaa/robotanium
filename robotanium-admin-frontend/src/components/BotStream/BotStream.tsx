import React, { useEffect, useState } from "react";
import { Session } from "@opentok/client";
import "./BotStream.scss";
const OT = require("@opentok/client");

interface botStream {
  accessToken: string;
  sessionId: string;
  streamId: string;
  streamId2: string;
}
const apiKey = process.env.REACT_APP_OPENTOK_API_KEY;

export const BotStream: React.FC<botStream> = ({ accessToken, sessionId, streamId, streamId2 }) => {
  const [session, setSession] = useState<Session | null>(null);

  function handleError(error: any) {
    if (error) {
      alert(error.message);
    }
  }

  const setListener = () => {
    if (!session) return;
    session.on("streamCreated", (event) => {
      console.log(event.stream.streamId)
      console.log(streamId)
      if(event.stream.streamId===streamId) {
        session.subscribe(event.stream, "subscriber", {
          height: "50%",
          width:'100%',
          insertMode:'replace'
          //insertDefaultUI:false,
        })
      }

      if(event.stream.streamId===streamId2) {
        session.subscribe(event.stream, "subscriber2", {
          height: "50%",
          width:'100%',
          insertMode:'replace'
          //insertDefaultUI:false,
        })
      }
    });

    session.connect(accessToken, (error: any) => {
      if (error) {
        handleError(error);
      }
    });
  };

  useEffect(() => {
    setSession(OT.initSession(apiKey, sessionId));
  }, [sessionId]);

  useEffect(() => {
    if (session) return setListener();
  }, [session]);

  return (
    <div className="testname " style={{height:'100%',width:'100%'}}>
      <div className="subscriber " id="subscriber" style={{width:'100%', height:'50%'}}></div>
      <div className="subscriber2 " id="subscriber2" style={{width:'100%', height:'50%'}}></div>
    </div>
  );
};
