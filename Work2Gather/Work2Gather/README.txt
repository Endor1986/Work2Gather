Work2Gather App
Work2Gather ist eine einfache Webanwendung zur Aufgabenverwaltung, entwickelt mit Node.js und Express.js. Die Anwendung ermöglicht es, Aufgaben zu erstellen, an Mitarbeiter zuzuweisen, zu aktualisieren und zu löschen. Die Daten werden in einer JSON-Datei gespeichert, was das Projekt ideal für Demonstrationszwecke macht.

Funktionen
Aufgaben hinzufügen: Erstellen Sie neue Aufgaben mit Titel und Beschreibung.
Aufgaben anzeigen: Übersicht über alle erstellten Aufgaben.
Aufgaben zuweisen: Weisen Sie Aufgaben Mitarbeitern zu.
Aufgaben löschen: Entfernen Sie Aufgaben aus dem System.
Benutzer verwalten: Fügen Sie neue Benutzer hinzu oder löschen Sie bestehende Benutzer.

Verzeichnisstruktur

Work2Gather/
├── .vscode/
│   ├── launch.json
├── controllers/
│   ├── TaskController.js
│   ├── UserController.js
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
├── data.json
├── fileUtils.js
├── package.json
└── package-lock.json

Server erstellen und starten

Um die Anwendung auszuführen, folgen Sie diesen Schritten:

Wechseln Sie in das Verzeichnis, das die Projektdateien enthält:
Beispiel: cd C:\Users\...\Desktop\Visual Studio C# Projekte\C# WebTaskManager\WebTaskManager\WebTaskManager cd Work2Gather
Hinweis: Der Befehl cd Work2Gather muss mit dem lokalen Verzeichnis übereinstimmen, in dem das Projekt gespeichert wurde. Andernfalls kann der Server nicht starten, da die erforderlichen Dateien und Module nicht gefunden werden.

Abhängigkeiten installieren:
Installieren Sie die benötigten Node.js-Module mit folgendem Befehl:

npm install
Server starten:
Starten Sie den Server mit:
node app.js

Alternativ können Sie für eine automatische Neustart-Funktion nodemon verwenden:
npx nodemon app.js
Hinweis: Wenn nodemon nicht installiert ist, können Sie es global hinzufügen:
npm install -g nodemon

Zugriff auf die Anwendung:
Öffnen Sie Ihren Browser und navigieren Sie zu:

http://localhost:3000

Hinweis für Fortgeschrittene

Diese Anleitung setzt ein grundlegendes Verständnis von Node.js, Express.js und der Arbeit mit JSON-Dateien voraus. Folgende Konzepte werden im Projekt verwendet:

RESTful API: Die Routen für Aufgaben und Benutzer sind nach REST-Standards gestaltet.
JSON-Datenverwaltung: Die Daten werden in einer JSON-Datei persistiert. Kenntnisse im Umgang mit Dateisystemen und JSON-Parsing sind hilfreich.
Frontend-Integration: Grundlegende Kenntnisse in HTML, CSS und JavaScript sind nützlich, um das Frontend zu verstehen oder anzupassen.
Falls Ihnen diese Konzepte nicht vertraut sind, wird empfohlen, sich zunächst mit den Grundlagen von Node.js und Express.js vertraut zu machen.

Technologien

Backend: Node.js mit Express.js
Frontend: HTML, CSS, JavaScript
Datenbank: JSON-Datei (als persistente Datenspeicherung)


Diese Anwendung wurde als Testprojekt entwickelt, um grundlegende Programmierfähigkeiten und den Umgang mit Node.js und Express.js zu demonstrieren. Sie enthält die wichtigsten Funktionen eines Task-Managers und ist leicht erweiterbar.

