import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, TextareaAutosize } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css'
import {useHistory} from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' }); 
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes=useStyles();
    const dispatch=useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }
    
    useEffect(() => {
        if (!post?.title) clear();
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name },  history));
        }else{
            dispatch(createPost({...postData,name: user?.result?.name }, history));
        }
        clear();
        
    }
   
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                 <Typography variant="h6" align="center">
                     Please Sign In to create your own Blog... 
                 </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? "Edit Your Blog": "Create Your Blog"} </Typography>
                {/* <TextField  name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} 
                onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/> */}
                <TextField  name="title" variant="outlined" label="Title" fullWidth value={postData.title} 
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextareaAutosize className="mess" name="message" variant="outlined" label="Message" fullWidth value={postData.message} placeholder="Message" style={{ width: 400 }} minRows={8}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                {/* <TextField  name="message" variant="outlined" label="Message" fullWidth value={postData.message} 
                onChange={(e) => setPostData({ ...postData, message: e.target.value })}/> */}
                <TextField  name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} 
                onChange={(e) => setPostData({ ...postData, tags: e.target.value })}/>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            
            </form>
        </Paper>
    );
}

export default Form;
