/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Alert, AlertTitle } from '@material-ui/lab';


export const MUIButton = qwikify$(Button);
export const MUIAlert = qwikify$(Alert);
export const TableApp = qwikify$(() => {
  
  
 
  // // regex for email validation
  // const validateEmail = (email) => {
  //   console.log(email);

  //   return true
  // }

  // const [user, setUser] = useState([]);
  const [iserror, setIserror] = React.useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [tableData, setTableData] = useState([]);

  const columns = [
    // { title: 'ID', field: 'id'},
    { title: 'TITLE', field: 'title' , editable: { disabled: true } },
    { title: 'FILAMENT', field: 'filament', editComponent: (props) => (
      <select 
        defaultValue={props.value}
        onChange={e => props.onChange(e.target.value)}
      >
      <option value="ABS">ABS</option>
      <option value="PLA">PLA</option>
      <option value="PETG">PETG</option>
    </select>
    )},
    { title: 'PRIORITY', field: 'priority' },
    { title: 'COPIES', field: 'copies' },
    { title: 'PRINTED', field: 'printed' , editable: { disabled: true }},
    { title: 'PRINTER', field: 'for_printer', editComponent: (props) => (
      <select 
        defaultValue={props.value}
        onChange={e => props.onChange(e.target.value)}
      >
      <option value="Prusal3">Prusal3</option>
      <option value="Voron">Voron</option>
    </select>
    ) },
    { title: 'STATUS', field: 'status', defaultSort: 'desc' , editable: { disabled: true }},
    // { title: 'CRAETED', field: 'creation_ts'}
  ]

  // function formatTimestamp(timestamp) {
  //   let date = new Date(1674718639320545);
  //   let year = date.getFullYear();
  //   let month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   let day = date.getDate().toString().padStart(2, '0');
  //   let hours = date.getHours().toString().padStart(2, '0');
  //   let minutes = date.getMinutes().toString().padStart(2, '0');
  //   let seconds = date.getSeconds().toString().padStart(2, '0');
   
  //   return `${day} ${hours}:${minutes}:${seconds}`;
  // }

  
  useEffect(() => {
      // fetch("https://3dhr.eu.ngrok.io/files")
      fetch("http://demo0896458.mockable.io/files")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])
  console.log(tableData);


  const reloadTableData = () => {
    // fetch("https://3dhr.eu.ngrok.io/files")
    fetch("http://demo0896458.mockable.io/files")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }

  useEffect(() => {
    reloadTableData()
  }, [])

  const jsonNames: string[] = [];

  const newParsed = {
    // Object.keys method return array of all keys in file obejct
    files: Object.keys(tableData).map((name, index) => {
      // then with map function you can map all keys
      // and construct your own data structure
      jsonNames.push(name);
      // @ts-ignore
      window.localStorage.setItem("printqueue", jsonNames);
      return {
        id: index + 1,
        title: name, // first element 
        priority: tableData[name]['priority'],
        copies: tableData[name]['copies'],
        printed: tableData[name]['printed'],
        filament: tableData[name]['filament'],
        for_printer: tableData[name]['for_printer'],
        status: tableData[name]['status'],
        // creation_ts: formatTimestamp(tableData[name]['creation_ts'])
      };

    })
  };
  console.log('TRANSFORMED');
  console.log(JSON.stringify(newParsed.files));




    //function for updating the existing row details
    const handleRowUpdate = (newData, oldData, resolve) => {
      //validating the data inputs
      const errorList = []
      // if (newData.name === "") {
      //   // errorList.push("Try Again, You didn't enter the name field")
      // }
  
      if (errorList.length < 1) {
        axios.put(`http://demo0896458.mockable.io/files/update/name=${newData.title}?copies=${newData.copies}&priority=${newData.priority}&filament=${newData.filament}&printer=${newData.for_printer}`)
          .then(response => {
            // const updateFile = [...user];
            // const index = oldData.id;
            console.log(oldData);
            console.log(response);
            // updateFile[index] = newData;
            // setTableData([...updateFile]);
            resolve();
            reloadTableData();
          })
          // .catch(error => {
          //   console.log(error);
          //   setErrorMessages(["Update failed! Server error"])
          //   setIserror(true)
          //   resolve()
  
          // })
      } else {
        setErrorMessages(errorList)
        console.log(errorList);
        setIserror(true)
        resolve()
  
      }
    }

    const removeValueFromList = (list, value) => {
      const values = list.split(',');
      const index = values.indexOf(value);
      if (index !== -1) {
        values.splice(index, 1);
      }
      return values.join(',');
    }
  
  
    // function for deleting a row
    const handleRowDelete = (oldData, resolve) => {
      // alert(oldData.title);
      axios.delete(`http://demo0896458.mockable.io/files/delete/name=${oldData.title}`)
        .then(response => {
          // const dataDelete = [...oldData];
          console.log(response);
          // @ts-ignore
          window.localStorage.setItem("printqueue", removeValueFromList(oldData.title));
          // const index = oldData.id;
          // dataDelete.splice(index, 1);
          // setTableData([...dataDelete]);
          resolve();
          reloadTableData();
        })
        // .catch(error => {
        //   console.log(error);
        //   setErrorMessages(["Delete failed! Server error"])
        //   setIserror(true)
        //   resolve()
        // })
    }

  
  
    //function for adding a new row to the table
    // const handleRowAdd = (newData, resolve) => {
    //   //validating the data inputs
    //   const errorList = []
    //   if (newData.name === "") {
    //     errorList.push("Try Again, You didn't enter the name field")
    //   }
    //   if (newData.username === "") {
    //     errorList.push("Try Again, You didn't enter the Username field")
    //   }
    //   if (newData.email === "" || validateEmail(newData.email) === false) {
    //     errorList.push("Oops!!! Please enter a valid email")
    //   }
    //   if (newData.phone === "") {
    //     errorList.push("Try Again, Phone number field can't be blank")
    //   }
    //   if (newData.website === "") {
    //     errorList.push("Try Again, Enter website url before submitting")
    //   }
  
    //   if (errorList.length < 1) {
    //     axios.post(`https://mockend.com/samuilmarinov/files/files`, newData)
    //       .then(response => {
    //         const newUserdata = [...user];
    //         newUserdata.push(newData);
    //         console.log(response);
    //         setUser(newUserdata);
    //         resolve()
    //         setErrorMessages([])
    //         setIserror(false)
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         setErrorMessages(["Cannot add data. Server error!"])
    //         setIserror(true)
    //         resolve()
    //       })
    //   } else {
    //     setErrorMessages(errorList)
    //     setIserror(true)
    //     resolve()
    //   }
    // }
  
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
      
      <MaterialTable
        title="Printer Queue"
        // @ts-ignore
        columns={columns}
        data={newParsed.files}
        options={{
          headerStyle: { borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana' },
          actionsColumnIndex: -1,
          pageSize: 5
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          // onRowAdd: (newData) =>
          //   new Promise((resolve) => {
          //     handleRowAdd(newData, resolve)
          //   }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}
      />

    <button id="reloadtable" onClick={reloadTableData}>
      Dynamic reload
    </button> 

      <div>
        {iserror &&
          <Alert severity="error">
            <AlertTitle>ERROR</AlertTitle>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>
            })}
          </Alert>
        }
      </div>


      </div>
    </>
  );
});
