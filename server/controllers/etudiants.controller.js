const Etudiant = require('../models/Etudiant');

exports.create = async (req, res) => {
  try {
    // Convertir et valider les notes
    req.body.note_math = parseFloat(req.body.note_math || 0).toFixed(2);
    req.body.note_phys = parseFloat(req.body.note_phys || 0).toFixed(2);

    // Validation des notes
    if (req.body.note_math < 0 || req.body.note_math > 20 || 
        req.body.note_phys < 0 || req.body.note_phys > 20) {
      return res.status(400).json({ message: 'Les notes doivent être entre 0 et 20' });
    }

    const numEt = await Etudiant.create(req.body);
    const etudiant = await Etudiant.findByNumEt(numEt);
    
    res.status(201).json({
      ...etudiant,
      note_math: parseFloat(etudiant.note_math),
      note_phys: parseFloat(etudiant.note_phys),
      moyenne: parseFloat(etudiant.moyenne)
    });

  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    let etudiants = await Etudiant.findAll();
    
    // Conversion des valeurs et vérification
    etudiants = etudiants.map(etudiant => {
      const note_math = parseFloat(etudiant.note_math);
      const note_phys = parseFloat(etudiant.note_phys);
      const moyenne = parseFloat(((note_math + note_phys) / 2).toFixed(2));

      return {
        ...etudiant,
        note_math,
        note_phys,
        moyenne
      };
    });

    const stats = await Etudiant.getStats();
    
    res.json({ 
      etudiants,
      stats: {
        total: stats.total,
        moyenneClasse: parseFloat(stats.moyenneClasse).toFixed(2),
        moyenneMin: parseFloat(stats.moyenneMin).toFixed(2),
        moyenneMax: parseFloat(stats.moyenneMax).toFixed(2),
        admis: stats.admis,
        redoublants: stats.redoublants
      }
    });

  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { numEt } = req.params;
    
    if (!numEt) {
      return res.status(400).json({ message: 'numEt est requis' });
    }

    // Conversion et validation des notes
    if (req.body.note_math !== undefined) {
      req.body.note_math = parseFloat(req.body.note_math).toFixed(2);
      if (req.body.note_math < 0 || req.body.note_math > 20) {
        return res.status(400).json({ message: 'La note de maths doit être entre 0 et 20' });
      }
    }
    
    if (req.body.note_phys !== undefined) {
      req.body.note_phys = parseFloat(req.body.note_phys).toFixed(2);
      if (req.body.note_phys < 0 || req.body.note_phys > 20) {
        return res.status(400).json({ message: 'La note de physique doit être entre 0 et 20' });
      }
    }

    const affectedRows = await Etudiant.update(numEt, req.body);
    
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Aucune modification effectuée' });
    }

    const updatedEtudiant = await Etudiant.findByNumEt(numEt);
    
    res.json({ 
      success: true,
      data: {
        ...updatedEtudiant,
        note_math: parseFloat(updatedEtudiant.note_math),
        note_phys: parseFloat(updatedEtudiant.note_phys),
        moyenne: parseFloat(updatedEtudiant.moyenne)
      },
      message: 'Étudiant mis à jour avec succès'
    });

  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { numEt } = req.params;
    
    if (!numEt) {
      return res.status(400).json({ message: 'numEt est requis' });
    }

    const affectedRows = await Etudiant.delete(numEt);
    
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    res.json({ 
      success: true,
      message: 'Étudiant supprimé avec succès'
    });

  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};