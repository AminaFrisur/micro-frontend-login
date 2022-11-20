cd node_frontend/src
npm install
npm run build
cp dist/main.css ../../public
cp dist/main.mjs ../../public
cd ../../
node ./public/main.mjs
