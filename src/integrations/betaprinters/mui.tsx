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
import { LinearProgress } from '@material-ui/core/index.js';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface ImageProps {
  id: string;
  children?: React.ReactNode;
}


export interface SelectsProps {
  id: string;
  children?: React.ReactNode;
}

export const PrinterApp = qwikify$(() => {

  // HIDE ALL CONSOLE ERROR FOR PRODUCTION
  console.error = () => {};

  const [material, setMaterial] = React.useState('');
  const [type, setType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMaterial(event.target.value as string);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
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
          }

      }
  }));
  
  function ImageDetail(props: ImageProps) {
    const { id } = props;
    let url = 'https://3dhr.eu/wp-content/uploads/2023/loading.gif';
    let filename;
    let notfound = 'https://3dhr.eu/wp-content/uploads/2023/unavailable.png';
    if(props.id != null){
      filename = props.id.split('.')[0];
      console.log(filename);
      useEffect(() => {
        axios.get(`https://3dhr.eu/wp-json/productgetidfromtitle/get_id_from_title?term=${filename}&key=0e2bf47a-af69-40de-bd0a-63b0afca9cb7`)
          .then(res => {
            const data = res.data;
            const parsed = JSON.parse(data);
            const link = parsed[1];
            console.log('GOT LINK');
            console.log(link);
            document.getElementById(filename).src = link;
          }).catch(error => {
              console.log(error);
              document.getElementById(filename).src = notfound;
          })
      }, [])

    }else{
      
      return (
        <img src='https://3dhr.eu/wp-content/uploads/2023/available.png' width='200' height='200'/>
      );

    }


    return (
      <img id={filename} src={url} width='200' height='200'/>
    );
  }

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

  const [baudrates, setBaudrates] =  React.useState([]);
  const [printerports, setPrinterports] =  React.useState([]);
  
  const handleClickOpen = (id, mat, type) => {
    setDialogId(id);
    setOpen(true);
    setType(type);
    setMaterial(mat);
   
    console.log('PROPERTIES ID');
    console.log(id);
    if(id != ''){
        axios.options(`https://3dhr.eu.ngrok.io/printers/get_connection_options/name=${id}`)
        .then(res => {
            console.log('RESULT');
            const bratesarray = res.data['baudrates'];
            const prarray = res.data['ports'];
            console.log(bratesarray);
            console.log(prarray);

            setBaudrates(bratesarray);
            setPrinterports(prarray);

            console.log('NEW');
            console.log(baudrates);
            console.log(printerports);
 
        })
        .catch(error => {
          console.log(error);
        })
    }


  };
  
  const handleClose = () => {
    setOpen(false);
    setDialogId(null);
    setPrintportselected('');
    setBrateselected('');
  };
  

  const handleStatus = (status) => {
    // console.log(status);
    let statustext;

    if(status == 1){
      statustext = 'IDLE';
    }
    if(status == 2){
      statustext = 'PRINTING';
    }
    if(status == 3){
      statustext = 'PAUSED';
    }
    if(status == 4){
      statustext = 'COMPLETED';
    }
    if(status == 5){
      // OCTOPRINT RELATED ERROR
      statustext = 'ERROR';
    }
    
    return statustext;
  };
  

  const classes = useStyles();
  console.log(classes);
  // const data = [];
  const [tableData, setTableData] =  React.useState([]); //useState([]);

  const [isLoading, setIsLoading] =  React.useState<boolean>(false); //useState([]);
  


  useEffect(() => { 
    setIsLoading(true);
    axios.get(`https://3dhr.eu.ngrok.io/printers/list`)
    // axios.get(`http://demo0896458.mockable.io/printers/list`)
      .then(res => {
        const data = res.data;
        const newdata = data.splice(0, 8);
        setTableData(newdata);
        // console.log(tableData);
        setIsLoading(false);
      })
  }, [])


  const reloadPrintersData = () => {
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
  }

  const renderLoading = (
    <> 
      <div className="containerloader"><img className="loader" width="200" src="https://3dhr.eu/wp-content/uploads/2023/loading-printers.gif"/></div>
    </>
  );


  const [completed, setCompleted] = React.useState(0);
  React.useEffect(() => {
    function progress() {
      setCompleted((prevCompleted) =>
        prevCompleted >= 100 ? 0 : prevCompleted + 10
      );
    }
    // const timer = setInterval(progress, 500); // no need to reload this every 500ms, triiggers an unexpected reload when you open the dialog window !
    return () => {
      // clearInterval(timer); // stop clearing the interval as you dont't need it
    };
  }, []);


  const handleSetAvailable = (printer_name) => {
    axios.put(`https://3dhr.eu.ngrok.io/printers/set/available/name=${printer_name}`)
    .then(res => {


      if(res['data']['Error'] && res['data']['Error'].length > 1){
        toastr.error(res['data']['Error']);
      }
      
      if(res['data']['Message'] && res['data']['Message'].length > 1){
        toastr.success(res['data']['Message']);
      }

    }).catch(error => {
        console.log(error);
        // resolve()
        toastr.error(error);
    })
  }

  const handleCancel = (printer_name) => {
    axios.put(`https://3dhr.eu.ngrok.io/printers/cancel/name=${printer_name}`)
    .then(res => {
      
      if(res['data']['Error'] && res['data']['Error'].length > 1){
        toastr.error(res['data']['Error']);
      }
      
      if(res['data']['Message'] && res['data']['Message'].length > 1){
        toastr.success(res['data']['Message']);
      }
    

    }).catch(error => {
        console.log(error);
        // resolve()
        toastr.error(error);
    })
  }

  const handleConnect = (printer_name) => {
    const port = document.getElementById("port-select"+printer_name).innerHTML;
    const brate = document.getElementById("baudrate-select"+printer_name).innerHTML;

    console.log(brate);
    console.log(port);

    updateBratePort(printer_name, brate, port);
    

  }

  const handleUpdate = (printer_name) => {

    const material = document.getElementById("material-select"+printer_name).innerHTML;
    const type = document.getElementById("type-select"+printer_name).innerHTML;

    // alert(material+','+type);
    updateMaterial(printer_name, material);
    updateType(printer_name, type);

    setOpen(false);
    setDialogId(null);
    setPrintportselected('');
    setBrateselected('');
  }

  const updateBratePort = (printer_name, brate, port) => {

    axios.put(`https://3dhr.eu.ngrok.io/printers/connect/name=${printer_name}?port=${port}&baudrate=${brate}`)
    .then(res => {
      
      if(res['data']['Error'] && res['data']['Error'].length > 1){
        toastr.error(res['data']['Error']);
      }
      
      if(res['data']['Messege']){
        toastr.success(res['data']['Messege']);
      }
      

    }).catch(error => {
        console.log(error);
        // resolve()
        toastr.error(error);
    })
  }

  
  const updateMaterial = (printer_name, material) => {
    axios.patch(`https://3dhr.eu.ngrok.io/printers/update/material/name=${printer_name}&material=${material}`)
    .then(res => {
      
      if(res['data']['Error'] && res['data']['Error'].length > 1){
        toastr.error(res['data']['Error']);
      }
      
      if(res['data']['Message'] && res['data']['Message'].length > 1){
        toastr.success(res['data']['Message']);
        reloadPrintersData();
      }


    }).catch(error => {
        console.log(error);
        // resolve()
        toastr.error(error);
    })
  }

  const updateType = (printer_name, type) => {
    axios.patch(`https://3dhr.eu.ngrok.io/printers/update/type/name=${printer_name}&type=${type}`)
    .then(res => {
      
      if(res['data']['Error'] && res['data']['Error'].length > 1){
        toastr.error(res['data']['Error']);
      }
      
      if(res['data']['Message'] && res['data']['Message'].length > 1){
        toastr.success(res['data']['Message']);
        reloadPrintersData();
      }


    }).catch(error => {
        console.log(error);
        // resolve()
        toastr.error(error);
    })
  }

  const [printportselected, setPrintportselected] = React.useState('');
  const [brateselected, setBrateselected] = React.useState('');

  
  const handleChangePort = (event: SelectChangeEvent) => {
    setPrintportselected(event.target.value as string);
  };

  const handleChangeBrate = (event: SelectChangeEvent) => {
    setBrateselected(event.target.value as string);
  };



  function DynamicSelects(props: SelectsProps) {
    const { id } = props;

    return (
    <Box sx={{ display: 'flex', minWidth: 340, maxWidth: 340, marginBottom: 5 }}>
      <FormControl fullWidth style={{ marginRight: '5px'}}>
        <InputLabel id={"port-select-label"+id}>Port</InputLabel>
        <Select
            labelId={"port-select-label"+id}
            id={"port-select"+id}
            value={printportselected}
            label="port"
            onChange={handleChangePort}
          >
            {printerports.map(printerport => (
              <MenuItem key={printerport} value={printerport}>
                {printerport}
              </MenuItem>
            ))}
          </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginRight: '5px'}}>
      <InputLabel id={"baudrate-select-label"+id}>Baudrates</InputLabel>
      <Select
          labelId={"baudrate-select-label"+id}
          id={"baudrate-select"+id}
          value={brateselected}
          label="baudrate"
          onChange={handleChangeBrate}
        >
          {baudrates.map(baudrate => (
            <MenuItem key={baudrate} value={baudrate}>
              {baudrate}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button style={{ width:'240px', marginLeft: '5px'}} autoFocus onClick={event => { handleConnect(props.id); console.log(event); }}>
          CONNECT
      </Button>
    </Box>

    );
  }
  
  
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
                                <IconButton onClick={event => { handleClickOpen(elem.printer_name, elem.filament_type, elem.type); console.log(event); }} aria-label="settings">
                                  <SettingsIcon />
                                </IconButton>
                              }
                          title={`Printer : ${elem.printer_name}`}
                          subheader={`ip: ${elem.printer_ip}`}
                      />
                      <CardContent>
                          <ImageDetail id={elem.uploaded_file}/>
                          <Typography variant="subtitle2" gutterBottom>
                              <p className="cardp">name: {elem.printer_name}</p>
                              <p className="cardp filenameprinter">file: {elem.uploaded_file}</p>
                              <p className="cardp">time left: {elem.left_time}</p>
                              <p className="cardp">total time: {elem.total_time}</p>
                              <p className="cardp">filament: {elem.filament_type}</p>
                              
                              <p className="cardp">status: {handleStatus(elem.status)}</p>

                              <LinearProgress variant="determinate" value={elem.done_percentage} />
                              <p className="cardp">progress: {elem.done_percentage}</p> 
                              <p className="cardp">api-key: {elem.api_key}</p>
                              <p className="cardp">type: {elem.type}</p>
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
                            <Typography gutterBottom style={{ marginBottom: '20px' }}>
                              Change printer material and printer type and hit the UPDATE to save your changes. If you simply close the dialog your changes will be discarded.
                            </Typography>
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
                                  <MenuItem value={'PETG'}>PETG</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120, maxWidth: 120, marginBottom: 5 }}>
                              <FormControl fullWidth>
                                <InputLabel id={"type-select-label"+elem.printer_name}>Type</InputLabel>
                                <Select
                                  labelId={"type-select-label-element"+elem.printer_name}
                                  id={"type-select"+elem.printer_name}
                                  value={type}
                                  label="Type"
                                  onChange={handleChangeType}
                                >
                                  <MenuItem value={'Voron'}>Voron</MenuItem>
                                  <MenuItem value={'PrusaI3'}>PrusaI3</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <DynamicSelects id={elem.printer_name}/>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus onClick={event => { handleUpdate(elem.printer_name); console.log(event); }}>
                                UPDATE
                              </Button>
                            </DialogActions>
                          </BootstrapDialog>
                      </CardContent>
                      <Grid>
                      <Grid item>
                        <Button onClick={event => { handleSetAvailable(elem.printer_name); console.log(event); }} variant="contained" style={{ fontSize: '0.6rem', marginLeft: '10px', marginBottom: '10px' }}>
                          SET AVAILABLE
                        </Button>
                        <Button onClick={event => { handleCancel(elem.printer_name); console.log(event); }} variant="contained" style={{ fontSize: '0.6rem', marginLeft: '10px', marginBottom: '10px' }}>
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
