WebView myWebView = findViewById(R.id.spotifyWebView);
WebSettings webSettings = myWebView.getSettings();
webSettings.setJavaScriptEnabled(true); // JavaScript ON karna mat bhulna!

// Tera Firebase wala URL yahan dalo
myWebView.loadUrl("https://atharav-spotify.web.app");