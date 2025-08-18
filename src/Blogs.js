import React from "react";
import { Container, Form } from "react-bootstrap";
import blogsObj from "./data/blogsList";
import BlogContainer from "./components/BlogContainer";
import "./Blogs.css";
import Footer from "./components/Footer";
import OverlayCanvas from "./components/OverlayCanvas";
import Navigation from "./components/Navigation";
import BlogGrid from "./components/BlogGrid";
import IconSwitch from "./components/IconSwitch";
import Select from "react-select";
const {blogsList,blogTagsList} = blogsObj;

// specifically for react-select's Select component
const options = blogTagsList.map((tag, index) => ({
    value: index,
    label: tag,
}));

export default class Blogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType:0,

            currentBlogsList: blogsList,
            selectedOptions:[],
            searchQuery:"",

            // overlay canvas props
            mouseX:0,
            mouseY:0,
            mouseIsDown:false,
        };
        this.navbarElem = React.createRef();
    }

    componentDidMount() {
        // to pass to overlay canvas

        window.addEventListener("mousedown",(e)=>{
            this.setState({
                mouseX:e.clientX,
                mouseY:e.clientY,
                mouseIsDown:true
            });
        });

        window.addEventListener("mousedown",(e)=>{
            this.setState({
                mouseIsDown:false,
            });
        });
    }

    filterHelper(searchQuery, selectedOptions) {
        return blogsList.filter(blog=>
            // tag filtering
            (selectedOptions.length === 0 || blog.tags.some(tag=>selectedOptions.map(s=>s.value).includes(tag))) &&
            // search query filtering
            (searchQuery.length === 0 || blog.title.toLowerCase().includes(searchQuery))
        )
    }

    render() {
        let {viewType, mouseX, mouseY, mouseIsDown, currentBlogsList, selectedOptions, searchQuery} = this.state;
        return (
            <div>
                <OverlayCanvas
                    mouseX={mouseX}
                    mouseY={mouseY}
                    mouseIsDown={mouseIsDown}
                />
                <Navigation/>
                <Container>
                    <h1>My Blogs</h1>
                    <p style={{fontSize:"20px"}}>Feel free to have a read on one of my blogs!</p>
                    <div style={{
                        justifyContent:"space-between",
                        marginBottom:"10px",
                    }} className="d-flex">
                        <Form.Group style={{width:"100%",marginRight:"12px"}}>
                            <Form.Control
                                id="searchBlogs"
                                type="text"
                                placeholder="Search blogs..."
                                style={{
                                    paddingLeft: "35px",
                                    backgroundImage: `url("./assets/img/icons/search.svg")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "8px center",
                                    backgroundSize: "20px 20px",
                                }}
                                onChange={(e)=>{
                                    this.setState({
                                        searchQuery: e.target.value.toLowerCase(),
                                    },()=>{
                                        this.setState({
                                            currentBlogsList: this.filterHelper(this.state.searchQuery, selectedOptions),
                                        });
                                    });
                                }}
                            />
                        </Form.Group>
                        <IconSwitch
                        onClick={()=>this.setState({viewType:viewType===0 ? 1 : 0})}
                        imgLeftUrl={"./assets/img/icons/grid.svg"}
                        imgRightUrl={"./assets/img/icons/list.svg"}
                        width={20}
                        value={viewType}
                        />
                    </div>
                    <Select
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                backgroundColor: '#ffffff00',
                                border: '1px solid #444',
                                borderRadius: '20px',
                                height: '100%',
                                fontSize: '18px',
                                color: '#fff',
                                boxShadow: state.isFocused ? 'none' : 'none',
                                '&:hover': {
                                    border: '1px solid #888',
                                },
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: '#aaa',
                                }),
                            multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: '#555',
                                borderRadius: '10px',
                                }),
                            multiValueLabel: (provided) => ({
                                ...provided,
                                color: '#fff',
                                }),
                            multiValueRemove: (provided) => ({
                                ...provided,
                                color: '#fff',
                                ':hover': {
                                    backgroundColor: '#888',
                                    color: '#fff',
                                },
                            }),
                            menu: (provided) => ({
                                ...provided,
                                backgroundColor: '#555',
                                color: '#fff',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? '#666' : '#555',
                                color: '#fff',
                                cursor: 'pointer',
                            }),
                        }}
                        isMulti
                        options={options}
                        value={selectedOptions}
                        onChange={(selected)=>{
                            this.setState({
                                selectedOptions: selected || [],
                            },()=>{
                                this.setState({
                                    currentBlogsList: this.filterHelper(searchQuery, this.state.selectedOptions),
                                });
                            });
                        }}
                        placeholder="Select Tags"
                    />
                    <hr
                    style={{
                        margin:"16px 0px 0px 0px"
                    }}
                    />
                    {
                        viewType === 1 ? 
                        currentBlogsList.length > 0 ? 
                        currentBlogsList.map((blog,index)=>(
                            <BlogContainer
                                key={index}
                                blog={blog}
                            />
                        )).reverse() :
                        (
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{width:"100%", height:"100%"}}>
                            <h1 style={{fontSize:"128px"}}>🙇‍♂️</h1>
                            <h3>Sorry, there are no blogs found!</h3>
                            <p style={{textAlign: "center", color: "#666"}}>
                                Try adjusting your search or check back later for new posts.
                            </p>
                        </div>
                        ) : (
                            <div style={{
                                justifyContent:"space-evenly"
                            }} className="d-flex flex-wrap">
                                {
                                    currentBlogsList.length>0 ?
                                    currentBlogsList.map((blog,index)=>(
                                        <BlogGrid
                                            colWidthL={4}
                                            colWidthM={6}
                                            colWidthS={12}
                                            key={index}
                                            blog={blog}
                                        />
                                    )).reverse()
                                    : (
                                    <div className="d-flex flex-column justify-content-center align-items-center" style={{width:"100%", height:"100%"}}>
                                        <h1 style={{fontSize:"128px"}}>🙇‍♂️</h1>
                                        <h3>Sorry, there are no blogs found!</h3>
                                        <p style={{textAlign: "center", color: "#666"}}>
                                            Try adjusting your search or check back later for new posts.
                                        </p>
                                    </div>
                                    )
                                }
                            </div>
                        )
                    }
                </Container>
                <Footer/>
            </div>
        )
    }
}