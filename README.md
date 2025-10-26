<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white">
  <img alt="Express.js" src="https://img.shields.io/badge/Express-4-black?logo=express&logoColor=white">
  <img alt="Nodemon" src="https://img.shields.io/badge/dev-nodemon-76D04B?logo=nodemon&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-lightgrey.svg">
</p>

# Work2Gather App

Einfache Aufgabenverwaltung als **Node.js/Express**-Webanwendung.  
Ermöglicht **Anlegen**, **Anzeigen**, **Zuweisen**, **Aktualisieren** und **Löschen** von Aufgaben.  
Daten werden in einer **JSON-Datei** gespeichert – ideal für Demos, kleine Tests und Lernzwecke.

---

## ✨ Funktionen

- **Aufgaben hinzufügen**: Titel & Beschreibung erfassen  
- **Aufgaben anzeigen**: Übersicht aller Aufgaben  
- **Aufgaben zuweisen**: Aufgaben Mitarbeiter:innen zuordnen  
- **Aufgaben bearbeiten/löschen**  
- **Benutzer verwalten**: Nutzer anlegen/löschen

---

## 🚀 Quickstart

```bash
# Ins Projektverzeichnis wechseln
cd Work2Gather

# Abhängigkeiten installieren
npm install

# Server starten
node app.js

# (Optional) mit automatischem Neustart
npx nodemon app.js
# oder global installieren:
# npm install -g nodemon
# nodemon app.js
```

- App: http://localhost:3000

> **Hinweis (Windows/Pfade):**  
> Achte darauf, dass du im **richtigen Ordner** bist (dort, wo `app.js` und `package.json` liegen).  
> Beispiel:  
> `cd C:\Users\<DU>\Desktop\Work2Gather`

---

## 📂 Verzeichnisstruktur

```text
Work2Gather/
├── .vscode/
│   └── launch.json
├── controllers/
│   ├── TaskController.js
│   └── UserController.js
├── models/
│   ├── Task.js
│   ├── User.js
│   ├── Team.js
│   └── Project.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── frontend.js
│   └── index.html
├── services/
│   └── TaskService.js
├── app.js
├── data.json              # Persistente JSON-Daten
├── fileUtils.js
├── package.json
└── package-lock.json
```

---

## 🔌 API-Überblick (Beispiel)

| Methode   | Pfad             | Beschreibung                         |
|:---------:|------------------|--------------------------------------|
| GET       | `/tasks`         | Alle Aufgaben anzeigen               |
| GET       | `/tasks/:id`     | Einzelne Aufgabe anzeigen            |
| POST      | `/tasks`         | Aufgabe anlegen                      |
| PUT/PATCH | `/tasks/:id`     | Aufgabe aktualisieren                |
| DELETE    | `/tasks/:id`     | Aufgabe löschen                      |
| GET       | `/users`         | Alle Benutzer anzeigen               |
| POST      | `/users`         | Benutzer anlegen                     |
| DELETE    | `/users/:id`     | Benutzer löschen                     |

> Die tatsächlichen Routen können je nach Implementierung leicht variieren (siehe `controllers/` & `app.js`).

---

## ⚙️ Konfiguration

**Umgebungsvariablen** (optional, z. B. via `.env` und `dotenv`):
```ini
PORT=3000
DATA_FILE=./data.json
```

**Startskripte** (optional in `package.json`):
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

---

## 🧰 Troubleshooting

- **„Cannot find module …“**  
  `npm install` im **Projektroot** ausführen; Node-Version ≥ 18 verwenden.
- **Port belegt**  
  Anderen Port setzen (z. B. `PORT=3001` in `.env`) und App neu starten.
- **Keine Daten gespeichert**  
  Schreibrechte für `data.json` prüfen; Pfad in `DATA_FILE` korrekt?
- **Frontend lädt Assets nicht**  
  Prüfe `public/` Pfade in `index.html` (CSS/JS), und dass Express den Ordner als static servt:
  ```js
  app.use(express.static('public'));
  ```

---

## 🧠 Hinweise für Fortgeschrittene

- **REST-Design** der Routen (Aufgaben/Benutzer)  
- **JSON-Persistenz** via Datei (einfacher Dateizugriff & Parsing)  
- **Einfache Frontend-Integration** mit HTML/CSS/JS (siehe `public/`)

---

## ✅ Status

- Kernfunktionen eines Task-Managers vorhanden  
- Leicht **erweiterbar** (z. B. Auth, Teams, Projekte, Filter/Suche)  
- Geeignet als **Test-/Lernprojekt** oder Portfolio-Beispiel

---

## 📜 Lizenz

MIT – siehe `LICENSE`.
