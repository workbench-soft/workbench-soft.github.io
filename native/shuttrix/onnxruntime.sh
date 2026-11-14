#!/bin/sh
# Builds an ONNX Runtime AAR for Shuttrix with only the operators and types of its depth model,
# and the depth model in the ORT format that such a minimal build reads.
# Usage: onnxruntime.sh <out dir>. Needs ANDROID_HOME, ANDROID_NDK_HOME, Java 17, Python 3, CMake and Ninja.
set -eu

ORT_VERSION=1.31.1
MODEL=depth-anything-v2-small-int8
MODEL_URL=https://github.com/workbench-soft/workbench-soft.github.io/releases/download/shuttrix-models/$MODEL.onnx
MODEL_SHA256=01aa7a23de3f4a0ee1a2bb9997e6918104c85a9f95dea46d27b9b3fb0c6b9001

mkdir -p "$1"
out=$(cd "$1" && pwd)
here=$(cd "$(dirname "$0")" && pwd)
work=${WORK:-$PWD/work-onnxruntime}
mkdir -p "$work"
cd "$work"

curl -fsSL -o "$MODEL.onnx" "$MODEL_URL"
echo "$MODEL_SHA256  $MODEL.onnx" | sha256sum -c -

python3 -m venv venv
. venv/bin/activate
pip install --quiet "onnxruntime==$ORT_VERSION"
# arm keeps the x86 only NCHWc kernels out of the model, so the phone finds a kernel for each node.
python -m onnxruntime.tools.convert_onnx_models_to_ort "$MODEL.onnx" --output_dir models \
  --enable_type_reduction --target_platform arm
config=$(ls models/*.config)
cat "$config"

[ -d src ] || git clone --quiet --depth 1 --branch "v$ORT_VERSION" https://github.com/microsoft/onnxruntime.git src
pip install --quiet -r src/requirements.txt flatbuffers
python src/tools/ci_build/github/android/build_aar_package.py --config Release \
  --android_sdk_path "$ANDROID_HOME" --android_ndk_path "$ANDROID_NDK_HOME" \
  --build_dir build --include_ops_by_config "$config" "$here/onnxruntime-aar.json"

aar=$(find build/aar_out -name "onnxruntime-android-*.aar" | head -n 1)
cp "$aar" "$out/onnxruntime-android-shuttrix-$ORT_VERSION.aar"
cp "models/$MODEL.ort" "$out/$MODEL.ort"
cp "$config" "$out/onnxruntime-operators.config"
