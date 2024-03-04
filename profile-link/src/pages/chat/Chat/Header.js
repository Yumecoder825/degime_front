import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { styled,useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { TERipple } from "tw-elements-react";



const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatHeader = ({members}) => {


  const theme = useTheme();

  return (
    <Box
      p={2}
      width={"100%"}
      sx={{
        backgroundColor:
          theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        alignItems={"center"}
        direction={"row"}
        sx={{ width: "100%", height: "100%" }}
        justifyContent="space-between"
      >
        <Stack
          sx={{ width: "100%"}}
          spacing={2}
          direction="row"
        >
          <Box>
              {
                members.member ? members.member.map((item, index)=>(
                  <StyledBadge
                    key = {index}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                  >
                    <Avatar  alt={`${item.username}_${index}`} src={item.avatar || '/image/user_default.png'} />
                  </StyledBadge>
                )) :  
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                  >
                    <Avatar alt={members.chat_group || 'Room'} src='/image/user_default.png' />
                  </StyledBadge>
              }
              
            
          </Box>
          <Stack >
            <Typography variant="title1">{members.chat_group || 'Room'}</Typography>
          </Stack>
          <Box sx={{ marginLeft: "auto !important", padding:"3px", alignItems:"center"}} >
            <TERipple>
              <Link to="/chat/list"><img src="/image/logout.svg" width="25" className="py-2 cursor-pointer" alt = "out" /></Link>
            </TERipple>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatHeader;
