import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import { Page } from "./page/Page.tsx"
import { DemoFrame } from "./page/DemoFrame.tsx"

// #/demo/<id> là khung xem thử trong iframe; còn lại là trang chấm.
const demo = location.hash.match(/^#\/demo\/([\w-]+)$/)?.[1]

createRoot(document.getElementById("root")!).render(<StrictMode>{demo ? <DemoFrame id={demo} /> : <Page />}</StrictMode>)
