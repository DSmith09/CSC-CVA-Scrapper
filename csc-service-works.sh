NUMBER_OF_IDS_TO_SCRAPE=10000
NUMBER_OF_IDS_PER_TEST=100

START=$@
START=${START:-1} # default value for START if not provided
END=$((START + NUMBER_OF_IDS_TO_SCRAPE))

LOG_PATH="./output/csc_cva_ids_${START}_to_${END}.log"

while [ $START -lt $END ];
do
    ELECTRON_ENABLE_LOGGING=1 npx cypress run \
        --spec 'cypress/integration/csc.service.works.spec.js' \
        --env IDX=$START,NUMBER_OF_IDS=$NUMBER_OF_IDS_PER_TEST,PATH=$LOG_PATH \
        >> $LOG_PATH 2>&1
    START=$(($START+$NUMBER_OF_IDS_PER_TEST))
done

yarn parse:csc-service-works $LOG_PATH
