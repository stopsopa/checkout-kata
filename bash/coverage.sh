

FILE="coverage/index.html"
if [ ! -f "${FILE}" ]; then

  cat <<EEE

  file >${FILE}< doesn't exist
  
  to generate manually
  mvn clean test jacoco:report

EEE
  
  exit 1
fi  

FILE="file://$(realpath "${FILE}")"   

cat <<EEE

Ways to open:
    open "${FILE}"
    open -a "Google Chrome" "${FILE}"

EEE

echo -e "\n      Press enter to continue\n"
read

open "${FILE}"