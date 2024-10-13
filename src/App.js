import React, { useState } from 'react';
import './App.css';
import html2pdf from 'html2pdf.js'; // Bibliothèque pour générer des PDFs

function App() {
  const [formData, setFormData] = useState({
    nomComplet: '',
    telephone: '',
    email: '',
    adresse: '',
    competences: '',
    langues: '',
    loisirs: '',
    experiences: '',
    formations: '',
    skills: '',
    poste: '',
    photo: null,
  });

  const [showCV, setShowCV] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleGenerateCV = () => {
    setShowCV(true); 
  };

  const handleGeneratePDF = () => {
    const element = document.querySelector('.cv-preview');
    const opt = {
      margin: 1,
      filename: 'MonCV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="app-container">
      <form className="cv-form">
        <h2>Formulaire de CV</h2>

        <label>Nom Complet:</label>
        <input type="text" name="nomComplet" value={formData.nomComplet} onChange={handleChange} placeholder="Nom Complet" />

        <label>Téléphone:</label>
        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />

        <label>Adresse:</label>
        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" />

        <label>Compétences:</label>
        <textarea name="competences" value={formData.competences} onChange={handleChange} placeholder="Liste de compétences"></textarea>

        <label>Langues:</label>
        <textarea name="langues" value={formData.langues} onChange={handleChange} placeholder="Langues parlées"></textarea>

        <label>Loisirs:</label>
        <textarea name="loisirs" value={formData.loisirs} onChange={handleChange} placeholder="Vos loisirs"></textarea>

        <label>Expériences Professionnelles:</label>
        <textarea name="experiences" value={formData.experiences} onChange={handleChange} placeholder="Vos expériences"></textarea>

        <label>poste de recherche :</label>
        <textarea name="poste" value={formData.poste} onChange={handleChange} placeholder="Votre parcours profesionnel"></textarea>

        <label>Formations:</label>
        <textarea name="formations" value={formData.formations} onChange={handleChange} placeholder="Vos formations"></textarea>

        <label>Skills :</label>
        <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="Vos Skills"></textarea>

        <label>Photo de Profil:</label>
        <input type="file" onChange={handlePhotoChange} />

        <button type="button" onClick={handleGenerateCV}>
          Générer CV
        </button>

        <button type="button" onClick={handleGeneratePDF} style={{ marginLeft: '10px' }}>
          Télécharger en PDF
        </button>
      </form>

      {/* Section de prévisualisation */}
      {showCV && (
        <div className="cv-preview">
          <div className="cv-left">
            {formData.photo && <img src={formData.photo} alt="Profil" />}
            <p><strong>Téléphone:</strong> {formData.telephone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Adresse:</strong> {formData.adresse}</p>
            <p><strong>Compétences:</strong> {formData.competences}</p>
            <p><strong>Langues:</strong> {formData.langues}</p>
            <p><strong>Loisirs:</strong> {formData.loisirs}</p>
          </div>
          <div className="cv-right">
            <h1>{formData.nomComplet}</h1>
            <h4>Poste de recherche :</h4>
            <p>{formData.poste}</p>
            <div className="separator"></div>
            <h2>Expériences Professionnelles :</h2>
            <p>{formData.experiences}</p>
            <h2>Formations :</h2>
            <p>{formData.formations}</p>
            <h2>Skills :</h2>
            <p>{formData.skills}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
