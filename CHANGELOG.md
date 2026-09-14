# Changelog

## [0.6.0](https://github.com/plutocms/supabase-blog/compare/v0.5.2...v0.6.0) (2026-09-14)


### Features

* **prose:** add `PlutoProse` for rendering stored richtext ([#29](https://github.com/plutocms/supabase-blog/issues/29)) ([fad9049](https://github.com/plutocms/supabase-blog/commit/fad904930ea5db7f792c0e9b30d8c6463be8d000))

## [0.5.2](https://github.com/plutocms/supabase-blog/compare/v0.5.1...v0.5.2) (2026-09-14)


### Bug Fixes

* **editor:** rebuild post editor on tiptap directly, fix freezes ([173f08a](https://github.com/plutocms/supabase-blog/commit/173f08a4bc32ddb37fd316a33dcce155bb92603e))

## [0.5.1](https://github.com/plutocms/supabase-blog/compare/v0.5.0...v0.5.1) (2026-09-14)


### Bug Fixes

* **content:** move postType under shared/utils so cross-layer imports work ([#26](https://github.com/plutocms/supabase-blog/issues/26)) ([d467193](https://github.com/plutocms/supabase-blog/commit/d46719312ac62b0c856010256059591062b4c7b9))

## [0.5.0](https://github.com/plutocms/supabase-blog/compare/v0.4.0...v0.5.0) (2026-09-13)


### Features

* **posts:** adopt the pluto content model ([#24](https://github.com/plutocms/supabase-blog/issues/24)) ([22052fb](https://github.com/plutocms/supabase-blog/commit/22052fbe288a1c07a5031f80db35d394449e9b48))

## [0.4.0](https://github.com/plutocms/supabase-blog/compare/v0.3.0...v0.4.0) (2026-09-12)


### Features

* **permissions:** gate posts on named capabilities ([#22](https://github.com/plutocms/supabase-blog/issues/22)) ([94afa03](https://github.com/plutocms/supabase-blog/commit/94afa03936f2882cf4a1c76bdbed10336305e315))

## [0.3.0](https://github.com/plutocms/supabase-blog/compare/v0.2.0...v0.3.0) (2026-09-12)


### Features

* **registry:** migrate to definePlutoExtension ([#20](https://github.com/plutocms/supabase-blog/issues/20)) ([1cbdccb](https://github.com/plutocms/supabase-blog/commit/1cbdccb18ebf78f2ac89975722b7d3d06f8a8091))

## [0.2.0](https://github.com/plutocms/supabase-blog/compare/v0.1.3...v0.2.0) (2026-09-12)


### Features

* **migrations:** move to versioned db/migrations layout ([#18](https://github.com/plutocms/supabase-blog/issues/18)) ([3eac117](https://github.com/plutocms/supabase-blog/commit/3eac1177d5188370dc2a9e0e38e67d6c69a7b613))


### Bug Fixes

* **deps:** require @plutocms/supabase 0.4.1 and @plutocms/supabase-storage 0.2.0 ([#19](https://github.com/plutocms/supabase-blog/issues/19)) ([186c7e1](https://github.com/plutocms/supabase-blog/commit/186c7e11953ba4e3abd89403459c34202665527d))
* **posts:** require admin for post mutations and draft reads ([#15](https://github.com/plutocms/supabase-blog/issues/15)) ([440ad2e](https://github.com/plutocms/supabase-blog/commit/440ad2e433d8f1b11fc0fdf9ed71b0b117263860))
* **schema:** make posts table/index creation idempotent ([#17](https://github.com/plutocms/supabase-blog/issues/17)) ([3892457](https://github.com/plutocms/supabase-blog/commit/38924572c53aac6966ac66e9230c98716e2a6592))

## [0.1.3](https://github.com/plutocms/supabase-blog/compare/v0.1.2...v0.1.3) (2026-09-10)


### Bug Fixes

* **deps:** require supabase 0.3.0 and supabase-storage 0.1.4 ([6ff5d1d](https://github.com/plutocms/supabase-blog/commit/6ff5d1d67925a1138f2a3b762de99f1ab483c2c6))

## [0.1.2](https://github.com/plutocms/supabase-blog/compare/v0.1.1...v0.1.2) (2026-09-10)


### Bug Fixes

* **deps:** require supabase 0.2.2 and supabase-storage 0.1.3 ([732d635](https://github.com/plutocms/supabase-blog/commit/732d635c9a23700b91d9dd2b5a51cbc6c3b0fc17))

## [0.1.1](https://github.com/plutocms/supabase-blog/compare/v0.1.0...v0.1.1) (2026-09-09)


### Bug Fixes

* **deps:** align released Pluto layers ([#11](https://github.com/plutocms/supabase-blog/issues/11)) ([637bcf0](https://github.com/plutocms/supabase-blog/commit/637bcf0bda56004c1420579ee45b686fa6a21f49))

## 0.1.0 (2026-09-03)


### Features

* depend on supabase, supabase-storage, and ui layers directly ([a04f65f](https://github.com/plutocms/supabase-blog/commit/a04f65f6116961e8242693098d5c0d78cc4e0ce6))


### Bug Fixes

* bump @plutocms/supabase-storage to ^0.1.1 ([4486b33](https://github.com/plutocms/supabase-blog/commit/4486b332b260c1c41e7f5d67164091e2656efc66))
* bump supabase, supabase-storage, and ui to their fixed releases ([97c6fdd](https://github.com/plutocms/supabase-blog/commit/97c6fdd912410defd35149678b8417191bc4c5b1))
* never ship the generated shared/types/supabase.ts placeholder ([ffb8e02](https://github.com/plutocms/supabase-blog/commit/ffb8e028601dd95500d49008a5a1b8085c657ed6))


### Miscellaneous Chores

* **ci:** promote to publishable package and add release-please pipeline ([2b838f1](https://github.com/plutocms/supabase-blog/commit/2b838f15e02515501ae43dd9a956a1a17664b736))
