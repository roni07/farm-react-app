import {createRoot, Root} from "react-dom/client";
import Main from "./main";
import "./assets/scss/root_style.scss";

const container: Element | null = document.querySelector('#root');
// @ts-ignore
const root: Root | null = createRoot(container);

root.render(<Main/>);
