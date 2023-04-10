
import React, { useState } from "react";
import {
  TextField,
  Grid,
  Paper,
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export function Memories(){

  const [ open , setOpen] = useState(false)
  return(
   <div style={{height : "100%"}}>
    <Button onClick={()=>setOpen(true)} >{<AddCircleOutlineIcon></AddCircleOutlineIcon>}</Button>
    <Dialog  scroll= "paper" fullWidth open ={open} onClose={()=>setOpen(false) }>
      <DialogTitle> Add memories</DialogTitle>
      <DialogContent>
        <DialogContentText>     
        </DialogContentText>
      <Grid>
        <Paper>
         <TextField
           autoFocus
            type="email"
            fullWidth
            placeholder="Please add text......."
             >
             </TextField>
        </Paper>
      </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{setOpen(false)}}> cancle</Button>
        <Button onClick={()=>{setOpen(false)}} >open</Button>
      </DialogActions>
    </Dialog>
   </div>
  )
}

