const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send("URL de playlist manquante !");
  }

  // Commande pour exécuter yt-dlp
  const command = `yt-dlp -f best -o "%(title)s.%(ext)s" "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur : ${stderr}`);
      return res.status(500).send("Erreur lors du téléchargement !");
    }

    console.log(`Sortie : ${stdout}`);
    res.status(200).send("Téléchargement terminé avec succès !");
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
