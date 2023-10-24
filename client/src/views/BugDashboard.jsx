import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";

import axiosInstance from "../axios-instance";
import CreateBugModal from './CreateBugModal';

const BugDashboard = () => {
  const [bugs, setBugs] = useState([]);
  const [isCreateBugModalOpen, setIsCreateBugModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  useEffect(() => {
    (async () => {
      const result = await axiosInstance.get("/bugs");
      if (result?.data?.length) {
        setBugs(result.data);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(bugs);
  }, [bugs]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          height: "40px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Bug app</Typography>
        <BugReportOutlinedIcon />
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        {user.role === "qa" && (
          <Button
            variant="outlined"
            onClick={() => setIsCreateBugModalOpen(true)}
          >
            Create bug
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", padding: "20px" }}>
        {bugs?.map((bug) => (
          <Card sx={{ maxWidth: "250px" }} key={bug._id}>
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }}>
                Title: {bug?.title}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Reproduction steps: {bug?.steps}
              </Typography>
            </CardContent>
            <CardActions>
              {user.role === "developer" && (
                <Button variant="outlined">Finish</Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
      {isCreateBugModalOpen && (
        <CreateBugModal
          open={isCreateBugModalOpen}
          setIsCreateBugModalOpen={setIsCreateBugModalOpen}
        />
      )}
    </Box>
  );
};

export default BugDashboard;
