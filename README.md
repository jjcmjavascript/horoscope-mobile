# install
npm i

# execute
npm start

# build
for playstore aab: eas build -p android --profile production

for preview apk: eas build -p android --profile preview

./gradlew assembleRelease
