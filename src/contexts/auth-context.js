import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import URI from "./url-context";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const expirationTime = new Date();
expirationTime.setMinutes(expirationTime.getMinutes() + 120);

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  expirationTime,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = JSON.parse(window.sessionStorage.getItem("ciisTacnaAdmin"));

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
        expirationTime,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (username, password) => {
    let response = await fetch(URI.session, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let user;

    // const user = {
    //   id: "5e86809283e28b96d2d38537",
    //   avatar: "/assets/avatars/avatar-anika-visser.png",
    //   name: "Anika Visser",
    //   email: "anika.visser@devias.io",
    // };

    if (!response.ok) {
      // let userData = await response.json();
      // user = userData.resources[0];
      // user.avatar = "/assets/logos/logo-ciis-xxiv.png";

      user = {
        id: "1",
        avatar: "/assets/logos/logo-ciis-xxiv.png",
        name: "Anselmo",
        firstLastname: "Farfan",
        secondLastname: "Pajuelo",
        phone: "+51 984532631",
        email: "afarfanp@unjbg.edu.pe",
      };

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } else {
      throw new Error("Por favor revisa tu usuario y contraseña.");
    }
  };

  const signUp = async (email, name, password) => {
    throw new Error("Registro no implementado");
  };

  const signOut = () => {
    window.sessionStorage.removeItem("ciisTacnaAdmin");
    window.sessionStorage.removeItem("authenticated");
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
