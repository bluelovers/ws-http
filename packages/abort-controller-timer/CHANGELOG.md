# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.14](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.13...abort-controller-timer@1.0.14) (2021-08-12)


### ♻️　Chores

* **deps:** update deps ([3c3bdaf](https://github.com/bluelovers/ws-http/commit/3c3bdaf498061eabdbe45f87886eaa3aa8ff30ea))





## [1.0.13](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.12...abort-controller-timer@1.0.13) (2021-07-30)


### 🐛　Bug Fixes

* not allow set timeout after abort ([f155130](https://github.com/bluelovers/ws-http/commit/f15513062d674dffe3ff449a9c087b4d996a360a))





## [1.0.12](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.11...abort-controller-timer@1.0.12) (2021-07-30)


### 🐛　Bug Fixes

* avoid setMaxListeners warn ([4565233](https://github.com/bluelovers/ws-http/commit/4565233fbb7d0ae8a12dd11fc2883468838d0cb3))





## [1.0.11](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.10...abort-controller-timer@1.0.11) (2021-07-19)


### ✨　Features

* 支援將 Signal , Controller 連結起來，達到可以在父 Signal / Controller 中斷時，同時中斷所有子 Signal ([f36f17d](https://github.com/bluelovers/ws-http/commit/f36f17d2155f5e3133f7d1e2cb1f4a6a9964bfe4))





## [1.0.10](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.9...abort-controller-timer@1.0.10) (2021-07-11)


### 🐛　Bug Fixes

* 修正 node.js 15 以上才有內建 `AbortController` 的問題 ([8ac8304](https://github.com/bluelovers/ws-http/commit/8ac8304413a26f9f4a83926548d3f0b62205853e))





## [1.0.9](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.8...abort-controller-timer@1.0.9) (2021-07-08)


### 📦　Code Refactoring

* use global `AbortController` ([c70e3f8](https://github.com/bluelovers/ws-http/commit/c70e3f85693bdc0436499c8ad32487bd5e7442ac))


### BREAKING CHANGE

* remove abort-controller





## [1.0.8](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.6...abort-controller-timer@1.0.8) (2021-07-08)


### 🚨　Tests

* fix test ([c1e6b80](https://github.com/bluelovers/ws-http/commit/c1e6b80b4c031c8b93d79bd68253b3a78c613d3f))


### 🛠　Build System

* use tslib ([fc3a75b](https://github.com/bluelovers/ws-http/commit/fc3a75b0aa7335cebc58b0640a42fcb1c65c00bc))


### 🔖　Miscellaneous

* . ([c6bb6db](https://github.com/bluelovers/ws-http/commit/c6bb6db2691bbbc445c43e42ec6c078c871948b3))
* . ([9dc7785](https://github.com/bluelovers/ws-http/commit/9dc7785db0710a76020a57427f28c235d3b05e05))





## [1.0.7](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.6...abort-controller-timer@1.0.7) (2021-07-08)


### 🚨　Tests

* fix test ([c1e6b80](https://github.com/bluelovers/ws-http/commit/c1e6b80b4c031c8b93d79bd68253b3a78c613d3f))


### 🛠　Build System

* use tslib ([fc3a75b](https://github.com/bluelovers/ws-http/commit/fc3a75b0aa7335cebc58b0640a42fcb1c65c00bc))


### 🔖　Miscellaneous

* . ([9dc7785](https://github.com/bluelovers/ws-http/commit/9dc7785db0710a76020a57427f28c235d3b05e05))





## [1.0.6](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.5...abort-controller-timer@1.0.6) (2020-06-16)


### ✨　Features

*  support proxy prop of AbortSignal ([41b9ef5](https://github.com/bluelovers/ws-http/commit/41b9ef519dc5fe0e3501e90f5d3ca14227514ce6))





## [1.0.5](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.4...abort-controller-timer@1.0.5) (2020-06-16)


### 🐛　Bug Fixes

*  fix test ([df11b1e](https://github.com/bluelovers/ws-http/commit/df11b1ea7a016954ef536d34c868fb94aab3dc5c))





## [1.0.4](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.3...abort-controller-timer@1.0.4) (2020-06-16)


### ✨　Features

*  allow set timeout ([874f7b6](https://github.com/bluelovers/ws-http/commit/874f7b64793399457290ac152f2f999b3487b04f))





## [1.0.3](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.2...abort-controller-timer@1.0.3) (2020-06-16)


### 🛠　Build System

*  retry publish ([b3400d0](https://github.com/bluelovers/ws-http/commit/b3400d0d1a70234b89116fded921e0f57ac8e6f2))





## [1.0.2](https://github.com/bluelovers/ws-http/compare/abort-controller-timer@1.0.1...abort-controller-timer@1.0.2) (2020-06-16)


### 🛠　Build System

*  retry publish ([9e5e61f](https://github.com/bluelovers/ws-http/commit/9e5e61f40b2ee673a77d2cc19512358b014aea5a))





## 1.0.1 (2020-06-16)


### ✨　Features

* **package:**  An AbortController that aborts after a specified timeout ([e0f4199](https://github.com/bluelovers/ws-http/commit/e0f4199128e6c1d94861fb1dcad3bda0dd4d1ccf))
