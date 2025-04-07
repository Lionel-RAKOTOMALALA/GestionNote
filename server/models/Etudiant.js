const pool = require('../config/db');

class Etudiant {

    static async create({ numEt, nom, note_math, note_phys }) {
        // Arrondir les notes à 2 décimales avant insertion
        const roundedMath = parseFloat(note_math).toFixed(2);
        const roundedPhys = parseFloat(note_phys).toFixed(2);
        
        const [result] = await pool.execute(
          'INSERT INTO Etudiant (numEt, nom, note_math, note_phys) VALUES (?, ?, ?, ?)',
          [numEt, nom, roundedMath, roundedPhys]
        );
        return numEt;
      }
      
      static async update(numEt, { nom, note_math, note_phys }) {
        // Arrondir les notes à 2 décimales avant mise à jour
        const roundedMath = note_math !== undefined ? parseFloat(note_math).toFixed(2) : undefined;
        const roundedPhys = note_phys !== undefined ? parseFloat(note_phys).toFixed(2) : undefined;
        
        const [result] = await pool.execute(
          'UPDATE Etudiant SET nom = COALESCE(?, nom), note_math = COALESCE(?, note_math), note_phys = COALESCE(?, note_phys) WHERE numEt = ?',
          [nom, roundedMath, roundedPhys, numEt]
        );
        return result.affectedRows;
      }

  static async findByNumEt(numEt) {
    const [rows] = await pool.execute('SELECT * FROM Etudiant WHERE numEt = ?', [numEt]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT 
        numEt,
        nom,
        CAST(note_math AS DECIMAL(5,2)) AS note_math,
        CAST(note_phys AS DECIMAL(5,2)) AS note_phys,
        CAST((CAST(note_math AS DECIMAL(5,2)) + CAST(note_phys AS DECIMAL(5,2))) / 2 AS DECIMAL(5,2)) AS moyenne,
        created_at
      FROM Etudiant 
      ORDER BY created_at DESC
    `);
    return rows;
  }



  static async delete(numEt) {
    const [result] = await pool.execute(
      'DELETE FROM Etudiant WHERE numEt = ?',
      [numEt]
    );
    return result.affectedRows;
  }

  static async getStats() {
    const [rows] = await pool.execute(`
      SELECT 
        COUNT(*) as total,
        AVG((note_math + note_phys)/2) as moyenneClasse,
        MIN((note_math + note_phys)/2) as moyenneMin,
        MAX((note_math + note_phys)/2) as moyenneMax,
        SUM(CASE WHEN (note_math + note_phys)/2 >= 10 THEN 1 ELSE 0 END) as admis,
        SUM(CASE WHEN (note_math + note_phys)/2 < 10 THEN 1 ELSE 0 END) as redoublants
      FROM Etudiant
    `);
    return rows[0];
  }
}

module.exports = Etudiant;