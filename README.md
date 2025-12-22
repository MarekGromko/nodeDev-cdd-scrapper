# NodeDev Scrapper

## Introduction

Ce repository github contient les appelles API pour la collecte des données de l'application *Global Currency*. Les données sont récuprérées à l'aide de **Python**, traitées avec la librairy **Panda**, et enregistrées directement dans une collection **MongoDB**.

**Repositories:**
  - API : https://github.com/MarekGromko/nodeDev-cdd-api
  - Dashboard : https://github.com/MarekGromko/nodeDev-cdd-dashboard

## Source des données

Pour le projet *Global Currency*, les données historiques des taux d'échange de monnaies ont été récupérées par le biais de différentes API qui offraient gratuitement une liste historique de données. Celle-ci inclus:

- [Forex API](https://fxapi.com/)
- [European Central Bank](https://www.ecb.europa.eu/home/html/index.en.html)

Dans un autre temps, les données en temps réel sont récoltée en utilisant seulement l'api [exchangerates](https://exchangeratesapi.io/). L'application Python est concus spécialement pour être utilisé dans des outils comme AWS Lambda, ou un EventBridge Scheduler, dans le but de pouvoir facilement gérer le *scheduling* de la récolte de données.

## Structure des données

Les données ont une structure extrêmement simple, le but étant plutôt d'en avoir en grande quantité pour pouvoir en extrapoler des relations entre celles-ci.

**Structure du modèle**:
| Champ | Type | Description |
|--------|------|-------------|
| `code` | String   | Code unique de la devise (ex: "USD") |
| `rate` | Number   | Taux par rapport à une devise de référence |
| `date` | Date     | Date de relevé du taux |

Vous avez un exemple de ces données récoltées dans le fichier `data-slice-5000.csv`.
Aux total, La quantité de données à la fin du projet s'élève a 765k enregistrement, pour 170 différente monnaies sur plus de 10 ans.

## Architecture

### Dépendances

voici la liste des dépendances, elles est aussi disponibles dans le fichier `requirements.txt`:
```
pandas
click
requests
python-dotenv
pymongo
typer
```

## Structure du code
```
nodeDev-cdd-scrapper/
├── profiles/   Information à propos des dernières données récolté par ceratines API
├── slices/     Sous-ensembles de données récoltées
├── src/
│   ├── utils/              Outils d'uitlité
│   │   └── init_log.py     Initialisation du systême de log
│   │   └── db.py           Initialisation de la database mongodb
│   │   └── profiles.py     Initialisation des outils pour 
                            lire et sauvegarder les profiles
│   └── exchangesratesapi.py    Outil pour appeler l'api exchangerates 
│   └── main.py     L'entrée du programme
├── exemple.env     Variables d'environnement 
                    minimales nécéssaires
```

## Utilisation

1. Installer les dépendences nécéssaires tel que vue précédement
2. Initialier les varibles d'environnement minimal:
    - `MONGODB_URI` l'adresse URI du service mongodb
    - `MONGODB_DBNAME` le nom de la base de données
    - `MONGODB_COLLECTION` le nom de la collection où enregistrer les données
    - `EXCHANGE_RATES_API_ACCESS_KEY` la clé d'accèes pour l'api exchangerates
3. L'application à deux mode, un mode commande, et un mode intéractif:

### Commandes

- `python ./src/main.py latest` retourne la date la plus récentes parmis les enregistrements dans la collection mongodb
- `python ./src/main.py oldest` retourne la date la plus anciennes parmis les enregistrements dans la collection mongodb
- `python ./src/main.py fetch [YYYY-MM-DD]` Fetch les données de l'api à une date données
- `python ./src/main.py interactive` Ouvre le mode intéractif

### Scripts

- `fetch-now.sh` appelle la comande `fetch` à la date d'aujourd'hui
- `scheduler-setup` crée une crontab (job) qui appelle chaque jour le script `fetch-now`
