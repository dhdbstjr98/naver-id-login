(function () {
  const $script = document.createElement("script");
  $script.type = "text/javascript";
  $script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";

  window.naverIdLogin = { onload: () => {} };
  $script.onload = function () {
    if (!document.getElementById("naverIdLogin")) {
      const $el = document.createElement("div");
      $el.id = "naverIdLogin";
      $el.style.display = "none";
      document.getElementsByTagName("body")[0].append($el);
    }

    function init(clientId, callback) {
      new window.naver.LoginWithNaverId({
        clientId: clientId,
        callbackUrl: "https://dhdbstjr98.github.io/naver-id-login/callback",
        isPopup: true,
        loginButton: { color: "green", type: 1, height: 0 },
      }).init();

      window.addEventListener("message", (evt) => {
        if (evt.origin === "https://dhdbstjr98.github.io") callback(evt.data);
      });

      // a href="#" 태그로 spa routing 변경되는 것 방지
      document
        .querySelector("#naverIdLogin_loginButton")
        .addEventListener("click", (evt) => {
          evt.preventDefault();
        });
    }

    function trigger() {
      document.querySelector("#naverIdLogin_loginButton img").click();
    }

    const naverIdLogin = {
      init,
      trigger,
    };

    window.naverIdLogin = { ...window.naverIdLogin, ...naverIdLogin };
    window.naverIdLogin.onload();
  };

  document.getElementsByTagName("head")[0].append($script);
})();
