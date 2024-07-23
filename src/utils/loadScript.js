export const loadScript = (src, async = true, defer = true) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };