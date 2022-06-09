# eventApp
for env setup
**Only for android need to add**

    apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
    
   in eventApp/android/app/build.gradle.  on line number 2
    
**for ios**  
   pod install

**in package.json**
  Write script as below:
  
    "staging": "cp ./.env.staging ./.env && react-native start",
    "build-prod": "cp ./.env.prod ./.env && react-native start",
    "build-dev": "cp ./.env.dev ./.env && react-native start",
    "build-dev-ios": "cp ./.env.dev ./.env && react-native run-ios",
    "build-dev-android": "cp ./.env.dev ./.env && react-native run-android",
    "staging-ios": "cp ./.env.staging ./.env && react-native run-ios",
    "staging-android": "cp ./.env.staging ./.env && react-native run-android",
    "build-prod-ios": "cp ./.env.prod ./.env && react-native run-ios",
    "build-prod-android": "cp ./.env.prod ./.env && react-native run-android"
