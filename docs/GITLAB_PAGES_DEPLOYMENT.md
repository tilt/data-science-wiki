# GitLab Pages Deployment

This repository can deploy the Quartz site to GitLab Pages with `.gitlab-ci.yml`.

Current GitLab Pages URL for this project:

```text
https://data-science-wiki-5e0a3b.gitlab.io/
```

GitLab can also assign a unique Pages domain or use a custom domain. Treat the URL shown under **Deploy > Pages** and the `CI_PAGES_URL` value in the deployment job as authoritative.

## First deployment from an empty GitLab project

1. Create a new empty project on GitLab.
2. In this local repository, initialize Git if needed:

```sh
git init
git add .
git commit -m "Initial wiki"
git branch -M main
git remote add gitlab GITLAB-REMOTE-URL
git push -u gitlab main
```

3. In GitLab, make sure CI/CD is enabled for the project.
4. Configure public access if the site should be reachable without signing in.
5. Push to the default branch. The `deploy-pages` job validates the wiki, builds Quartz, and publishes `public/` with GitLab Pages.
6. After the pipeline completes, open **Deploy > Pages** in GitLab to find the published URL.

## Public access

On GitLab.com, Pages sites are public by default unless Pages access control is enabled. To make this project and its Pages site public:

1. Open the project in GitLab.
2. Go to **Settings > General**.
3. Expand **Visibility, project features, permissions**.
4. Set **Project visibility** to **Public** if the repository itself should be public.
5. For **Pages access control**, choose a public option such as **Everyone** or disable restrictive access control.
6. Select **Save changes**.

If group-level or instance-level policy removes public Pages access, the project settings cannot override that policy.

## Pipeline shape

The GitLab pipeline has two stages:

- `validate`: installs dependencies and Quartz plugins, then runs content, link, and portability checks.
- `deploy`: builds the static Quartz site and publishes the generated `public/` directory through GitLab Pages.

The Pages deployment runs only on the default branch:

```yaml
rules:
  - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

## Base URL

Quartz needs a base URL without protocol. The GitLab Pages job derives it from GitLab's `CI_PAGES_URL` variable:

```sh
export QUARTZ_BASE_URL="${CI_PAGES_URL#https://}"
export QUARTZ_BASE_URL="${QUARTZ_BASE_URL#http://}"
export QUARTZ_BASE_URL="${QUARTZ_BASE_URL%/}"
```

This supports GitLab's default Pages domains, unique Pages domains, project paths, and custom domains.

## Custom domain

Configure the custom domain in GitLab under **Deploy > Pages**. GitLab exposes the resulting Pages URL to the job through `CI_PAGES_URL`, so no repository change is usually required after the domain is active.

## GitLab references

- GitLab Pages overview: <https://docs.gitlab.com/user/project/pages/>
- GitLab Pages access control: <https://docs.gitlab.com/user/project/pages/pages_access_control/>
- GitLab Pages CI/CD syntax: <https://docs.gitlab.com/ci/yaml/#pages>
- GitLab predefined CI/CD variables: <https://docs.gitlab.com/ci/variables/predefined_variables/>
