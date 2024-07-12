import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

import { useAppSelector } from "../../Store/hooks";
import { errormessageSelector, warnMessageSelector, infoMessageSelector, successMessagSelector } from "../../Store/Selectors";

export const ToastComponent: React.FC = () => {
  const toast = useRef<Toast>(null);

  const errorMesage = useAppSelector(errormessageSelector);
  const warnMessage = useAppSelector(warnMessageSelector);
  const infoMessage = useAppSelector(infoMessageSelector);
  const successMessage = useAppSelector(successMessagSelector);

  useEffect(() => {
    if (toast.current != null && errorMesage.length > 1) {
      toast.current.show({ severity: "error", detail: `${errorMesage}` });
    }
  }, [errorMesage]);

  useEffect(() => {
    if (toast.current != null && warnMessage.length > 1) {
      toast.current.show({ severity: "warn", detail: `${warnMessage}` });
    }
  }, [warnMessage]);

  useEffect(() => {
    if (toast.current != null && infoMessage.length > 1) {
      toast.current.show({ severity: "info", detail: `${infoMessage}` });
    }
  }, [infoMessage]);

  useEffect(() => {
    if (toast.current != null && successMessage.length > 1) {
      toast.current.show({ severity: "success", detail: `${successMessage}` });
    }
  }, [successMessage]);

  return (
    <div>
      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
};
