import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button } from "@mui/material";
import { useState } from "react";

import axiosInstance from '../axios-instance';

const CreateBugModal = ({ open, setIsCreateBugModalOpen }) => {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");


  const createBug = async () => {
      const bug = {
          title: title,
          steps: steps,
          completed: false,
          assignedTo: '12312312312',
          reportedBy: "123213123"
      };

      const result = await axiosInstance.post('/bugs', bug);

      console.log(result);

      setIsCreateBugModalOpen(false);

  }

  return (
    <Dialog
      onClose={() => setIsCreateBugModalOpen(false)}
      open={open}
      fullWidth
    >
      <DialogTitle>Create bug</DialogTitle>
      <DialogContent sx={{marginTop: '10px', display: 'flex', flexDirection: 'column'}}>
        <TextField
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
          <Button onClick={createBug}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBugModal;
