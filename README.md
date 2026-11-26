# Armytek Hong Kong — static landing

Standalone English landing for Armytek Optoelectronics Limited. All 14 images, CSS and JavaScript are local; no CS-Cart, PHP, database, build step or CDN is needed.

## GitHub Pages preview

Open Settings → Pages. Choose Deploy from a branch, main, /(root), then Save.

Expected project URL after successful deployment:
https://threedaysofretail-collab.github.io/armytek.hk/

No custom domain is configured by this commit. Relative asset paths support the project URL and deployment on armytek.hk.

## Hosting

Upload index.html, assets/ and images/ to the website document root. DEPLOY.txt contains deployment notes. package_site.py rebuilds the hosting ZIP using Python's standard library; ASSETS.json records image checksums.

## Request form

Send Request opens a visual form. First and last names are required; email and phone are optional. Confirm explicitly reports that the form has not been sent and the feature is under development. No information is transmitted or saved. Contact: armytekm@gmail.com.

## Validation

Local CSS/JavaScript loading, relative assets and anchors, 5 series, 12 models, 14 images, form validation and modal interactions were checked. Uploaded blobs were checked against local Git SHA-1 values. Browser dialog methods were stubbed in DOM tests; desktop/mobile visual review remains necessary after deployment.
