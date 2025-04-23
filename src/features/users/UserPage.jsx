import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, message, Popconfirm, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, removeUser } from './userSlice';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';

const UserPage = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 10));
        setBuffer((oldBuffer) => (oldBuffer >= 100 ? 10 : oldBuffer + 15));
      }, 500);
      return () => clearInterval(timer);
    }
  }, [loading]);

  useEffect(() => {
    dispatch(getAllUsers())
      .unwrap()
      .catch((err) => {
        console.error('Erreur:', err);
        setError("Erreur de connexion au serveur. Veuillez réessayer.");

        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log("Tentative de suppression de l'utilisateur avec ID :", id);
  
    if (!id) {
      message.error("ID utilisateur invalide.");
      return;
    }
  
    dispatch(removeUser(id))
      .unwrap()
      .then(() => message.success("Utilisateur supprimé"))
      .catch(() => message.error("Erreur de suppression"));
  };
  

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Rôle',
      dataIndex: 'roles', // Utilisez 'roles' au lieu de 'role'
      key: 'role',
      render: (roles) => (
        <Tag color={roles[0] === 'admin' ? 'volcano' : 'green'}>
          {roles[0]?.toUpperCase()} {/* Affichez le premier rôle (si l'utilisateur a plusieurs rôles, vous pouvez gérer autrement) */}
        </Tag>
      ),
    },   
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Modifier</a>
          <Popconfirm
              title="Supprimer cet utilisateur ?"
              onConfirm={() => {
                if (record?.id) {
                  handleDelete(record.id);
                } else {
                  console.warn("ID utilisateur introuvable pour la suppression.");
                }
              }}
              okText="Oui"
              cancelText="Non"
            >
            <a style={{ color: 'red' }}>Supprimer</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Pagination logique
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container mt-5">
      <h2>Gestion des Utilisateurs</h2>

      {error && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          maxWidth: '300px',
        }}>
          <Alert
            message="Erreur"
            description={error}
            type="error"
            showIcon
            closable
          />
        </div>
      )}


      {loading && (
        <div style={{ marginBottom: '16px' }}>
          <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
        </div>
      )}

      <Table
        columns={columns}
        dataSource={paginatedUsers.map((u) => ({ ...u, key: u._id }))}
        pagination={false}
        bordered
      />

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'end' }}>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page"
          sx={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#333',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserPage;
