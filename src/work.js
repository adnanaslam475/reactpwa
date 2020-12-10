// // import React from "react";
// // import { CircleSlider } from "react-circle-slider"


// // class App extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       value: 1
// //     }
// //   }

// //   handleChange = value => {
// //     this.setState({ value });
// //   };

// //   handleChangeRange = event => {
// //     // this.setState(prevValue=>{
// //     //   value: event.target.valueAsNumber,
// //     // })
// //     this.setState(prevState => {
// //       return {
// //         ...prevState,
// //         //  counter : prevState.counter +1,
// //         value: prevState + event.target.valueAsNumber
// //       }
// //     })
// //   };

// //   render() {
// //     const { value } = this.state
// //     return <div>
// //       <CircleSlider value={value} onChange={this.handleChange} />
// //       <h2>{value}</h2>
// //     </div>
// //   }
// // }
// // export default App

// // import React, { Component } from 'react'
// // import PropTypes from 'prop-types'
// // import './App.css'
// // class Root extends Component {
// //   state = {
// //     value: .1
// //   }

// //   handleChange = (x, y) => {
// //     this.setState({ value: y })
// //   };

// //   render() {
// //     return (
// //       <div>
// //         <Slider
// //           radius={140}
// //           border={70}
// //           value={this.state.value}
// //           onChange={this.handleChange} />

// //         <p>{this.state.value.toFixed(2)}</p>
// //       </div>
// //     )
// //   }
// // }

// // class Slider extends Component {
// //   state = { isPinching: false };

// //   componentDidMount() {
// //     this.x = 0
// //     this.y = 0

// //     document.addEventListener("mousemove", this.handleMouseMove)
// //     document.addEventListener("mouseup", this.handleMouseUp)
// //   }

// //   componentWillUnmount() {
// //     document.removeEventListener("mousemove", this.handleMouseMove)
// //     document.removeEventListener("mouseup", this.handleMouseUp)
// //   }

// //   handleMouseUp = () => {
// //     this.setState({ isPinching: false })
// //   };

// //   handleMouseDown = (e) => {
// //     e.preventDefault()

// //     const { left, top, width, height } = this.potar.getBoundingClientRect()

// //     this.x = e.pageX - (left + width / 2)
// //     this.y = (top + height / 2) - e.pageY

// //     this.setState({ isPinching: true })
// //   };

// //   handleMouseMove = (e) => {
// //     if (this.state.isPinching) {
// //       const { left, top, width, height } = this.potar.getBoundingClientRect()

// //       const x = e.pageX - (left + width / 2)
// //       const y = (top + height / 2) - e.pageY

// //       const dx = (x - this.x) / 100
// //       const dy = (y - this.y) / 100

// //       this.x = x
// //       this.y = y

// //       if (this.props.onChange) {
// //         let xValue = this.props.value + dx
// //         let yValue = this.props.value + dy

// //         if (xValue < 0) {
// //           xValue = 0
// //         }

// //         if (xValue > 1) {
// //           xValue = 1
// //         }

// //         if (yValue < 0) {
// //           yValue = 0
// //         }

// //         if (yValue > 1) {
// //           yValue = 1
// //         }

// //         this.props.onChange(xValue, yValue)
// //       }
// //     }
// //   };

// //   render() {
// //     const { radius, border, value } = this.props
// //     const p = 2 * Math.PI * (radius - border / 2)

// //     const strokeWidth = border
// //     const strokeDashoffset = p * (1 - value)
// //     const strokeDasharray = p

// //     return (
// //       <svg
// //         className="Slider"
// //         ref={(potar) => this.potar = potar}
// //         viewBox={`0 0 ${radius * 2} ${radius * 2}`}
// //         onMouseDown={this.handleMouseDown}>
// //         <circle
// //           className="Slider-circle"
// //           style={{ strokeWidth }}
// //           r={radius - border / 2}
// //           cx={radius}
// //           cy={radius} />

// //         <circle
// //           className="Slider-bar"
// //           style={{
// //             strokeWidth,
// //             strokeDashoffset,
// //             strokeDasharray,
// //           }}
// //           r={radius - border / 2}
// //           cx={radius}
// //           cy={radius} />
// //       </svg>
// //     )
// //   }
// // }

// // Slider.defaultProps = {
// //   radius: 50,
// //   border: 30,
// //   value: .5,
// // }

// // Slider.propTypes = {
// //   onChange: PropTypes.func,
// //   radius: PropTypes.number,
// //   border: PropTypes.number,
// //   value: (props, propName) => {
// //     const value = parseInt(props[propName])

// //     if (isNaN(value)) {
// //       return new Error("The potar value must be a number.")
// //     }

// //     if (value < 0 || value > 1) {
// //       return new Error("The potar value must be between 0 and 1.")
// //     }
// //   },
// // }
// // export default Root








// import React, { Component } from 'react';
// import Layout from "./components/layout/Layout.js";
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import CheckOut from './containers/checkout/CheckOut.js';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders.js';
// import Auth from './containers/Auth/Auth.js';
// import Logout from './containers/Auth/logout/Logout';
// import * as action from './store/actions/index'
// import { connect } from 'react-redux';

// class App extends Component {
//   componentDidMount() {
//     this.props.onAuthTry()
//   }

//   render() {
//     let routes = (
//       <Switch>
//         <Route path='/auth' component={Auth} />
//         <Route path='/orders' component={Orders} />
//         <Route exact path='/' component={BurgerBuilder} />
//         <Redirect to='/' />
//       </Switch>
//     )
//     if (this.props.isAuthenticated) {
//       routes = (
//         <Switch>
//           <Route exact path='/' component={BurgerBuilder} />
//           <Route path='/checkout' component={CheckOut} />
//           <Route path='/auth' component={Auth} />
//           <Route path='/orders' component={Orders} />
//           <Route path='/logout' component={Logout} />
//           <Redirect to='/' />
//         </Switch>
//       )
//     }
//     return (
//       <div>
//         <Layout>
//           {routes}
//         </Layout>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onAuthTry: () => dispatch(action.checkAuthState())
//   }
// }

// const mapStateToProps = state => {
//   return {
//     building: state.burgerBuilder.building,
//     isAuthenticated: state.auth.token !== null
//   }
// }

// //withrouter, history k closest match k lye
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))



import React, {  useEffect, useState, } from 'react'
import axios from 'axios'

const App = () => {


  const [name, setName] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    try {
      async function fertData() {
        const axiosRes = await axios.get('https://jsonplaceholder.typicode.com/todos')
        console.time('map')
        setName(axiosRes.data.map((author) => {
          return author.title
        }).join(","))
        console.timeEnd('map')
        setName(axiosRes.data.reduce((prev, next) => {
          return prev + next.title
        }, []))
        setName(axiosRes.data.reduce((prev, curr) => prev + curr.title))
      }
      fertData()
    }
    catch (err) {
      setError(err)
    }
  }, [])





 
  return (
    <div>
      <p  >nsame</p>
      {/* {name ? name.map((i, key) => (<p style={{ width: '50%' }}
        key={key}>{i.title}</p>)) : <p> no name</p>} */}
    </div>
  );
}
export default App

// console.time('fetch');
// const res = await fetch('https://jsonplaceholder.typicode.com/todos')
// const data = await res.json()
// console.log(data)
// console.timeEnd('fetch')


  // const sortarr = () => {
  //   const arr = [6, 3, 5, 2];
  //   for (let i = 0; i < arr.length; i++) {
  //     console.log('f-------', i)
  //     for (let j = 0; j < arr.length - i - 1; j++) {
  //       if (arr[j] > arr[j + 1]) {
  //         let temp = null
  //         temp = arr[j];
  //         console.log('s-------', temp)
  //         arr[j] = arr[j + 1];
  //         arr[j + 1] = temp;
  //       }
  //     }
  //   }
  //   for (let i = 0; i < arr.length; i++) {
  //     console.log(arr[i]);
  //   }
  // }