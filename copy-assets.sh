#Copy dt-webcomponents assets
cp -r -f node_modules/@npm-bbta/bbog-dig-dt-webcomponents-lib/dist/bdb-webcomponents/assets ./
cp -f node_modules/@npm-bbta/bbog-dig-dt-webcomponents-lib/dist/bdb-webcomponents/bdb-webcomponents.css ./src/bdb-webcomponents.scss

# sed -i "" "s|!important;|, sans-serif !important;|g" src/assets/fonts/icons.scss
# sed -i "" "s|font-family: Roboto-Medium;|font-family: Roboto-Medium, sans-serif;|g" src/assets/scss/buttons.scss

