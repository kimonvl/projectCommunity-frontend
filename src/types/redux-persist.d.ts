declare module "redux-persist/integration/react" {
  import * as React from "react";

  export interface PersistGateProps {
    loading?: React.ReactNode;
    persistor: any;
    children?: React.ReactNode;
  }

  export class PersistGate extends React.Component<PersistGateProps> {}
}
