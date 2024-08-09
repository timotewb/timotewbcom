# timotewbcom

website

# setup ubuntu

1. install nvm
   <br>`sudo apt update ; sudo apt upgrade`
   <br>`sudo apt install curl`
   <br>`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash`
2. install latest lts version
   <br>`nvm install --lts`
3. confirm installation
   <br>`nvm ls`
4. use lts version
   <br>`nvm use --lts`
5. create app
   <br>`create-react-app . --template typescript`

# setup mac

1. install homebrew
   <br>`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
   <br>`brew install nvm`
2. update file `~/.bashrc`, `~/.zshrc`, or `~/.bash_profile`
   <br>`export NVM_DIR=~/.nvm`
   <br>`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"` # This loads nvm
   <br>`[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"` # This loads nvm bash_completion
3. install latest lts version
   <br>`nvm install --lts`
4. confirm installation
   <br>`nvm ls`
5. use lts version
   <br>`nvm use --lts`
6. create app
   <br>`create-react-app . --template typescript`

Create file
`api/local.settings.json`
with content
`{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "python",
        "AzureWebJobsFeatureFlags": "EnableWorkerIndexing"
    }
}`
python -m venv api/.venv
npm install node-sass --save-dev
npm install -g @azure/static-web-apps-cli
npm i
npm run build ; swa start build --api-location api
