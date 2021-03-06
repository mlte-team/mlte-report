## `mlte-report`

A report generator for the `mlte` package.

### Development Setup

This section describes the steps necessary to setup a local development environment for working on `mlte-report`.

**Install Node and Yarn**

We install `node` with node version manager, `nvm`. Install `nvm`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Once `nvm` is installed, ensure that your `PATH` is updated, and list the versions of `node` that are available:

```bash
nvm list-remote
```

The list of available `node` versions is long. Select one that is appropriate. For this project, I (arbitrarily) selected `v16.14.2`, the latest LTS for the _Gallium_ release.

```bash
nvm install v16.14.2
```

Verify that the install succeeded:

```bash
nvm list
node --version
```

Finally, install `yarn` with `apt`. The default installation will also attempt to install `node` from `apt`; we avoid this with `--no-install-recommends`. Furthermore, the standard install of `yarn` from `apt` doesn't seem to work fully out of the box; I followed the below steps from [this StackOverflow post](https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install) to successfully install `yarn`:

```bash
sudo apt remove cmdtest
sudo apt remove yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y --no-install-recommends
```

Verify the `yarn` installation:

```bash
yarn --version
```

### Routine Setup

```bash
export NODE_ENV="development"
```

### Acknowledgements

`mlte-report` draws structural elements from work done in [Mitchell et al.](https://arxiv.org/pdf/1810.03993.pdf). Specifically, many of the sections of our report are inspired by the vision provided by the Model Card project. This will remain true even as the precise contents of our report change over time. 
