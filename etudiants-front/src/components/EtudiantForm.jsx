import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EtudiantForm = ({ open, onClose, etudiant, onSubmit }) => {
  const [formData, setFormData] = useState({
    numEt: '',
    nom: '',
    note_math: 0,
    note_phys: 0
  });

  useEffect(() => {
    if (etudiant) {
      setFormData(etudiant);
    } else {
      setFormData({
        numEt: '',
        nom: '',
        note_math: 0,
        note_phys: 0
      });
    }
  }, [etudiant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('note') ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = () => {
    if (!formData.numEt || !formData.nom) {
      alert('Numéro et nom sont obligatoires');
      return;
    }
    
    if (formData.note_math < 0 || formData.note_math > 20 || 
        formData.note_phys < 0 || formData.note_phys > 20) {
      alert('Les notes doivent être entre 0 et 20');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{etudiant ? 'Modifier étudiant' : 'Ajouter un étudiant'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          fullWidth
          label="Numéro étudiant"
          name="numEt"
          value={formData.numEt}
          onChange={handleChange}
          disabled={!!etudiant}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Note de maths"
          name="note_math"
          type="number"
          inputProps={{ min: 0, max: 20, step: 0.5 }}
          value={formData.note_math}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Note de physique"
          name="note_phys"
          type="number"
          inputProps={{ min: 0, max: 20, step: 0.5 }}
          value={formData.note_phys}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained">
          {etudiant ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EtudiantForm;