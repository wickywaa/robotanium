import React, { useRef, useState, useEffect } from "react";
import { tankSteeringInterface, controlPadDirections } from "../../Models";
import "./controlsTouchPad.scss";

interface controlPad {
  onControlsChange: (controls: tankSteeringInterface) => void;
}

export const ControlPad: React.FC<controlPad> = (props) => {
  const [controlsOn, setControlsOn] = useState<boolean>();
  const [speed, setSpeed] = useState<number>(0);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const controlsClass = controlsOn ? "control-pad-on" : "control-pad-off";

  const controlPadRef = useRef<HTMLDivElement>(null);
  const controlPadPositions = controlPadRef.current?.getBoundingClientRect();
  const leftPosition = controlPadPositions?.left ?? 0;
  const upPosition = controlPadPositions?.top ?? 0;
  const diameter = controlPadPositions?.width ?? 0;
  const radius = diameter / 2;
  const onePercent = radius / 100;
  const centerY = upPosition + radius;
  const centerX = leftPosition + radius;

  const getAdjacentSide = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections): number => {
    if (direction === "forwardRight" || direction === "backRight") return (event.clientX - centerX) / onePercent;

    return (centerX - event.clientX) / onePercent;
  };

  const getOppositeSide = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections): number => {
    if (direction === "forwardRight" || direction === "forwardLeft" || direction === "moveForward")
      return (centerY - event.clientY) / onePercent;
    if (direction === "backLeft" || direction === "backRight" || direction === "moveBack")
      return (event.clientY - centerY) / onePercent;
    return 0;
  };

  const calcDirection = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections) => {
    const adjacentSide = getAdjacentSide(event, direction);
    const oppositeSide = getOppositeSide(event, direction);
    const hypotenuse = Math.round(Math.sqrt(adjacentSide ** 2 + oppositeSide ** 2));
    const angle = Math.round((Math.atan(oppositeSide / adjacentSide) * 180) / Math.PI);
    setSpeed(hypotenuse);
    props.onControlsChange({ direction, angle, speed: hypotenuse });
  };

  const handleSteeringMouseMove = (event: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>, direction: controlPadDirections) => {
    if (!controlsOn || !mouseDown) return;
    calcDirection(event, direction);
  };
  const handleSteeringTouchMove = (event: React.TouchEvent<HTMLDivElement>, direction: controlPadDirections) => {
    if (!controlsOn || !mouseDown) return;

    console.log(event)
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections) => {
    if (!controlsOn) return;
    calcDirection(event, direction);
    setMouseDown(true);
  };
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false);
    props.onControlsChange({ direction: "stop", angle: 0, speed: 0 });
  };

  useEffect(() => {
    if (!controlsOn) {
      props.onControlsChange({ direction: "stop", angle: 0, speed: 0 });
    }
  }, [controlsOn]);

  return (
    <div ref={controlPadRef} className={`controls-pad-container ${controlsClass}`} onMouseLeave={() => setControlsOn(false)}>
      <div
        className={`controls-pad-forward ${controlsClass}`}
        onPointerUp={handleMouseUp}
        onPointerDown={(event) => handleMouseDown(event, "moveForward")}
        onPointerMove={(event) => handleSteeringMouseMove(event, "moveForward")}
      ></div>
      <div
        className={`controls-pad-turn-up-right`}
        onPointerUp={handleMouseUp}
        onPointerMove={(event) => handleSteeringMouseMove(event, "forwardRight")}
        onPointerDown={(event) => handleMouseDown(event, "forwardRight")}
      ></div>
      <div
        className={`controls-pad-spin-right ${controlsClass}`}
        onPointerUp={handleMouseUp}
        onPointerMove={(event) => handleSteeringMouseMove(event, "spinRight")}
        onPointerDown={(event) => handleMouseDown(event, "spinRight")}
      ></div>
      {speed}
      <div
        className={`controls-pad-turn-down-right`}
        onPointerUp={handleMouseUp}
        onPointerMove={(event) => handleSteeringMouseMove(event, "backRight")}
        onPointerDown={(event) => handleMouseDown(event, "backRight")}
      ></div>
      <div
        className={`controls-pad-back ${controlsClass}`}
        onPointerUp={handleMouseUp}
        onPointerMove={(event) => handleSteeringMouseMove(event, "moveBack")}
        onPointerDown={(event) => handleMouseDown(event, "moveBack")}
      ></div>
      <div
        className={`controls-pad-turn-down-left`}
        onPointerUp={handleMouseUp}
        onPointerMove={(event) => handleSteeringMouseMove(event, "backLeft")}
        onPointerDown={(event) => handleMouseDown(event, "backLeft")}
      ></div>
      <div
        className={`controls-pad-spin-left ${controlsClass}`}
        onPointerUp={handleMouseUp}
        onPointerMove={(event) => handleSteeringMouseMove(event, "spinLeft")}
        onPointerDown={(event) => handleMouseDown(event, "spinLeft")}
      ></div>
      <div
        className={`controls-pad-turn-up-left`}
        onPointerUp={handleMouseUp}
        onPointerMove={(event) => handleSteeringMouseMove(event, "forwardLeft")}
        onPointerDown={(event) => handleMouseDown(event, "forwardLeft")}
      ></div>
      <div className={`controls-pad-center ${controlsClass}`} onClick={() => setControlsOn(!controlsOn)}></div>
    </div>
  );
};
