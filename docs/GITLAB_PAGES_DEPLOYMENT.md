# GitLab Pages Deployment

This repository can deploy the Quartz site to GitLab Pages with `.gitlab-ci.yml`.

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
4. Push to the default branch. The `deploy-pages` job validates the wiki, builds Quartz, and publishes `public/` with GitLab Pages.
5. After the pipeline completes, open **Deploy > Pages** in GitLab to find the published URL.

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
- GitLab Pages CI/CD syntax: <https://docs.gitlab.com/ci/yaml/#pages>
- GitLab predefined CI/CD variables: <https://docs.gitlab.com/ci/variables/predefined_variables/>
