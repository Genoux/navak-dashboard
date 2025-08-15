# Navak Dashboard

> **Tableau de bord pour l'installation interactive Navak - Projet final baccalauréat en média interactif UQAM**

## Description

Navak est une installation artistique interactive développée dans le cadre d'un projet final de baccalauréat en média interactif à l'Université du Québec à Montréal (UQAM). Cette interface web permet de monitorer et contrôler le système en temps réel.

### Concept de l'Installation

L'expérience Navak invite les participants à :

1. **Détection du pouls** - Placer leurs mains sur des capteurs de battements cardiaques
2. **Attribution personnalisée** - Se voir attribuer une lanterne qui s'illumine selon leur rythme cardiaque
3. **Déambulation interactive** - Prendre leur lanterne et se déplacer dans l'espace d'exposition
4. **Expérience collective** - Créer un environnement lumineux collectif basé sur les battements de cœur individuels

## Dashboard

Ce tableau de bord permet de superviser :

- **Lanternes** - État, couleurs, et attribution aux utilisateurs
- **Stations de scan** - Capteurs de pouls et détection de présence  
- **Aires d'exposition** - Zones de l'installation et activité
- **Serveurs** - Infrastructure technique et monitoring
- **Fixtures** - Équipement d'éclairage DMX

## Démonstration

Cette version est une **démonstration** avec données simulées. L'interface présente le système tel qu'il fonctionnait lors de l'installation originale, permettant d'explorer les fonctionnalités sans l'infrastructure physique.

## Contexte Académique

Navak a été développé dans le cadre d'un projet final de baccalauréat en média interactif à l'UQAM. L'installation était présentée dans le cadre d'une déambulation interactive à Laval, explorant l'intersection entre technologie, art interactif et expérience collective.

**En savoir plus :** [Une déambulation interactive à Laval](https://actualites.uqam.ca/2022/une-deambulation-interactive-laval/)

## Technologies

- **Frontend** : Vue.js 2, Meteor.js, Tailwind CSS
- **Backend** : Node.js, Express, MongoDB
- **Hardware** : Capteurs BPM Bluetooth, éclairage DMX, MQTT
- **Communication** : WebSocket, MQTT, Art-Net

## License

Projet académique - UQAM

---

*Interface développée pour l'installation artistique interactive Navak*