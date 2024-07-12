import ReactDOM from "react-dom";
import { Auth } from "./firebase/AdminFirebase";
import { signInSuccess, signOutUser } from "./Store/Reducers";
import { Provider } from "react-redux";
import { AppRouter } from "./Routes";
import { store } from "./Store/store";
import { socketConnection } from "./socket.ts/socket.connections";

import "./index.css";
import { onAuthStateChanged } from "firebase/auth";
import { listenForGames } from "./firebase/AdminFirebaseListeners/gamesListeners";

export const gameslistener = new listenForGames();

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    renderPage();
    hasRendered = true;
  }
};

const renderPage = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById("root")
  );
};

onAuthStateChanged(Auth, async (firebaseUser) => {
  if (!firebaseUser) {
    renderApp();
    return store.dispatch(signOutUser());
  }
  const token = await firebaseUser.getIdToken();

  const { email, displayName = "", emailVerified } = firebaseUser;
  const verifiedUser = {
    displayName: displayName || "",
    phoneNumber: "",
    email: email || "",
    photoURL: "",
    providerId: "",
    uid: firebaseUser.uid,
    emailVerified: emailVerified,
    idToken: token,
  };
  renderApp();
  store.dispatch(signInSuccess(verifiedUser));
  socketConnection.connect(token);
  return;
});

ReactDOM.render(<p>Loading ... </p>, document.getElementById("root"));
