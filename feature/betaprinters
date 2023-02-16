/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import Card from '@mui/material/Card/index.js';
import CardContent from '@mui/material/CardContent/index.js';
import CardHeader from '@mui/material/CardHeader/index.js';
import Grid from '@mui/material/Grid/index.js';
import Avatar from '@mui/material/Avatar/index.js';
import IconButton from '@mui/material/IconButton/index.js';
import Typography from '@mui/material/Typography/index.js';
import { red } from '@mui/material/colors/index.js';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button/index.js';
import { styled } from '@mui/material/styles/index.js';
import Dialog from '@mui/material/Dialog/index.js';
import DialogTitle from '@mui/material/DialogTitle/index.js';
import DialogContent from '@mui/material/DialogContent/index.js';
import DialogActions from '@mui/material/DialogActions/index.js';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import Select, { SelectChangeEvent } from '@mui/material/Select/index.js';
import { LinearProgress } from '@material-ui/core';


export const PrinterApp = qwikify$(() => {

  const [material, setMaterial] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMaterial(event.target.value as string);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
 

  const useStyles = makeStyles(theme => ({
      root: {
          flexGrow: 1,
          padding: theme.spacing(2),
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
      }
  }));
  

  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  // @ts-ignore
  const [open, setOpen] = React.useState(false);
  const [dialogId, setDialogId] = useState(null);
  
  const handleClickOpen = (id, mat) => {
    setDialogId(id);
    setOpen(true);
    setMaterial(mat);
  };
  
  const handleClose = () => {
    setOpen(false);
    setDialogId(null);
  };
  
  

  const classes = useStyles();
  console.log(classes);
  // const data = [];
  const [tableData, setTableData] =  React.useState([]); //useState([]);

  const [isLoading, setIsLoading] =  React.useState<boolean>(false); //useState([]);


  useEffect(() => {
    setIsLoading(true);
    // axios.get(`https://3dhr.eu.ngrok.io/printers/list`)
    axios.get(`http://demo0896458.mockable.io/printers/list`)
      .then(res => {
        const data = res.data;
        const newdata = data.splice(0, 8);
        setTableData(newdata);
        // console.log(tableData);
        setIsLoading(false);
      })
  }, [])


  const renderLoading = (
    <> 
      <div className="containerloader"><img className="loader" width="70" src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"/></div>
    </>
  );

  const [completed, setCompleted] = React.useState(0);
  React.useEffect(() => {
    function progress() {
      setCompleted((prevCompleted) =>
        prevCompleted >= 100 ? 0 : prevCompleted + 10
      );
    }
    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
           <Grid
                  id="gridboxes"
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
              >
              {isLoading ? renderLoading : ''}
              {tableData.map(elem => (
              <Grid item xs={12} sm={6} md={3} key={elem.printer_name}>
                  <Card>
                      <CardHeader
                              avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                  {elem.printer_name.charAt(elem.printer_name.length - 1)}
                                </Avatar>
                              }
                              action={
                                <IconButton onClick={event => { handleClickOpen(elem.printer_name, elem.filament_type); console.log(event); }} aria-label="settings">
                                  <SettingsIcon />
                                </IconButton>
                              }
                          title={`Printer : ${elem.printer_name}`}
                          subheader={`ip: ${elem.printer_ip}`}
                      />
                      <CardContent>
                          <Typography variant="subtitle2" gutterBottom>
                              <p className="cardp">name: {elem.printer_name}</p>
                              <p className="cardp filenameprinter">file: {elem.uploaded_file}</p>
                              <p className="cardp">time left: {elem.left_time}</p>
                              <p className="cardp">total time: {elem.total_time}</p>
                              <p className="cardp">filament: {elem.filament_type}</p>
                              <p className="cardp">status: {elem.status}</p>
                              <p className="cardp">progress: </p>
                              <LinearProgress variant="determinate" value={elem.done_percentage} />
                              <p className="cardp">api-key: {elem.api_key}</p>
                            </Typography>
                          <BootstrapDialog
                              key={elem.printer_name}
                              onClose={handleClose}
                              aria-labelledby="dialog"
                              // open={open}
                              open={open && dialogId === elem.printer_name}
                              id={elem.printer_name}
                            >
                            <BootstrapDialogTitle id={"dialogtitle-"+elem.printer_name} onClose={handleClose}>
                              Settings {elem.printer_name}
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                            <Box sx={{ minWidth: 120, maxWidth: 120, marginBottom: 5 }}>
                              <FormControl fullWidth>
                                <InputLabel id={"material-select-label"+elem.printer_name}>Material</InputLabel>
                                <Select
                                  labelId={"material-select-label"+elem.printer_name}
                                  id={"material-select"+elem.printer_name}
                                  value={material}
                                  label="Material"
                                  onChange={handleChange}
                                >
                                  <MenuItem value={'ABS'}>ABS</MenuItem>
                                  <MenuItem value={'PLA'}>PLA</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                              <Typography gutterBottom>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                              </Typography>
                            </DialogContent>
                            <DialogActions>
                              <Button autoFocus onClick={handleClose}>
                                UPDATE
                              </Button>
                            </DialogActions>
                          </BootstrapDialog>
                      </CardContent>
                      <Grid>
                      <Grid item>
                        <Button variant="contained" style={{ fontSize: '0.6rem', marginLeft: '10px', marginBottom: '10px' }}>
                          SET AVAILABLE
                        </Button>
                        <Button variant="contained" style={{ fontSize: '0.6rem', marginLeft: '10px', marginBottom: '10px' }}>
                          CANCEL
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
              </Grid>
          ))}
      </Grid>
      </div>
    </>
  );
});
