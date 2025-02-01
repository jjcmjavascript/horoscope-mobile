# install
npm i

# execute
npm start

# build
for playstore aab: eas build --platform android
for preview apk: eas build -p android --profile preview
./gradlew assembleRelease
