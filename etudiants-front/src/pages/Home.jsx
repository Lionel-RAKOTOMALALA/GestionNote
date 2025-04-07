import { useState, useEffect } from 'react';
import { Container, CircularProgress, Alert } from '@mui/material';
import EtudiantTable from '../components/EtudiantTable';
import StatsPanel from '../components/StatsPanel';
import Charts from '../components/Charts';
import { 
  fetchEtudiants, 
  createEtudiant, 
  updateEtudiant, 
  deleteEtudiant 
} from '../api/etudiantApi';

const Home = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [stats, setStats] = useState({
    moyenneClasse: 0,
    moyenneMin: 0,
    moyenneMax: 0,
    admis: 0,
    redoublants: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchEtudiants();
      setEtudiants(data.etudiants);
      setStats(data.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (etudiantData) => {
    try {
      await createEtudiant(etudiantData);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (numEt, etudiantData) => {
    try {
      await updateEtudiant(numEt, etudiantData);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (numEt) => {
    try {
      await deleteEtudiant(numEt);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <EtudiantTable
        etudiants={etudiants}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      
      <StatsPanel stats={stats} />
      <Charts stats={stats} />
    </Container>
  );
};

export default Home;