# Small native libraries for Shuttrix

## One-pager

- **Goal** the Shuttrix APK carries an ONNX Runtime and an OpenCV with only the parts the camera calls. Each one shrinks from about 13 MB in the APK to a few MB.
- **Where** this public repo builds both on a GitHub runner, which costs no Actions minutes here. The private `memories` repo downloads the files and checks their SHA-256.
- **What ships** the `shuttrix-native-<n>` release holds the ONNX Runtime AAR, the OpenCV AAR, the depth model in the ORT format and `SHA256SUMS`.
- **How** [shuttrix-native.yml](../.github/workflows/shuttrix-native.yml) runs the scripts in [native/shuttrix/](../native/shuttrix/) on a manual start. Each run makes a new tag, so a published file stays the same.
- **Plan** the APK size work sits in `specs/apk-size.md` of the `memories` repo.

## What it does for the person

- **Smaller update** the Shuttrix APK from GitHub gets smaller, so an update takes less data.
- **Same camera** Portrait, Mini, panoramas and the stacking modes keep working as before.

## How it works: modules, files, data

- **`native/shuttrix/onnxruntime.sh`** downloads `depth-anything-v2-small-int8.onnx` from the `shuttrix-models` release and checks its hash. The `onnxruntime` Python package of the same version turns it into an ORT format model and lists its operators and types. The ONNX Runtime sources then build a minimal AAR with those operators alone.
- **`native/shuttrix/opencv.sh`** builds OpenCV from its sources with `core`, `imgproc`, `features`, `video` and the Java bindings, then packs them into an AAR with the OpenCV scripts.
- **ABIs** both AARs hold `arm64-v8a` for the GitHub APK and `armeabi-v7a` for the Play bundle. The libraries load on 16 KB page phones.
- **Versions** ONNX Runtime and OpenCV match the versions `memories` used from Maven before: 1.31.1 and 5.0.0. NDK 27.1, as React Native in Shuttrix uses.
- **Release** the `publish` job uploads the files to a new `shuttrix-native-<run number>` release, marked as a prerelease so the app updaters skip it.

## Limits

- **One model** the ONNX Runtime build runs only the operators of the depth model. A new ONNX model in Shuttrix needs a new run of this workflow.
- **ORT format** a minimal ONNX Runtime reads only ORT format models. Shuttrix downloads `depth-anything-v2-small-int8.ort` from the same release.
- **Build time** a run takes about an hour on the hosted runner.

## Changes

### 2026-11-15 Build ONNX Runtime and OpenCV for Shuttrix

- **Why** the two libraries took 26 MB of the 73 MB Shuttrix APK. Shuttrix calls a small part of each.
- **Changes** `native/shuttrix/`, `.github/workflows/shuttrix-native.yml`, `README.md`.
- **Steps** this spec, then the scripts and the workflow, then a run that publishes the first release.
- **Docs** `README.md`.
