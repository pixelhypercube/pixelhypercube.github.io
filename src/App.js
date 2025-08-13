import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Blogs from "./Blogs";
import Blog from "./Blog";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/blogs" element={<Blogs/>}></Route>
        <Route path="/blogs/:id" element={<Blog/>}></Route>
      </Routes>
    </Router>
  )
}