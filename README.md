# install
npm i

# execute
npm start

# build
For testing with ads: npx eas-cli build --profile development, you should download the apk from the eas build page

for playstore aab: eas build -p android --profile production

for testing without ads apk: eas build -p android --profile preview

./gradlew assembleRelease
