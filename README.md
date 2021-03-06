# SuperMap-iClient-for-OpenLayers
OpenLayers용 SuperMap iClient 개발 튜토리얼

## 개발환경
### OpenLayers
* Download OpenLayers.zip from [OpenLayers official website](https://openlayers.org/download/)
* Download from [GitHub](https://github.com/OpenLayers/OpenLayers)

### SuperMap iClient for OpenLayers 11i
* Download the latest release from [SuperMap iClient JavaScript official website](https://iclient.supermap.io/en/web/download/download.html)
* Download the latest release from [GitHub](https://github.com/SuperMap/iClient-JavaScript/releases)


## 개발메뉴얼 참고
* [SuperMap iClient 11i](https://iclient.supermap.io/en/web/introduction/openlayersDevelop.html#Ready) - OpenLayers 6 (OpenLayers 5 호환됨)
* [SuperMap iClient 10i](https://iclient.supermap.io/10.0.0/en/web/introduction/openlayersDevelop.html) - OpenLayers 4 이하 버전

# Getting Started
1. Node.js 설치
    * Download : https://nodejs.org/ko/download/
    * Windows NPM 전역 설치 위치 : %USERPROFILE%\AppData\Roaming\npm\node_modules
    * 설치확인
    
        ```
        node -v
        ```

2. SuperMap iClient 설치

    SuperMap iClient 라이브러리 Root : .\SuperMap-iClient-for-OpenLayers

    ```
    npm install @supermap/iclient-leaflet
    npm install @supermap/iclient-ol
    npm install @supermap/iclient-mapboxgl
    npm install @supermap/iclient-classic
    ```

3. OpenLayers 설치 - ol 패키지

    SuperMap iClient 라이브러리 Root에 OpenLayers 설치 

    dependencies 자동추가하기 위함

    ```
    npm install ol
    ```

4. @supermap/babel-plugin-import 설치
    
    Babel은 현재 및 이전 브라우저 또는 환경에서 ECMAScript 2015+ 코드를 이전 버전의 JavaScript로 변환하는 데 주로 사용되는 도구

    ```
    npm install @supermap/babel-plugin-import -D
    ```
    .babelrc 설정

    * SuperMap iClient 라이브러리 Root에 .babelrc 파일 생성
    * 다음 입력 후 저장
        ```
        {
            "plugins": [
                ["@supermap/babel-plugin-import",
                    {
                    "libraryName": "@supermap/iclient-ol"
                    }
                ]
            ]
        }
        ```
5. Source 폴더 생성
    
    폴더명 : src
    
    폴더경로 : .\SuperMap-iClient-for-OpenLayers\src
    
    테스트 JS : test.js

6. parcel-bundler 추가 및 npm install 실행
    * 대상 파일 : package.json
    * "devDependencies"
        - "parcel-bundler": "^1.12.5"
    * "scripts"
        - "dev": "parcel index.html"
        - "build": "parcel build index.html"

        ```
        {
            "dependencies": {
                "@supermap/iclient-classic": "^11.0.0",
                "@supermap/iclient-leaflet": "^11.0.0",
                "@supermap/iclient-mapboxgl": "^11.0.0",
                "@supermap/iclient-ol": "^11.0.0",
                "ol": "^6.15.1"
                
            },
            "devDependencies": {
                "@babel/cli": "^7.18.9",
                "@babel/core": "^7.18.9",
                "@supermap/babel-plugin-import": "^0.0.1",
                "parcel-bundler": "^1.12.5"
            },
            "type": "module",
            "scripts": {
                "dev": "parcel index.html",
                "build": "parcel build index.html"
            }
        }

        ```
        ```
        npm install
        ```
7. Map 호출 테스트

    * index.html
    * src/test.js
    * 소스 build
        ```
        npm run dev
        ```