import { createRoot } from 'react-dom/client';
import App from './App';

// Create a root element in the body
const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

// Use React to render your app into the root element
const root = createRoot(rootElement);
root.render(<App />);