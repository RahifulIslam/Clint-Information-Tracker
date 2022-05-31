import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputForm from './InputForm';

const Dashboard = ({ onAdd }) => {
    //useState for Insert dialog
    const [openForm, setOpenForm] = React.useState(false);

    //Click for opening the dialog
    const handleClickOpenForm = () => {
        setOpenForm(true);
    }

    //For closeing the dialog
    const handleCloseForm = () => {
        setOpenForm(false);
    }

    //find out Date and Time
    let currentdate = new Date();
    let currentDateTime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    // console.log("Current datetime is: ", currentDateTime)

    //Trim the current dateTime
    let trimCurrentDateTime = currentDateTime.replace(/-|\s|:/g, "");
    // console.log("datetime after trimming:", trimCurrentDateTime)

    //find out currentUnixTime
    let seedSize = 3      //assume that seedSize is 2
    let currentUnixTime = String(Math.abs((parseInt(trimCurrentDateTime) ^ seedSize)))
    // console.log("Current Unix Id:", currentUnixTime)

    //Convert currentUnixDateTime to sting
    // let string_currentUnixTime = currentUnixTime.toString();
    // console.log("String value of currentUnixTime:", string_currentUnixTime)

    //Group Id
    let groupId = String(20220407);
    // console.log("groupId:", groupId)

    //Generate randomseed
    let randomNumber = Math.random()
    let stringRandomNumber = String(randomNumber)
    // console.log("Random number:", stringRandomNumber)
    let randomseed = String(stringRandomNumber.substring(2, 8))
    // console.log("Random seed after trimming:", randomseed)

    let userID = String(2022);
    // console.log("userId:", userID)

    let idCreatorConsoleType = String(1);
    // console.log("idCreatorConsoleType:", idCreatorConsoleType)


    //For generate truck id
    // const trackId = () => {

    // }
    let trackId = currentUnixTime + groupId + randomseed + userID + idCreatorConsoleType
    // console.log("track id is:", trackId)

    return <div>
        <Stack spacing={2} direction="row"></Stack>
        <Button variant="contained" color="success" sx={{ m: 5, p: 1 }} onClick={handleClickOpenForm}>
            For input
        </Button>


        <InputForm
            openForm={openForm}
            handleCloseForm={handleCloseForm}
            trackId={trackId}
            onAdd={onAdd}
        />

    </div>;
};

export default Dashboard;
