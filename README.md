# naver-id-login
- 네아로(네이버 아이디로 로그인)을 SPA 환경에서 쉽게 사용할 수 있도록 도와줍니다.
- 네아로도 타 OAuth 플랫폼처럼 access token을 client-side에서 받아올 수 있도록 도와줍니다.

## Usage
### 1. 네아로 애플리케이션 등록 후 아래 URI를 Callback URL에 등록
```
https://dhdbstjr98.github.io/naver-id-login/callback
```
- github pages를 통해 배포되는 웹페이지입니다. access_token 등의 민감한 정보를 수집하지 않습니다.
- 코드는 [여기](https://github.com/dhdbstjr98/naver-id-login/blob/master/callback.html)에서 확인하실 수 있습니다.

### 2. 아래 스크립트 추가 (내아로 스크립트는 자동으로 로드됩니다.)
```
<script src="//dhdbstjr98.github.io/naver-id-login/naver-id-login.js"></script>
```

### 3. onload
```
window.naverIdLogin.addEventListener("load", function() {});
```
- 네아로 스크립트가 로드되었을 때 실행 (아래 init, trigger가 로드된 후에 실행)

### 4. init
```
window.naverIdLogin.init(clientId, callback);
```
- clientId : 네아로에서 발급받은 clientId를 입력합니다.
- callback : 로그인 성공시 실행될 콜백
   - callback url의 모든 파라미터를 그대로 전송합니다.
   - 전송되는 파라미터의 예시는 아래와 같습니다.
      - `{access_token: "<access_token>", state: "<state>", token_type: "bearer", expires_in: "3600"}`
      - `{error:"access_denied", error_description: "Canceled+By+User", state: "<state>"}`

### 5. trigger
```
window.naverIdLogin.trigger();
```
- 네이버 아이디로 로그인을 진행합니다. 실행 결과는 init 함수에서 지정한 callback으로 호출됩니다.

## Example
### jQuery
```html
<button id="naver-id-login">로그인</button>
<script src="//code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="//dhdbstjr98.github.io/naver-id-login/naver-id-login.js"></script>
<script>
  // jQuery의 $.on 사용시 override된 addEventListener 동작x
  window.naverIdLogin.addEventListener("load", function() {
    this.init("<clientId>", (res) => {
      if(res.error) {
        alert(res.error_description);
        return;
      }

      console.log(res.access_token);
    });
   
    $("#naver-id-login").click(this.trigger);
  });
</script>
```

### React
**function component with hooks**
```javascript
const App = () => {
  const [handleClick, setHandleClick] = useState(() => () => {});

  useEffect(() => {
    window.naverIdLogin.addEventListener("load", () => {
      window.naverIdLogin.init("<clientId>", (res) => {
        if (res.error) {
          alert(res.error_description);
          return;
        }

        console.log(res.access_token);
      });

      setHandleClick(() => window.naverIdLogin.trigger);
    });
  });

  return <button onClick={handleClick}>로그인</button>;
};
```

**class component**
```javascript
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleClick: () => {},
    };
  }

  componentDidMount() {
    window.naverIdLogin.addEventListener("load", () => {
      window.naverIdLogin.init("<clientId>", (res) => {
        if (res.error) {
          alert(res.error_description);
          return;
        }

        console.log(res.access_token);
      });

      this.setState({
        ...this.state,
        handleClick: window.naverIdLogin.trigger,
      });
    });
  }

  render() {
    return <button onClick={this.state.handleClick}>로그인</button>;
  }
}
```
