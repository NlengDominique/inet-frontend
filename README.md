# InetFrontend - Application de Gestion de Catalogue

Ce projet est une application frontend développée avec **Angular 21** permettant la gestion et la consultation d'un catalogue de livres. Elle inclut un système d'authentification et une interface utilisateur moderne basée sur Bootstrap.

## 🚀 Fonctionnalités

- 🔐 **Authentification** : Système de connexion sécurisé avec redirection automatique.
- 📚 **Catalogue de Livres** : Affichage d'une liste paginée de livres.
- 🛡️ **Guards & Interceptors** : Protection des routes (`AuthGuard`) et gestion des tokens d'authentification.
- 🎨 **Interface Moderne** : Utilisation de **Bootstrap 5** et **FontAwesome 7** pour une expérience utilisateur fluide.
- ✅ **Tests unitaires** : Intégration de **Vitest** pour la robustesse du code.

## 🛠️ Technologies Utilisées

- **Framework** : Angular 21.2.4
- **Langage** : TypeScript
- **Style** : Bootstrap 5.3.8 & CSS
- **Icônes** : FontAwesome 7.1.0
- **Test Runner** : Vitest 4.0.8
- **Gestionnaire de paquets** : npm

## 🏁 Démarrage Rapide

### Prérequis

Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version compatible avec npm 10.9.4) et [Angular CLI](https://angular.dev/tools/cli) installés.

### Installation

1. Clonez le projet.
2. Installez les dépendances :
   ```bash
   npm install
   ```

### Lancement du serveur de développement

Pour démarrer l'application localement :
```bash
npm start
```
Une fois lancé, accédez à `http://localhost:4200/`. L'application se rechargera automatiquement à chaque modification.

## 🏗️ Structure du Projet

- `src/app/guards/` : Protection des accès (AuthGuard).
- `src/app/interceptors/` : Interception des requêtes HTTP (Auth).
- `src/app/models/` : Définitions des interfaces de données (Book, User, PaginatedResponse).
- `src/app/services/` : Logique de communication avec l'API (AuthService, BookService).
- `src/app/shared/` : Composants réutilisables (Navbar, Footer, Login).
- `src/app/user/` : Fonctionnalités spécifiques aux utilisateurs (Catalogue/BookList).

## 📜 Scripts Disponibles

- `npm start` : Lance le serveur de développement.
- `npm run build` : Compile le projet pour la production dans le dossier `dist/`.
- `npm run test` : Exécute les tests unitaires avec Vitest.
- `npm run watch` : Compile en mode développement avec observation des changements.

## 🧪 Tests

Pour exécuter les tests avec Vitest :
```bash
npm test
```

---
Généré avec l'Angular CLI.
