import React from "react";
import { Card } from "primereact/card";
import { CreateBotzForm } from "../../components";

export const CreateBotzContainer: React.FC = () => {
  return (
    <Card className="h-full">
      <CreateBotzForm />
    </Card>
  );
};
