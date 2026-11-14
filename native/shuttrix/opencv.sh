#!/bin/sh
# Builds an OpenCV AAR for Shuttrix with only the modules it calls: core, imgproc, features, video and the Java bindings.
# Usage: opencv.sh <out dir>. Needs ANDROID_HOME, ANDROID_NDK_HOME, Java 17, Python 3, CMake and Ninja.
set -eu

OPENCV_VERSION=5.0.0
MODULES=core,imgproc,features,video,java

mkdir -p "$1"
out=$(cd "$1" && pwd)
work=${WORK:-$PWD/work-opencv}
mkdir -p "$work"
cd "$work"

[ -d src ] || git clone --quiet --depth 1 --branch "$OPENCV_VERSION" https://github.com/opencv/opencv.git src
# The ABIs of the Shuttrix APK and Play bundle, at its minSdkVersion. 16 KB pages as in default.config.py of OpenCV.
cat > shuttrix.config.py <<'EOF'
ABIs = [
    ABI("2", "armeabi-v7a", None, 28, cmake_vars=dict(ANDROID_ABI='armeabi-v7a with NEON')),
    ABI("3", "arm64-v8a", None, 28, cmake_vars=dict(ANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES='ON')),
]
EOF
python3 src/platforms/android/build_sdk.py --config "$work/shuttrix.config.py" \
  --ndk_path "$ANDROID_NDK_HOME" --sdk_path "$ANDROID_HOME" \
  --no_samples_build --no_kotlin --no_media_ndk --modules_list "$MODULES" sdk "$work/src"
python3 src/platforms/android/build_java_shared_aar.py sdk/OpenCV-android-sdk \
  --android_min_sdk 28 --ndk_location "$ANDROID_NDK_HOME"

cp "outputs/opencv_java_shared_$OPENCV_VERSION.aar" "$out/opencv-shuttrix-$OPENCV_VERSION.aar"
