import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const InputForm = ({ openForm, handleCloseForm, trackId, onAdd }) => {
    // console.log("Track Id after Sending:", trackId)
    const [track_id, setTrackId] = useState(trackId)
    // console.log("Track id after setting: ", track_id)
    const [process_name, setProcessName] = useState('')
    // console.log("Process Name is: ", process_name)
    const [work_location, setWorkLocation] = useState('')
    // console.log("Work Location is: ", work_location)
    const [select_photo, setSelectPhoto] = useState([])
    // console.log("photo is uploaded: ", select_photo)
    const [file_base64_string, setFileBase64String] = useState("")
    // console.log("File base64 String:", file_base64_string)

    const onFileChange = (e) => {
        setSelectPhoto(e.target.files)
    }

    const encodeFileBase64 = (file) => {
        var reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
            reader.onload = () => {
                var Base64 = reader.result
                setFileBase64String(Base64)
            }
            reader.onerror = (error) => {
                console.log("error :", error)
            }
        }
    }

    encodeFileBase64(select_photo[0])

    const onSubmit = (e) => {
        e.preventDefault()

        if (process_name==='' || work_location==='' || select_photo==='') {
            alert('Please add all task')
            return
        }


        onAdd({ trackId, process_name, work_location, file_base64_string })

        setTrackId(' ')
        setProcessName(' ')
        setWorkLocation(' ')
        setFileBase64String(' ')

        //Close the dialog form
        handleCloseForm()


    }

    return <div>
        <Dialog
            open={openForm}
            onClose={handleCloseForm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Input the values!!"}
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        width: 400,
                        height: 400,
                        '& > :not(style)': { m: 3 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <DialogContentText id="alert-dialog-description">
                        <FormControl fullWidth={true} >
                            {/* <InputLabel htmlFor="track_id" focused>Track Id</InputLabel> */}
                            <TextField id="track_id" label="Track Id" variant="outlined" InputLabelProps={{ shrink: true }} defaultValue={trackId} disabled={true} />
                        </FormControl>
                        <br />
                        <br />
                        <FormControl fullWidth={true}>
                            <InputLabel>Process Name</InputLabel>
                            <Select label="Process Name" onChange={(e) => setProcessName(e.target.value)}>
                                <MenuItem value="destroy">destroy</MenuItem>
                                <MenuItem value="clear">clear</MenuItem>
                                <MenuItem value="purge">purge</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl fullWidth={true}>
                            <TextField id="work-location" name="work_location" label="Work Location" variant="outlined" value={work_location} onChange={(e) => setWorkLocation(e.target.value)} />
                        </FormControl>
                        <br />
                        <br />
                        <FormControl fullWidth={true}>
                            <TextField id="select-photo" label="Select Photo" style={{ margin: 8 }} type="file" InputLabelProps={{ shrink: true }} variant="outlined" onChange={onFileChange} />
                        </FormControl>

                        {/* <TextareaAutosize
                            maxRows={20}
                            value={file_base64_string}
                            onChange={encodeFileBase64(select_photo[0])}
                        /> */}

                    </DialogContentText>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseForm}>Cancel</Button>
                <Button onClick={onSubmit} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    </div>;
};

export default InputForm;
