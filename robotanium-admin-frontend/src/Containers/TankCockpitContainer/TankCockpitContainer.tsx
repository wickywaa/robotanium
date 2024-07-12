import React from "react";
import { TankCockpit } from "../../components/";
import { useSearchParams } from "react-router-dom";

export const TankCockpitContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const botId = searchParams.get("botId");
  const sessionId = searchParams.get("sessionId");

  return (
    <>
      {botId?.length && sessionId?.length && <TankCockpit botId={botId ?? ""} sessionId={sessionId ?? ""} />}

      {botId === null || (sessionId === null && <div>no credentials</div>)}
    </>
  );
};
