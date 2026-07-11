# GitHub Pages Deployment

## First deployment from an empty GitHub repository

1. Create a new empty repository on GitHub. Do not initialize it with a README, license, or gitignore.
2. In this local repository, initialize Git if needed:

```sh
git init
git add .
git commit -m "Initial wiki"
git branch -M main
git remote add origin REMOTE-URL
git push -u origin main
```

3. In GitHub, go to Settings -> Pages.
4. Set Source to "GitHub Actions".
5. In Settings -> Actions -> General, allow GitHub Actions and set workflow permissions to read repository contents and write Pages only through the workflow permissions.
6. Push to `main`. The deploy workflow builds Quartz and uploads `public/` using official Pages actions.

## Base URL

For project pages, the workflow sets:

```sh
QUARTZ_BASE_URL=$OWNER.github.io/$REPOSITORY
```

For a user or organization site at `https://owner.github.io/`, set `QUARTZ_BASE_URL=owner.github.io`.

## Custom domain

Add a CNAME and update `QUARTZ_BASE_URL` to the custom domain without protocol if you later use one.
