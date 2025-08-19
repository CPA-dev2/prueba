# Levantado de app prendacredito

## Requisitos

- Node v12.22.12
- Yarn 1.22.19
- Android sdk 30
- Android estudio

## Modificaciones antes de firmar la aplicacion

Actualizar la version de codigo de la apliacion cada ves que se vuelva a firmar la aplicacion, esto se hace en la ruta:

```
android/app/build.gradle
```

las variables a actualizar son las siguientes:

```
versionCode 24
versionName "1.2"
```

la ubiacion de las mismas son:

```
defaultConfig {  
	applicationId "com.prendacreditoavanza"  
	minSdkVersion rootProject.ext.minSdkVersion  
	targetSdkVersion rootProject.ext.targetSdkVersion  
	versionCode 24 <== Actualizar aqui  
	versionName "1.2.0" <== Actualizar aqui  
	multiDexEnabled true
}
```

Tambien se deben de actualizar las variables compileSdkVersion y targetSdkVersion en la siguiente ruta:

```
android/app/build.gradle
```

Se deberan de incrementar.

```
buildscript {
    ext {
        //buildToolsVersion = "28.0.3"
        minSdkVersion = 21
        compileSdkVersion = 31 <========= Actualizar aqui
        targetSdkVersion = 31 <========== Actualizar aqui
        supportLibVersion = "28.0.0"
        googlePlayServicesVersion = "17.0.0"
        firebaseMessagingVersion = "19.0.0"
    }
```



**Nota:** Solicitar el correlativo de la version a SysAdmin.

## Firma de aplicacion desde linux

Estando en la carpeta del proyecto ejecutar el siguiente comando:

yarn jetify

cd android && ./gradlew app:assembleRelease --no-build-cache

## Posible error

Task :react-native-image-picker:verifyReleaseResources FAILED

FAILURE: Build failed with an exception.

What went wrong:
Execution failed for task ':react-native-image-picker:verifyReleaseResources'.

> 1 exception was raised by workers:
> com.android.builder.internal.aapt.v2.Aapt2Exception: Android resource linking failed

## Solución

Abrir el archivo:
node_modules/react-native-picker/android/build.gradle

Dejarlo configurado de la siguiente manera:

android {
compileSdkVersion 28
//buildToolsVersion "23.0.1"

defaultConfig {
minSdkVersion 16
targetSdkVersion 28
versionCode 1
versionName "1.0"
}
}

Y volver a ejecutar el comando anterior
