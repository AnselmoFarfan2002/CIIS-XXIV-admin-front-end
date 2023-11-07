import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { capitalize } from '@mui/material';
import capitalizeWords from 'src/utils/capitalizeWords';

const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 90 
    },
    {
        field: 'createdAt',
        headerName: 'Fecha creada',
        width: 150,
        renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'state',
      headerName: 'Estado',
      width: 150,
      renderCell: (params) => {
        let textColor = 'black';
        let customContent = '';
  
        if (params.value === 0) {
          textColor = 'black'; // Color de texto para el estado 0
          customContent = 'Pendiente';
        } else if (params.value === 1) {
          textColor = 'green'; // Color de texto para el estado 1
          customContent = 'Confirmado';
        } else if (params.value === 2) {
          textColor = 'red'; // Color de texto para el estado 2
          customContent = 'Observado';
        }
        return <div style={{ color: textColor }}>{customContent}</div>;
      },
    },
    {
      field: 'relatedUser',
      headerName: 'Usuario',
      width: 300,
      renderCell: (params) =>{
        let User = params.value; 
        return capitalizeWords (`${User.name_user} ${User.lastname_user}`)
      }
    },
    // {
    //     field: 'relatedUser',
    //     headerName: 'Correo',
    //     width: 250,
    //     renderCell: (params) =>{
    //       let Correo = params.value; 
    //       return capitalizeWords (`${Correo.email_user}`)
    //     }
    // },

    {
      field: 'actions',
      headerName: 'Acciones',
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            <button onClick={() => handleButton1Click(params.row.id)}>Botón 1</button>
            <button onClick={() => handleButton2Click(params.row.id)}>Botón 2</button>
          </div>
        );
      },
    },
  ];
  
// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
// ];

// console.log(rows);

export const TablaInscritos = ({taller}) => {

    // const rows = taller || [];
    // console.log(rows);

    const rows = taller.inscriptions;
    console.log(rows);

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    );
};