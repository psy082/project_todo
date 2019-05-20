# project_todo

> project_todo 빌드 가이드

## Build Setup
> OS는 Ubuntu@18.04를 기준으로 작성했다

리눅스 컴퓨터에 로그인 한 후 우선 빌드에 필요한 nodejs와 데이터베이스로 사용할 mongodb, 웹서버 프로그램인 nginx를 다운로드 받는다.
``` bash
# install node
sudo apt update
sudo apt install curl
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
sudo nvm install node
sudo nvm use node

# install mongodb
sudo apt-get install -y mongdb-clients mongodb-server

# install nginx
sudo apt-get install -y nginx
```

모듈들을 다 다운로드 받았다면, home directory에서 git clone 명령으로 원격 저장소를 복제한다.
``` bash
# clone source file from github
git clone https://github.com/psy082/project_todo
```

directory를 이동하여 npm 모듈들을 다운로드 받고 빌드한다.
``` bash
# changing directory
cd project_todo/todo-vue

# install dependencies
npm cache clean --force
rm package-lock.json
npm install

# build for production with minification
npm run build
```
성공적으로 빌드가 되었다면 성공했다는 메시지와 함께 dist 폴더가 새로 생성된다.

이제 웹서버에 올리기 위해서 소스코드를 nginx 하위 디렉토리로 복사한다.
``` bash
sudo cp -r ~/project_todo /var/www/html
```

이제 nginx 기본 설정 파일을 수정한다.
``` bash
sudo vim /etc/nginx/sites-available/defalt
```

root 선언 부분을 새로 빌드된 폴더로 수정한다.
``` bash
root /var/www/html; => root /var/www/html/project_todo/todo-vue/dist
```

수정 후 저장한 뒤 바뀐 설정이 제대로 적용되었는지 확인한다.
``` bash
sudo nginx -t
```

정상적으로 적용이 되었다면 nginx를 restart한다.
``` bash
sudo service nginx restart
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
