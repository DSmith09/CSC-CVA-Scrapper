NUMBER_OF_IDS_TO_SCRAPE=10000

START=$@
START=${START:-1} # default value for START if not provided
END=$((START + NUMBER_OF_IDS_TO_SCRAPE))

LOG_PATH="./output/csc_cva_ids_${START}_to_${END}.log"

ELECTRON_ENABLE_LOGGING=1 npx cypress run \
    --browser chrome \
    --spec 'cypress/e2e/csc-spec.cy.js' \
    --env IDX=$START,NUMBER_OF_IDS=$NUMBER_OF_IDS_TO_SCRAPE,LOG=$LOG_PATH \
    > $LOG_PATH 2>&1

yarn parse:csc-service-works $LOG_PATH