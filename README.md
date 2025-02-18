# install

npm i

# execute

npm start

# build

For testing with ads: eas build -p android --profile development, you should download the apk from the eas build page

for playstore aab: eas build -p android --profile production

for testing without ads apk: eas build -p android --profile preview

### For manual build

- folder result: android/app/build/outputs/apk/release/app-release.apk
- APK
  cd ./android && ./gradlew assembleRelease
- AAB
  cd ./android && ./gradlew bundleRelease
