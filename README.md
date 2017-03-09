# Rails 5 API with React Redux Client

## Step 1: Create Rails 5 API
```
rails new app_name -d postgresql --api
```

Edit `config/database.yml` then run:
```
rails db:create
rails db:migrate
```

Generate user model
```
rails g scaffold user name email:string:uniq api_key
rails db:migrate
```

Create test data
```
rails db:seed
```

## Step 2: Create React client
```
create-react-app client
yarn install
yarn start
```

**Add SCSS**
https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc

```
npm install node-sass --save-dev
npm install --save-dev npm-run-all
```

Edit `package.json`
```
"scripts": {
     "build-css": "node-sass src/ -o src/",
     "watch-css": "npm run build-css && node-sass src/ -o src/ --watch --recursive",
-    "start": "react-scripts start",
-    "build": "react-scripts build",
+    "start-js": "react-scripts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build": "npm run build-css && react-scripts build",
     "test": "react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
   }
```

Rename `App.css` --> `App.scss`, `index.css` --> `index.scss`

## How to run
**Clone source code:**

```
cd && git clone https://github.com/ntamvl/rails_5_api_react_redux_starter
```

**Install dependencies:**
```
cd rails_5_api_react_redux_starter
bundle install && cd client && npm install
```

**Run as development**
```
rails start
```

--> Visit http://localhost:3000/

