import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { fetchCredentialsAttempt } from "../../Store/Reducers";
import { getSessionCredentials, userState } from "../../Store/Selectors";
import { ControlPad } from "../../components/";
import { BotStream } from "../BotStream/BotStream";
import "./TankCockpit";
import { tankSteeringInterface } from "../../Models";
import { socketConnection } from "../../socket.ts/socket.connections";

export interface ITankCockpit {
  botId: string;
  sessionId: string;
}

export const TankCockpit: React.FC<ITankCockpit> = ({ botId, sessionId }) => {
  const dispatch = useAppDispatch();
  const credentials = useAppSelector(getSessionCredentials);
  const [turretEnabled, setTurretEnabled] = useState<boolean>(false);

  const userToken = useAppSelector(userState).user?.idToken;

  const getCredentials = () => {
  
    if (!credentials.accessToken) return dispatch(fetchCredentialsAttempt({ botId, sessionId }));
  };

  const handleTurretChange = (key:string) => {
    if(turretEnabled) {
      console.log('should send message')
      if(key==='stop') return socketConnection.sendControls({direction:'turretLeft', angle:0, speed:0 }, userToken ?? "", botId);
      if(key==='stop') return socketConnection.sendControls({direction:'turretRight', angle:0, speed:0 }, userToken ?? "", botId);
    } 
    if(!turretEnabled) {
      console.log('skfsk')
    }
    console.log('key',key);
  }

  useEffect(()=>{
    console.log('turret status', turretEnabled)
  }, [turretEnabled])

  useEffect(() => {
    socketConnection.connectToBot(userToken ?? "", botId);
    getCredentials();
  }, [credentials.accessToken]);

  useEffect(()=>{
    if(turretEnabled) {
      console.log('uodated listener')
      window.addEventListener('keydown',(e)=>handleTurretChange(e.key));
      window.addEventListener('keyup',()=>handleTurretChange('stop'));
    }
    
    return ()=>{
      window.removeEventListener('keydown',(event: KeyboardEvent)=> handleTurretChange);
      window.removeEventListener('keydown', (event: KeyboardEvent)=> handleTurretChange('stop'));
    }
  },[turretEnabled])

  const handleControlsChange = (controls: tankSteeringInterface) => {
    socketConnection.sendControls(controls, userToken ?? "", botId);
  };

  return (
    <div onMouseLeave={()=>setTurretEnabled(false)} onMouseEnter={()=> setTurretEnabled(true)} className="testclass card h-full">
      {turretEnabled?'ture':'false'}
      <ControlPad onControlsChange={handleControlsChange} />

      {credentials.accessToken && credentials.sessionId && (
     
          <BotStream accessToken={credentials.accessToken} sessionId={credentials.sessionId} streamId="3f346364-6282-4f4e-ab60-999c9bd7e78c" streamId2="709b88a0-a44a-4cba-b4f5-0ab52f771bac"/>
        
      )}
    </div>
  );
};
