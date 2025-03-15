import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { VideoViewer } from './VideoViewer';
import { ProgressSpinner } from 'primereact/progressspinner';
import './styles/cockpit-screen.scss';

interface ICockpitScreen {
  id: string;
  name: string;
  apiKey: string;
  sessionId: string;
  token: string;
}

interface CockpitScreenProps {
  screen: ICockpitScreen;
}

export const CockpitScreen: React.FC<CockpitScreenProps> = ({
  screen,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = async () => {
    const element = document.getElementById(`screen-${screen.id}`);
    if (!element) return;

    try {
      if (!document.fullscreenElement) {
        await element.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error with fullscreen:', err);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="cp-screen" id={`screen-${screen.id}`}>
      <div className="cp-screen__header">
        <span className="cp-screen__title">{screen.name}</span>
        <div className="cp-screen__controls">
          <Button
            icon={isFullscreen ? "pi pi-window-minimize" : "pi pi-window-maximize"}
            onClick={handleFullscreenToggle}
            className="p-button-text p-button-sm"
            tooltip={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          />
        </div>
      </div>
      <div className="cp-screen__content">
        {isLoading && (
          <div className="cp-screen__loading">
            <ProgressSpinner />
            <span>Connecting to stream...</span>
          </div>
        )}
        {hasError && (
          <div className="cp-screen__error">
            <i className="pi pi-exclamation-triangle" />
            <span>Failed to connect to stream</span>
            <Button label="Retry" onClick={() => setIsLoading(true)} />
          </div>
        )}
        <VideoViewer
          apiKey={screen.apiKey}
          sessionId={screen.sessionId}
          token={screen.token}
          onLoaded={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </div>
    </div>
  );
}; 