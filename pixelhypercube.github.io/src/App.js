import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Blogs from "./Blogs";
import Blog from "./Blog";

import "./Global.css";
// import OverlayCanvas from "./components/OverlayCanvas";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/blogs" element={<Blogs/>}></Route>
        <Route path="/blogs/:id" element={<Blog/>}></Route>

        {/* TESTING ROUTES */}
        {/* <Route path="/canvas-testing" element={<OverlayCanvas/>}></Route> */}
      </Routes>
    </Router>
  )
}