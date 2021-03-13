function CopyToClipboard() {
    str = document.getElementById('sub-header').innerHTML;
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('This wallet address : \n' + el.value + '\nhas been copied');
  };
  
  function get_price() {
    var el = document.getElementById('btc')
    fetch("https://api.gdax.com/products/BTC-USD/book")
      .then(res => res.json())
      .then(res => {
        var price = res.bids[0][0];
        el.innerHTML = "$" + price;
      }).catch(err => {
        el.innerHTML = "$0.00 - Error";
      });
  }
  
  get_price()
  
  setInterval(get_price, 5000)