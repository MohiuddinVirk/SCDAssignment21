import React, { useState } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 100%;
`;

const FullWidthButton = styled(Button)(({ theme }) => ({
  width: '50%',
  color: 'white',
  background: 'linear-gradient(to right, #000000, #3533CD)',
  borderRadius: theme.spacing(2), // Use theme.spacing for padding-based properties
  marginLeft:theme.spacing(2),
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

export default function InputFileUpload({ setFile ,typeofinput , title}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFile(file);
  };

  return (
    <FullWidthButton
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon style={{ color: "white" }} />}
      htmlFor="file-upload"
    >
      {selectedFile ? selectedFile.name : title}
      <VisuallyHiddenInput
        type="file"
        id="file-upload"
        accept={typeofinput}
        onChange={handleFileChange}
      />
    </FullWidthButton>
  );
}
