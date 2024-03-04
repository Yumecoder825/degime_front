import React, {useState, useRef, useEffect} from 'react'
import { TextField, Button } from '@mui/material';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/Send';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import {toast} from 'react-toastify';

const useStyles = makeStyles((Theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "90%",
        margin: `${Theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%",
        marginRight:"10px !important"
    },
    button : {

    }
  })
);


const Footer = ({sendMessage}) => {
  const [text, setText] = useState('');

  const dropdownRef = useRef(null);

  const handleSend = () => {
    if(text.trim()){
      sendMessage(text);
      setText("");
    }
    else {
      toast.warning("Fill the input field");
    }
  }
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
  };

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowEmojiPicker(false); // Hide the dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const classes = useStyles();
  
  return (
      <>
        <form className={classes.wrapForm}  noValidate autoComplete="off">
          <TextField
            id="standard-text"
            label="メッセージを入力"
            value = {text}
            onChange = {(e) => setText(e.target.value)}
            className={classes.wrapText}
            InputProps={{
              endAdornment: (
                <div>
                  <button onClick={(e) => {e.preventDefault(); setShowEmojiPicker(!showEmojiPicker)}}>😀</button>
                  {showEmojiPicker && (
                    <div ref={dropdownRef} style={{ position: 'absolute', bottom: '50px', right: '20px' }}>
                      <Picker data={data}  onEmojiSelect={handleEmojiSelect} />
                    </div>
                  )}
                </div>
              ),
            }}
          />
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSend} >
              <SendIcon color="white" />
          </Button>
          
        </form>
      </>
  )
}

export default Footer;
