import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ 
    adapter: new Adapter(),    
    disableLifecycleMethods: true
});

//localStorage
let store = {};
Object.defineProperty(global.window, "localStorage", {
  writable: true,
  value: {
    getItem: (key) => {
        return store[key];
    },
    setItem: (key, value) => {
        store[key] = value.toString();
    },
    clear: () => { store = {}; },
    removeItem: (key) => { delete store[key]; }
  }
});

//windows.location.href
Object.defineProperty(global.window.location, "href", {
    writable: true, 
    value: "localhost:3000"
});