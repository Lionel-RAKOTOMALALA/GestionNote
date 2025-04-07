import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ConfirmationModal from './ConfirmationModal';
import EtudiantForm from './EtudiantForm';

const EtudiantTable = ({ etudiants, onDelete, onUpdate, onCreate, loading }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [etudiantToDelete, setEtudiantToDelete] = useState(null);

  const handleDeleteClick = (numEt) => {
    setEtudiantToDelete(numEt);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (etudiantToDelete) {
      onDelete(etudiantToDelete);
    }
  };

  const columns = [
    { field: 'numEt', headerName: 'Numéro Étudiant', width: 180 },
    { field: 'nom', headerName: 'Nom', width: 200 },
    { field: 'note_math', headerName: 'Note Maths', width: 120, type: 'number' },
    { field: 'note_phys', headerName: 'Note Physique', width: 120, type: 'number' },
    { field: 'moyenne', headerName: 'Moyenne', width: 120, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Tooltip title="Modifier">
            <IconButton
              color="primary"
              onClick={() => {
                setSelectedEtudiant(params.row);
                setEditMode(true);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton
              color="error"
              onClick={() => handleDeleteClick(params.row.numEt)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Button 
        variant="contained" 
        onClick={() => {
          setSelectedEtudiant(null);
          setEditMode(true);
        }}
        sx={{ mb: 2 }}
      >
        Ajouter un étudiant
      </Button>
      
      <DataGrid
        rows={etudiants}
        columns={columns}
        loading={loading}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.numEt}
      />
      
      <EtudiantForm
        open={editMode}
        onClose={() => setEditMode(false)}
        etudiant={selectedEtudiant}
        onSubmit={selectedEtudiant ? onUpdate : onCreate}
      />
      
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer l'étudiant ${etudiantToDelete} ? Cette action est irréversible.`}
        confirmText="Supprimer"
      />
    </div>
  );
};

export default EtudiantTable;