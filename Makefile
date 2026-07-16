.PHONY: help doctor setup install preview preview-watch build clean validate lint test check-links check-external-links check-content portability-check nav-footers nav-footers-check format ci deploy-info new-page new-topic generate-subtopics improve-generated-content export-mkdocs serve-build list-stubs list-drafts list-stale

PORT ?= 8080
WS_PORT ?= $(shell expr $(PORT) + 1)

help: ## Show available targets.
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_-]+:.*##/ {printf "%-22s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

doctor: ## Check local runtime and repository shape without mutating files.
	@node scripts/doctor.mjs

setup: install ## Safe first-time setup.

install: ## Install locked dependencies reproducibly.
	npm ci
	npx quartz plugin install
	npm run patch-plugins

preview: ## Serve public/ locally; build once first only if public/ is missing.
	@if [ ! -f public/index.html ]; then echo "public/index.html not found; running make build first."; $(MAKE) build; fi
	@echo "Preview URL: http://localhost:$(PORT)"
	node scripts/serve-public.mjs --port $(PORT) --dir public

preview-watch: ## Start Quartz local preview with watching.
	@echo "Preview URL: http://localhost:$(PORT)"
	npm run patch-plugins
	npm run quartz -- build --serve --port $(PORT) --wsPort $(WS_PORT)

build: ## Build the static site into public/.
	npm run patch-plugins
	npm run quartz -- build

clean: ## Remove generated build artifacts only.
	rm -rf public .generated

validate: check-content check-links portability-check nav-footers-check ## Run all repository validations.

nav-footers: ## Regenerate per-section and learning-path navigation footers.
	node scripts/gen-nav-footers.mjs

nav-footers-check: ## Fail if navigation footers are out of date.
	node scripts/gen-nav-footers.mjs --check

lint: ## Check formatting, TypeScript, YAML, and Markdown structure.
	npm run check

test: ## Run automated tests.
	npm test

check-links: ## Detect broken internal Markdown links and missing assets.
	node scripts/check-links.mjs

check-external-links: ## Check external URL liveness over the network (non-blocking; add ARGS=--strict to fail).
	node scripts/check-external-links.mjs $(ARGS)

check-content: ## Validate front matter, indexes, duplicate slugs, aliases, and hygiene.
	node scripts/validate-content.mjs

portability-check: ## Detect known non-portable Markdown constructs.
	node scripts/portability-check.mjs

format: ## Apply safe formatting.
	npx prettier . --write

ci: validate lint test build ## Run the CI-equivalent sequence.

deploy-info: ## Print GitHub Pages deployment information.
	@node -e 'const cp=require("child_process"); let url=""; try{url=cp.execSync("git config --get remote.origin.url",{encoding:"utf8"}).trim()}catch{}; const repo=url.match(/[:/]([^/]+)\/([^/.]+)(?:\.git)?$$/); if(repo){console.log("Expected project Pages URL: https://"+repo[1]+".github.io/"+repo[2]+"/")} else {console.log("No origin remote found. Project URL will be https://<owner>.github.io/<repository>/")} console.log("Set GitHub Pages source to GitHub Actions.")'

new-page: ## Create a new page. Usage: make new-page TYPE=concept PATH=dir/page.md TITLE='Title'
	node scripts/new-page.mjs --type=$(TYPE) --path=$(PATH) --title="$(TITLE)"

new-topic: new-page ## Alias for new-page.

generate-subtopics: ## Create missing subtopic pages and link area index subtopic lists.
	node scripts/generate-subtopic-pages.mjs

improve-generated-content: ## Replace generated placeholder prose with concise topic-specific explanations.
	node scripts/improve-placeholder-pages.mjs --refine-generated

export-mkdocs: portability-check ## Generate an MkDocs-compatible staging directory.
	node scripts/export-mkdocs.mjs

serve-build: build ## Build, then serve the public directory for inspection.
	node scripts/serve-public.mjs --port $(PORT) --dir public

list-stubs: ## List stub pages.
	node scripts/list-content.mjs stubs

list-drafts: ## List draft pages.
	node scripts/list-content.mjs drafts

list-stale: ## List pages whose last_reviewed is older than DAYS (default 180).
	node scripts/list-stale.mjs $(DAYS)
