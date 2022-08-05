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
8. 정적파일 (이미지) 연결
    * Point Layer Style의 Icon으로 이미지를 지정할 경우 정적 파일 복사 ParcelJS 플러그인 설치 필요
    * 설치
        ```
        npm install -D parcel-plugin-static-files-copy
        ```
    *  static 폴더 생성 후 이미지 추가
        
        * 폴더 경로 : .\SuperMap-iClient-for-OpenLayers\static
    
    * package.json 추가

        ```
          "staticFiles" : {
             "staticPath" : "static"
           }
        ```
    * 소스 이미지 적용 예

        ```
        const point = new Point([104, 30]);
        const pointFeature= new Feature(point);
        pointFeature.setStyle(
            new Style({
                image: new Icon({
                    scale: 0.5,
                    src: 'selectedPoints.png'
                })
            })
        );
        ```
    * 빌드 시 dist 폴더에 이미지생성되어 있으면 정상

9. bootstrap 설치
    
    * index.html
        
        [참고] Uncaught Error : Bootstrap's JavaScript requires jQuery.
        
        => jquery가 먼저 로드되어야 함
        
        => jquery-3.4.1.js를 상단에 배치한 다음 bootstrap.min.js 배치
        
        ```
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

        <script src="https://code.jquery.com/jquery-3.4.1.js"></script>

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

        ```
    * npm 설치

        ```
        npm install bootstrap
        ```