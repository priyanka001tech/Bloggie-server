// import React, { useState, useEffect } from 'react';
// import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
// import blog from './images/blog.jpg';
// import Form from './components/Form/Form';
// import Posts from './components/Posts/Posts';
// import useStyles from './styles';
// import { useDispatch } from 'react-redux';
// import { getPosts } from './actions/posts';

// const App = () => {
//     const [currentId, setCurrentId] = useState(null);
//     const classes = useStyles();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getPosts());
//     }, [currentId, dispatch])

//     return (
//         <Container maxWidth="lg">
//             <AppBar className={classes.appBar} position="static" color="inherit">
//                 <Typography className={classes.heading} variant="h2" align="center"> Blog Website </Typography>
//                 <img className={classes.image} src={blog} alt="Blog" height="600" />
//             </AppBar>
//             <Grow in>
//                 <Container>
//                     <Grid className={classes.mainCon} container justifyContent="space-between" alignItems="stretch" spacing={3}>
//                         <Grid item xs={12} sm={7}>
//                             <Posts setCurrentId={setCurrentId} />
//                         </Grid>
//                         <Grid item xs={12} sm={4}>
//                             <Form currentId={currentId} setCurrentId={setCurrentId} />
//                         </Grid>

//                     </Grid>
//                 </Container>
//             </Grow>
//         </Container>
//     )
// }

// export default App;

import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/posts" />} />
        <Route path="/posts" exact component={Home} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/posts/:id" component={PostDetails} />
        <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/posts" />)} />
      </Switch>
    </Container> 
  </BrowserRouter>
  );
};

export default App;