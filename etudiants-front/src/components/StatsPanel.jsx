import { Box, Typography, Paper, Grid } from '@mui/material';

const StatsPanel = ({ stats }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Statistiques de la classe</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Box>
            <Typography variant="subtitle1">Moyenne de classe</Typography>
            <Typography variant="h4">{stats.moyenneClasse}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <Typography variant="subtitle1">Moyenne minimale</Typography>
            <Typography variant="h4">{stats.moyenneMin}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <Typography variant="subtitle1">Moyenne maximale</Typography>
            <Typography variant="h4">{stats.moyenneMax}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <Typography variant="subtitle1">Admis/Redoublants</Typography>
            <Typography variant="h4">
              {stats.admis} / {stats.redoublants}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StatsPanel;