import ReactDOM from "react-dom/client"; 
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from './reducer';
import { fetchSession } from './utils';
//Bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById("root"));


const renderApp = (user)=> {
  const store = configureStore({
    reducer: reducer, 
    preloadedState:{
      session: {
        user: user,
      }
    }
  });
  root.render(
    <Provider store={store}>
      <App user={user}/>
    </Provider>    
    
  );
}

(async () => renderApp(await fetchSession()))();