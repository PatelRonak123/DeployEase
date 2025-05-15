import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

document.title = "ShopEasy - E-Commerce Platform";

createRoot(document.getElementById("root")!).render(<App />);
