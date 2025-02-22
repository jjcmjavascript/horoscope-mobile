# install

npm i

# execute

npm start

# build

## Eas

### Testing

- With ads: eas build -p android --profile development
- Without ads apk: eas build -p android --profile preview

### Production

- aab: eas build -p android --profile production

## Local

### Testing

- npx eas-cli build --profile development --local

- folder result: android/app/build/outputs/apk/release/app-release.apk

### Production

- APK
  cd ./android && ./gradlew assembleRelease
- AAB
  cd ./android && ./gradlew bundleRelease
